import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import stringSimilarity from 'string-similarity';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

// Define types
type QueryRequest = {
  query: string;
};

type ChunkResult = {
  content: string;
  id: string;
  metadata: {
    section: string;
    [key: string]: unknown;
  };
};

type ResponseStyle = 'professional' | 'casual' | 'balanced';

// Cache for resume content chunks
let contentChunksCache: ChunkResult[] | null = null;

// Identify query type for better content retrieval
function categorizeQuery(query: string): string[] {
  const queryCategories = [];
  const lowerQuery = query.toLowerCase();
  
  // Define category detection patterns
  const categoryPatterns = {
    education: ['study', 'studying', 'degree', 'university', 'college', 'courses', 'gpa', 'major'],
    experience: ['work', 'job', 'experience', 'company', 'position', 'role', 'career', 'professional', 'tech stack'],
    technical_skills: ['skill', 'technology', 'tech stack', 'programming', 'language', 'framework', 'tool'],
    projects: ['project', 'portfolio', 'built', 'developed', 'created', 'application', 'system'],
    personal_interests: ['hobby', 'hobbies', 'interest', 'personal', 'like', 'enjoy', 'passion', 'outside work', 'leisure', 'fun']
  };
  
  // Check which categories the query matches
  Object.entries(categoryPatterns).forEach(([category, keywords]) => {
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      queryCategories.push(category);
    }
  });
  
  // If no specific category is detected, mark as general
  if (queryCategories.length === 0) {
    queryCategories.push('general');
  }
  
  return queryCategories;
}

export async function POST(request: Request) {
  try {
    const { query }: QueryRequest = await request.json();
    const queryCategories = categorizeQuery(query);
    
    // Fetch all content chunks from the database if not cached
    if (!contentChunksCache) {
      const { data, error } = await supabase
        .from('resume_chunks')
        .select('id, content, metadata')
        .limit(100);
        
      if (error) {
        console.error('Error fetching content chunks:', error);
        return NextResponse.json({ error: 'Failed to fetch content data' }, { status: 500 });
      }
      
      contentChunksCache = data as ChunkResult[];
    }
    
    // Calculate relevance scores with category-based boosting
    const scoredChunks = contentChunksCache.map((chunk) => {
      // Base semantic similarity
      let relevanceScore = stringSimilarity.compareTwoStrings(query, chunk.content);
      
      // Boost chunks that match the detected query categories
      if (chunk.metadata?.section && queryCategories.includes(chunk.metadata.section)) {
        relevanceScore += 0.3; // Significant boost for category match
      }
      
      // Special handling for direct questions
      const directQuestionIndicators = ['what is', 'where does', 'when did', 'how many', 'which'];
      if (directQuestionIndicators.some(indicator => query.toLowerCase().startsWith(indicator))) {
        // Boost chunks that contain potential direct answers
        const keyTerms = query.toLowerCase().split(' ')
          .filter(word => word.length > 3) // Focus on meaningful words
          .filter(word => !['what', 'where', 'when', 'how', 'which', 'does', 'did', 'with'].includes(word));
          
        if (keyTerms.some(term => chunk.content.toLowerCase().includes(term))) {
          relevanceScore += 0.2; // Boost for containing key terms from the question
        }
      }
      
      return {
        content: chunk.content,
        score: Math.min(relevanceScore, 1.0) // Cap at 1.0
      };
    });
    
    // Sort by relevance score and take the top chunks
    const topChunks = scoredChunks
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(chunk => chunk.content);
      
    // Generate context from retrieved chunks
    const context = topChunks.join('\n\n');
    
    // Determine the appropriate response style
    const responseStyle = getResponseStyle(query, queryCategories);
    
    // Generate response using Hugging Face Inference API with improved prompt
    const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json"
      },
      // Update this part in your fetch request body
      body: JSON.stringify({
        inputs: `<s>[INST] You are Srishti's Portfolio Chatbot. You're friendly, helpful, and represent Srishti C Rai. Answer questions about Srishti based on this information only:

      Context:
      ${context}

      Question: ${query}
      Style: ${responseStyle}

      Instructions:
      - Answer directly as if you are Srishti's personal assistant.
      - Never say phrases like "based on the provided context" or "the information shows."
      - If information isn't available, say "I don't have details about that" or offer what you do know instead.
      - Be conversational and natural - use at most 3-4 sentences.
      - For missing information, never apologize or mention limitations - just redirect to what you do know about Srishti.
      - Match your tone to the question - professional for work/education, casual for personal topics.
      - Keep responses concise and specific to the question.
      - Personalize your responses to sound like a chatbot Srishti created for her portfolio.
      [/INST]`,
        parameters: {
          max_new_tokens: 256,
          temperature: 0.7, // Slightly increased for more natural responses
          top_p: 0.9,
          return_full_text: false
        }
      })
    });
    
    const result = await response.json();
    
    // Extract the generated text
    const botResponse = result[0].generated_text.trim();
    
    // Return the response along with the style and categories used
    return NextResponse.json({ 
      response: botResponse,
      style: responseStyle,
      categories: queryCategories
    });
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error processing request:', error.message);
      return NextResponse.json({ error: 'Failed to process request', details: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
  }
}

function getResponseStyle(query: string, categories: string[]): ResponseStyle {
  // Map categories to response styles
  if (categories.includes('experience') || categories.includes('education') || categories.includes('projects')) {
    return 'professional';
  } else if (categories.includes('personal_interests')) {
    return 'casual';
  } else {
    return 'balanced';
  }
}