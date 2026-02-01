'use client';

import { useState } from 'react';

// メッセージの型定義（誰が、何を言ったか）
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

    // 1. まず自分のメッセージを画面に表示
    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 2. 裏側（さっき作ったAPI）にメッセージを送信
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      // 3. AIからの返事を画面に表示
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
      {/* ヘッダー */}
      <header className="p-4 bg-gray-800 border-b border-gray-700 text-center font-bold text-xl">
        🤖 My AI Assistant
      </header>

      {/* チャットエリア（ここが会話のログ） */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            何か話しかけてみてください！<br />
            例：「Reactについて教えて」「面白いダジャレを言って」
          </p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none' // 自分：青
                  : 'bg-gray-700 text-gray-100 rounded-bl-none' // AI：グレー
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* 考え中...のアニメーション */}
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
          className="flex-1 p-3 rounded bg-gray-900 border border-gray-600 focus:outline-none focus:border-blue-500"
          placeholder="メッセージを入力..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()} // Enterキーでも送信
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