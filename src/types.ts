export interface Document {
  id: string;
  title: string;
  content: string;
  embedding: number[];
  created_at: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}