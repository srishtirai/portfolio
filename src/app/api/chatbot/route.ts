import { ChunkResult, QueryRequest } from '@/types/types';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

type ResponseStyle = 'professional' | 'casual' | 'balanced';

let contentChunksCache: ChunkResult[] | null = null;

function categorizeQuery(query: string): string[] {
  const queryCategories: string[] = [];
  const lowerQuery = query.toLowerCase();

  const categoryPatterns = {
    basic_information: [
      'name', 'names', 'profile', 'overview', 'about', 'who', 'describe', 
      'location', 'reside', 'residing', 'resided', 'contact', 'email', 
      'emails', 'address', 'summary', 'background'
    ],
    education: [
      'educat', 'study', 'studi', 'student', 'students', 'degree', 'degrees', 
      'university', 'universities', 'college', 'colleges', 'course', 'courses', 
      'coursework', 'academic', 'gpa', 'major', 'school', 'schools', 
      'qualification', 'qualifications', 'learning', 'learned', 'diploma'
    ],
    experience: [
      'work', 'works', 'worked', 'working', 'job', 'jobs', 'employ', 
      'experience', 'experiences', 'company', 'companies', 'position', 
      'positions', 'role', 'roles', 'career', 'careers', 'workplace', 
      'workplaces', 'profession', 'professional', 'internship', 'internships', 
      'co-op', 'co-ops', 'duration', 'since', 'workplace', 'workplaces'
    ],
    technical_skills: [
      'skill', 'skills', 'technology', 'technologies', 'tech', 'programming', 
      'program', 'language', 'languages', 'framework', 'frameworks', 'tool', 
      'tools', 'expert', 'expertise', 'coding', 'develop', 'development', 
      'speciali', 'proficien', 'familiar', 'capabilit', 'competenc', 'ability'
    ],
    projects: [
      'project', 'projects', 'portfolio', 'portfolios', 'built', 'build', 
      'develop', 'developed', 'develops', 'creating', 'created', 'create', 
      'application', 'applications', 'system', 'systems', 'software', 
      'initiative', 'initiatives', 'contribute', 'contributes', 'contributed'
    ],
    personal_interests: [
      'hobby', 'hobbies', 'interest', 'interests', 'personal', 'like', 
      'likes', 'enjoy', 'enjoys', 'enjoyed', 'passion', 'passions', 
      'leisure', 'fun', 'activity', 'activities', 'creative', 'art', 
      'arts', 'music', 'reading', 'travel', 'traveling', 'traveled', 
      'painting', 'paint', 'poetry', 'poet'
    ]
  };
  
  const matchKeyword = (keyword: string, query: string): boolean => {
    const regex = new RegExp(`\\b${keyword}\\w*\\b`, 'i');
    return regex.test(query);
  };

  Object.entries(categoryPatterns).forEach(([category, keywords]) => {
    if (keywords.some(keyword => matchKeyword(keyword, lowerQuery))) {
      queryCategories.push(category);
    }
  });
  
  const specialCases = [
    { 
      terms: ['top', 'best', 'primary', 'main', 'good', 'skilled'], 
      categories: ['technical_skills', 'experience', 'projects']
    },
    { 
      terms: ['recent', 'latest', 'current'], 
      categories: ['experience', 'projects', 'education']
    }
  ];

  specialCases.forEach(specialCase => {
    if (specialCase.terms.some(term => lowerQuery.includes(term))) {
      queryCategories.push(...specialCase.categories);
    }
  });
  
  const uniqueCategories = [...new Set(queryCategories)];
  
  return uniqueCategories.length > 0 ? uniqueCategories : ['general'];
}

export async function POST(request: Request) {
  try {
    const { query }: QueryRequest = await request.json();

    if (query.trim().length < 3) {
      console.error("Query is too short to be meaningful");
      return NextResponse.json({
        response: "Sorry, I couldn’t understand that. Could you rephrase?"
      });
    }

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
      let relevanceScore = query.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 2)
        .some(word => chunk.content.toLowerCase().includes(word)) 
        ? 0.3
        : 0;

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
      .filter(chunk => chunk.score >= 0.5)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(chunk => chunk.content);

    if (topChunks.length === 0) {
      console.error("Context not found");
      return NextResponse.json({
        response: "Sorry, I don’t have an answer for this. Please reach out to srishtiraic@gmail.com."
      });
    }
      
    const context = topChunks.length > 0 ? topChunks.join('\n\n') : null;
    const responseStyle = getResponseStyle(query, queryCategories);
    
    const response = await fetch("https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: `<s>[INST] 
          Answer the user's question strictly based on the context below. Do **not** repeat or include the question or style in your response.

          Context:
          ${context}

          Instructions:
          - Respond directly and concisely as if you are Srishti's assistant.
          - Use a tone based on style: ${responseStyle}.
          - Avoid mentioning the context, question, or style in your output.
          - Refer to Srishti in third person.
          - Keep answers to 3–4 sentences max.
          - Do not echo or include the question in your answer.

          Now answer: ${query}
          [/INST]`,
        parameters: {
          max_new_tokens: 400, // Increased for better response length
          temperature: 0.7,
          top_p: 0.9,
          return_full_text: false
        }
      })
    });
    
    const result = await response.json();

    if (!result || !result[0] || !result[0].generated_text) {
      console.error("API returned unexpected response:", result);
      return NextResponse.json({ response: "Sorry, I don’t have an answer for this. Please reach out to srishtiraic@gmail.com." });
    }
    
    const botResponse = result[0]?.generated_text?.replace(/\[\/?ASST\]/gi, '').trim() || '';

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
