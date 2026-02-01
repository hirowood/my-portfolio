'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      const errorMessage: Message = { role: 'bot', content: 'すみません、エラーが発生しました😢' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-gray-100 font-sans">
      
      {/* ヘッダー */}
      <header className="px-6 py-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 flex items-center sticky top-0 z-20 shadow-sm">
        <Link 
          href="/" 
          className="text-gray-400 hover:text-white transition px-4 py-2 rounded-full hover:bg-gray-800 text-sm font-medium mr-4 flex items-center gap-1"
        >
          <span>←</span> 戻る
        </Link>
        <div>
          <h1 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            AI Work Coach 🤖
          </h1>
          <p className="text-xs text-gray-500">
            あなたの仕事をサポートします
          </p>
        </div>
      </header>

      {/* チャットエリア */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-60">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center text-4xl mb-6 shadow-xl shadow-blue-900/10">
              ☕️
            </div>
            <p className="text-lg font-medium">今日はどんなタスクがありますか？</p>
            <p className="text-sm mt-2 text-gray-600">小さなことから整理していきましょう</p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'bot' && (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-xl border border-gray-600 shadow-lg shrink-0">
                🤖
              </div>
            )}

            <div
              className={`max-w-[80%] md:max-w-[70%] p-4 rounded-2xl whitespace-pre-wrap leading-relaxed shadow-md text-[15px] ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-tr-none shadow-blue-900/20' 
                  : 'bg-gray-800 border border-gray-700 text-gray-100 rounded-tl-none'
              }`}
            >
              {msg.content}
            </div>

            {msg.role === 'user' && (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-xl border border-blue-500 shadow-lg shrink-0">
                👤
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 shrink-0">
              🤖
            </div>
            <div className="bg-gray-800 p-4 rounded-2xl rounded-tl-none border border-gray-700 text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* 入力エリア */}
      <div className="p-4 bg-gray-900 border-t border-gray-800">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            className="flex-1 p-4 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-500 transition-all shadow-inner"
            placeholder="ここにメッセージを入力..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.nativeEvent.isComposing && sendMessage()}
          />
          
          {/* ★ここが新しいボタンです！ */}
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="
              bg-gradient-to-r from-blue-600 to-indigo-600 
              hover:from-blue-500 hover:to-indigo-500 
              disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed 
              text-white font-bold px-6 py-3 rounded-xl 
              transition-all duration-200 
              shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 
              active:scale-95 flex items-center gap-2
            "
          >
            <span>送信</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
        <p className="text-center text-xs text-gray-600 mt-3">
          AI Work Coach can make mistakes. Please check important info.
        </p>
      </div>
    </div>
  );
}