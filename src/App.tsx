import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { Chat } from './components/Chat';
import { Bot, FileText } from 'lucide-react';
import type { ChatMessage } from './types';
import { processDocument, generateAnswer } from './lib/openai';

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasDocument, setHasDocument] = useState(false);

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);
    try {
      const document = await processDocument(file);
      setHasDocument(true);
      setMessages([
        {
          role: 'assistant',
          content: `I've processed "${file.name}" and stored it in the knowledge base. You can now ask questions about its contents!`
        }
      ]);
    } catch (error) {
      console.error('Error processing file:', error);
      setMessages([
        {
          role: 'assistant',
          content: 'Sorry, there was an error processing your file. Please try again.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: message }]);

    try {
      const answer = await generateAnswer(message);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: answer
        }
      ]);
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, there was an error generating a response. Please try again.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-2">
            <Bot className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">Document Q&A</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-semibold">Upload Document</h2>
              </div>
              <FileUpload onFileSelect={handleFileSelect} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow h-[600px]">
            {hasDocument ? (
              <Chat
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <p>Upload a document to start asking questions</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;