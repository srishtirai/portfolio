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

// ✅ Ensure embeddings are stored only once
async function storeEmbeddings() {
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
    console.error("❌ Supabase Storage Error:", error);
    throw new Error("Error generating signed URL");
  }

  const response = await fetch(data.signedUrl);
  const knowledgeBase = await response.json();
  
  console.log("✅ Knowledge base loaded successfully.");

  // ✅ Ensure textChunks is always an array
  const cleanTextChunks = Array.isArray(knowledgeBase)
    ? knowledgeBase
    : Object.values(knowledgeBase).flat();

  console.log(`📄 Processing ${cleanTextChunks.length} text chunks...`);
  
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

// ✅ Retrieve similar embeddings before querying AI
async function retrieveSimilarEmbeddings(query: string) {
  console.log("🔎 Generating query embedding...");
  const embeddings = new HuggingFaceInferenceEmbeddings({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    apiKey: process.env.HUGGINGFACE_API_KEY!,
  });

  // ✅ Improve query matching by adding alternative forms
  const queryVariations = [
    query, 
    query.replace("Srishti", "Srishti C Rai"), 
    query.replace("C Rai", "Srishti C Rai"),
    query.replace("her", "Srishti C Rai")
  ];

  const queryVectors = await Promise.all(queryVariations.map(q => embeddings.embedQuery(q)));
  const primaryVector = queryVectors[0];

  console.log("🔎 Searching for similar embeddings in Supabase...");
  const { data, error } = await supabase.rpc("match_chatbot_embeddings", {
    query_embedding: primaryVector,
    match_threshold: 0.65, // Lower threshold to improve partial matches
    match_count: 3,
  });

  if (error) {
    console.error("❌ Supabase Search Error:", error);
    return [];
  }

  console.log("📑 Retrieved embeddings:", data.map((row: { text: unknown; }) => row.text));
  return data.map((row: { text: unknown; }) => row.text);
}

// ✅ Query Chatbot with AI Model
export async function queryChatbot(query: string) {
  try {
    console.log("💬 Querying chatbot with:", query);

    // Ensure embeddings exist
    await storeEmbeddings();

    console.log("🔎 Retrieving similar embeddings...");
    const similarTexts = await retrieveSimilarEmbeddings(query);

    if (!similarTexts.length) {
      console.log("⚠️ No relevant context found.");
      return "I'm not sure, but I can answer questions about my skills and projects.";
    }

    console.log("📑 Retrieved context:", similarTexts.join("\n"));

    console.log("🤖 Generating AI response...");
    const response = await hf.textGeneration({
      model: process.env.HUGGINGFACE_MODEL!,
      inputs: `${similarTexts.join("\n")}\nAnswer: `,
      parameters: { max_new_tokens: 200, temperature: 0.7, do_sample: true },
    });

    // ✅ Extract the actual answer (Remove any extra context)
    const answer = response.generated_text?.split("Answer:")[1]?.trim() || response.generated_text;
    console.log("📝 AI Response:", answer);

    return answer || "I couldn't generate a response.";
  } catch (error) {
    console.error("❌ Chatbot Error:", error);
    return "An error occurred while processing your request.";
  }
}
