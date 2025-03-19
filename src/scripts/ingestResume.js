/* eslint-disable @typescript-eslint/no-require-imports */
const { createClient } = require('@supabase/supabase-js');
const { pipeline } = require('@xenova/transformers');
const fs = require('fs');
const { prepareResumeChunks } = require('../utils/dataPreprocessing');

// Load environment variables
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '../.env.local') });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function ingestResume() {
  console.log('Starting resume ingestion...');
  
  // Step 1: Read the resume JSON
  const resumeData = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'data/resume.json'), 'utf8'));
  
  // Step 2: Process the resume into chunks
  const chunks = prepareResumeChunks(resumeData);
  console.log(`Created ${chunks.length} chunks from resume data`);
  
  // Step 3: Initialize the embedding model
  const embeddingPipeline = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  console.log('Embedding model initialized');
  
  // Step 4: Process each chunk and upload to Supabase
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    console.log(`Processing chunk ${i+1}/${chunks.length}: ${chunk.metadata.section}`);
    
    // Generate embedding for the chunk
    const embedding = await embeddingPipeline(chunk.content, { pooling: 'mean', normalize: true });
    const embeddingArray = Array.from(embedding.data);
    
    // Upload to Supabase
    const { error } = await supabase
      .from('resume_chunks')
      .insert({
        content: chunk.content,
        metadata: chunk.metadata,
        embedding: embeddingArray
      });
    
    if (error) {
      console.error(`Error uploading chunk ${i+1}:`, error);
    } else {
      console.log(`Uploaded chunk ${i+1}`);
    }
  }
  
  console.log('Resume ingestion complete!');
}

ingestResume().catch(console.error);