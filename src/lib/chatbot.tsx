import { createClient } from "@supabase/supabase-js";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { HfInference } from "@huggingface/inference";
import "dotenv/config";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY!);

async function loadKnowledgeBase() {
  console.log("📌 Checking if embeddings already exist in Supabase...");

  const { count } = await supabase
    .from("chatbot_embeddings")
    .select("*", { count: "exact", head: true });

  if (count && count > 0) {
    console.log(`✅ ${count} embeddings found. Skipping JSON loading.`);
    return;
  }

  console.log("📥 Fetching JSON data from Supabase...");
  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET_NAME!)
    .createSignedUrl("knowledge_base.json", 60 * 60);

  if (error) {
    console.error("Supabase Storage Error:", error);
    throw new Error("Error generating signed URL");
  }

  const response = await fetch(data.signedUrl);
  const knowledgeBase = await response.json();

  console.log("✅ Knowledge base loaded successfully.");

  // ✅ Ensure textChunks is always an array
  const textChunks = Array.isArray(knowledgeBase)
    ? knowledgeBase
    : Object.values(knowledgeBase).flat();

  console.log(`📄 Processing ${textChunks.length} text chunks...`);
  await storeEmbeddings(textChunks);
}

// ✅ Ensure `textChunks` is an array before calling `.map()`
async function storeEmbeddings(textChunks: any[]) {
  if (!Array.isArray(textChunks)) {
    console.error("❌ storeEmbeddings received non-array data:", textChunks);
    throw new Error("Invalid knowledge base format: Expected an array.");
  }

  console.log("🔄 Cleaning and filtering text data...");
  const cleanTextChunks = textChunks
    .map((item) => (typeof item === "string" ? item : JSON.stringify(item))) // Convert non-string to string
    .filter((text) => text.trim().length > 0); // Remove empty values

  console.log(`📑 ${cleanTextChunks.length} valid text chunks remaining after cleaning.`);

  console.log("🔄 Generating new embeddings...");
  const embeddings = new HuggingFaceInferenceEmbeddings({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    apiKey: process.env.HUGGINGFACE_API_KEY!,
  });

  const embeddingVectors = await Promise.all(cleanTextChunks.map(async (text) => ({
    text,
    embedding: await embeddings.embedQuery(text),
  })));

  console.log("📤 Storing embeddings in Supabase...");
  await supabase.from("chatbot_embeddings").insert(embeddingVectors);
  console.log("✅ Embeddings stored successfully.");
}


// Query Function (Uses Supabase, NOT JSON)
export async function queryChatbot(query: string) {
  try {
    console.log("💬 Querying chatbot with:", query);
    await loadKnowledgeBase();

    console.log("🔎 Retrieving similar embeddings...");
    const { data, error } = await supabase.rpc("match_chatbot_embeddings", {
      query_embedding: await new HuggingFaceInferenceEmbeddings({
        model: "sentence-transformers/all-MiniLM-L6-v2",
        apiKey: process.env.HUGGINGFACE_API_KEY!,
      }).embedQuery(query),
      match_threshold: 0.75,
      match_count: 3,
    });

    if (error) {
      console.error("❌ Supabase Search Error:", error);
      return "I couldn't find an answer.";
    }

    console.log("📑 Retrieved context:", data.map((row: any) => row.text).join("\n"));

    console.log("🤖 Generating AI response...");
    const response = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct",
      inputs: `Use this context: ${data.map((row: any) => row.text).join("\n")}. Answer this query: ${query}`,
      parameters: { max_new_tokens: 200, temperature: 0.7, do_sample: true },
    });

    console.log("📝 AI Response:", response.generated_text);
    return response.generated_text || "I couldn't generate a response.";
  } catch (error) {
    console.error("❌ Chatbot Error:", error);
    return "An error occurred while processing your request.";
  }
}
