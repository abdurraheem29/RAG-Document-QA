import { OpenAIEmbeddings } from '@langchain/openai';
import { ChatOpenAI } from '@langchain/openai';
import { loadQAStuffChain } from 'langchain/chains';
import { Document as LangchainDocument } from 'langchain/document';
import { supabase } from './supabase';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey || apiKey === 'sk-') {
  throw new Error(
    'Please set your OpenAI API key in the .env file (VITE_OPENAI_API_KEY)'
  );
}

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: apiKey,
});

const model = new ChatOpenAI({
  openAIApiKey: apiKey,
  modelName: 'gpt-3.5-turbo',
  temperature: 0,
});

export async function processDocument(file: File) {
  try {
    const text = await file.text();
    const embedding = await embeddings.embedQuery(text);

    const { data, error } = await supabase
      .from('documents')
      .insert({
        title: file.name,
        content: text,
        embedding,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in processDocument:', error);
    throw new Error('Failed to process document. Please check your API key and try again.');
  }
}

export async function generateAnswer(question: string) {
  try {
    const queryEmbedding = await embeddings.embedQuery(question);
    
    const { data: documents, error } = await supabase.rpc('match_documents', {
      query_embedding: queryEmbedding,
      match_threshold: 0.7,
      match_count: 3,
    });

    if (error) throw error;

    if (!documents || documents.length === 0) {
      return "I couldn't find any relevant information to answer your question.";
    }

    const chain = loadQAStuffChain(model);
    const docs = documents.map(
      doc => new LangchainDocument({ pageContent: doc.content })
    );

    const result = await chain.call({
      input_documents: docs,
      question,
    });

    return result.text;
  } catch (error) {
    console.error('Error in generateAnswer:', error);
    throw new Error('Failed to generate answer. Please check your API key and try again.');
  }
}