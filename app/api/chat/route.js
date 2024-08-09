import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

// POST request handler
export async function POST(request) {
  try {
    // Parse request body (if needed)
    const { messages } = await request.json();

    // Make API call
    const completion = await openai.chat.completions.create({
      model: 'meta-llama/llama-3.1-8b-instruct:free',
      messages: messages || [{ role: 'user', content: 'Say this is a test' }],
    });

    // Return response
    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.error();
  }
}

