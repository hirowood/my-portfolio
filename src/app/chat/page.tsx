'use client';

import { useState } from 'react';
import Link from 'next/link'; // ★これが必要です

type Message = {
  role: 'user' | 'bot';
  content: string;
};

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      const botMessage: Message = { role: 'bot', content: data.reply };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = { role: 'bot', content: 'エラーが発生しました😢' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* ★ヘッダーを変更：戻るボタンを追加 */}
      <header className="p-4 bg-gray-800 border-b border-gray-700 flex items-center sticky top-0 z-10">
        <Link 
          href="/" 
          className="text-gray-400 hover:text-white transition px-3 py-1 rounded hover:bg-gray-700 mr-4"
        >
          ← 戻る
        </Link>
        <h1 className="font-bold text-xl flex-1 text-center pr-16">
          🤖 My AI Assistant
        </h1>
      </header>

      {/* チャットエリア */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-4xl mb-4">💬</p>
            <p>何か話しかけてみてください！</p>
            <p className="text-sm mt-2">Gemini 2.5 Flash がお答えします</p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-700 text-gray-100 rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 p-3 rounded-lg rounded-bl-none text-gray-400 animate-pulse">
              考え中...
            </div>
          </div>
        )}
      </div>

      {/* 入力エリア */}
      <div className="p-4 bg-gray-800 border-t border-gray-700 flex gap-2">
        <input
          type="text"
          className="flex-1 p-3 rounded bg-gray-900 border border-gray-600 focus:outline-none focus:border-blue-500 text-white"
          placeholder="メッセージを入力..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold px-6 py-2 rounded transition"
        >
          送信
        </button>
      </div>
    </div>
  );
}