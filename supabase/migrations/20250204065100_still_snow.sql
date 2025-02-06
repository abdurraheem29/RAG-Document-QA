/*
  # Create documents table for RAG system

  1. New Tables
    - `documents`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `embedding` (vector)
      - `created_at` (timestamp)
      - `user_id` (uuid, foreign key)

  2. Security
    - Enable RLS on `documents` table
    - Add policies for authenticated users to manage their documents
*/

-- Enable the vector extension
create extension if not exists vector;

-- Create the documents table
create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  embedding vector(1536),
  created_at timestamptz default now(),
  user_id uuid references auth.users(id)
);

-- Enable Row Level Security
alter table documents enable row level security;

-- Create policies
create policy "Users can insert their own documents"
  on documents
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can view their own documents"
  on documents
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Create a function to search documents by similarity
create or replace function match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  content text,
  similarity float
)
language sql stable
as $$
  select
    id,
    content,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;