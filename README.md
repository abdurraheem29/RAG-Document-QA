# RAG-Document-QA
The RAG Document QA project is a Retrieval-Augmented Generation (RAG) system that allows users to upload documents and ask AI-powered questions. The system utilizes OpenAI's GPT model along with Supabase for document storage and retrieval.

This project is designed to enable users to:

Upload documents (text-based)

Generate embeddings using OpenAI

Store embeddings in Supabase for vector search

Ask questions based on the uploaded documents

Get AI-generated responses using OpenAI's GPT-3.5-turbo

 Features

✅ Document Upload – Users can upload text-based documents (e.g., .txt, .pdf).
✅ AI-Powered Q&A – Ask questions based on uploaded documents.
✅ OpenAI Embeddings – Uses OpenAI to generate vector representations of text.
✅ Supabase Integration – Stores and retrieves document embeddings efficiently.
✅ Fast & Interactive UI – Built with Vite + React for a seamless user experience.
✅ Customizable AI Model – Supports different OpenAI models.

🛠️ Tech Stack

Frontend: React + Vite + TypeScript

AI Model: OpenAI GPT-3.5 Turbo

Database & Embeddings: Supabase

Backend: Node.js (Handled via API calls)

📥 Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/YOUR_GITHUB_USERNAME/RAG-Document-QA.git
cd RAG-Document-QA

2️⃣ Install Dependencies

npm install

3️⃣ Set Up Environment Variables

Create a .env file and add the following:

VITE_OPENAI_API_KEY=your_openai_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

Note: Replace your_openai_api_key and your_supabase_url with actual credentials.

4️⃣ Run the Development Server

npm run dev

Open http://localhost:5173/ in your browser.

5️⃣ Build & Deploy (Production)

npm run build
npx serve -s dist

 Usage Guide

1️⃣ Upload a Document – Click on the "Upload" button and select a text file.
2️⃣ Ask a Question – Type a question related to the document content.
3️⃣ Get AI-Generated Answer – The AI will process the document and provide an answer.

 Environment Variables

The following environment variables must be set in a .env file:

VITE_OPENAI_API_KEY - OpenAI API key for embeddings and chat completion

VITE_SUPABASE_URL - Supabase project URL

VITE_SUPABASE_ANON_KEY - Supabase public API key

