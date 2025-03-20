import { ChunkResult, QueryRequest } from '@/types/types';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import stringSimilarity from 'string-similarity';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

type ResponseStyle = 'professional' | 'casual' | 'balanced';

let contentChunksCache: ChunkResult[] | null = null;

function categorizeQuery(query: string): string[] {
  const queryCategories = [];
  const lowerQuery = query.toLowerCase();

  const categoryPatterns = {
    education: ['study', 'studying', 'degree', 'university', 'college', 'courses', 'gpa', 'major'],
    experience: ['work', 'job', 'experience', 'company', 'position', 'role', 'career', 'professional', 'tech stack'],
    technical_skills: ['skill', 'technology', 'tech stack', 'programming', 'language', 'framework', 'tool'],
    projects: ['project', 'portfolio', 'built', 'developed', 'created', 'application', 'system'],
    personal_interests: ['hobby', 'hobbies', 'interest', 'personal', 'like', 'enjoy', 'passion', 'outside work', 'leisure', 'fun']
  };
  
  Object.entries(categoryPatterns).forEach(([category, keywords]) => {
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      queryCategories.push(category);
    }
  });
  
  if (queryCategories.length === 0) {
    queryCategories.push('general');
  }
  
  return queryCategories;
}

export async function POST(request: Request) {
  try {
    const { query }: QueryRequest = await request.json();
    const queryCategories = categorizeQuery(query);
    
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
    
    const scoredChunks = contentChunksCache.map((chunk) => {
      let relevanceScore = stringSimilarity.compareTwoStrings(query, chunk.content);

      if (chunk.metadata?.section && queryCategories.includes(chunk.metadata.section)) {
        relevanceScore += 0.3;
      }
      
      const directQuestionIndicators = ['what is', 'where does', 'when did', 'how many', 'which'];
      if (directQuestionIndicators.some(indicator => query.toLowerCase().startsWith(indicator))) {
        const keyTerms = query.toLowerCase().split(' ')
          .filter(word => word.length > 3)
          .filter(word => !['what', 'where', 'when', 'how', 'which', 'does', 'did', 'with'].includes(word));
          
        if (keyTerms.some(term => chunk.content.toLowerCase().includes(term))) {
          relevanceScore += 0.2;
        }
      }
      
      return {
        content: chunk.content,
        score: Math.min(relevanceScore, 1.0)
      };
    });
    
    const topChunks = scoredChunks
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(chunk => chunk.content);
      
    const context = topChunks.join('\n\n');
    const responseStyle = getResponseStyle(query, queryCategories);

    const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: `<s>[INST] You are Srishti's Portfolio Chatbot. You're friendly, helpful, and represent Srishti C Rai. Answer questions about Srishti based on this information only:

      Context:
      ${context}

      Question: ${query}
      Style: ${responseStyle}

      Instructions:
      - Answer directly as if you are Srishti's personal assistant.
      - Never say phrases like "based on the provided context" or "the information shows."
      - If information isn't available, say "I don't have details about that but you can send an eamil to srishtiraic@gmail.com" or offer what you do know instead.
      - Be conversational and natural - use at most 3-4 sentences.
      - For missing information, never apologize or mention limitations - just redirect to what you do know about Srishti.
      - Match your tone to the question - professional for work/education, casual for personal topics.
      - Keep responses concise and specific to the question.
      - Personalize your responses to sound like a chatbot Srishti created for her portfolio.
      [/INST]`,
        parameters: {
          max_new_tokens: 256,
          temperature: 0.7,
          top_p: 0.9,
          return_full_text: false
        }
      })
    });
    
    const result = await response.json();
    
    const botResponse = result[0].generated_text.trim();
    
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
  if (categories.includes('experience') || categories.includes('education') || categories.includes('projects')) {
    return 'professional';
  } else if (categories.includes('personal_interests')) {
    return 'casual';
  } else {
    return 'balanced';
  }
}