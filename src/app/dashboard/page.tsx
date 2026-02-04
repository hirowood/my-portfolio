'use client';

import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      {/* ヘッダー */}
      <header className="mb-6 flex justify-between items-center border-b border-gray-800 pb-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-300 hover:text-white transition text-sm"
          >
            ← 戻る
          </Link>
          <h1 className="text-2xl font-bold text-blue-400">
            🚀 My Command Center
          </h1>
        </div>

        <span className="text-gray-500 text-sm hidden sm:block">
          システム稼働中...
        </span>
      </header>

      {/* ダッシュボード本体 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-screen">

        {/* ① Task Manager */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden flex flex-col shadow-lg shadow-blue-900/10 min-h-[500px]">
          <div className="bg-gray-800 p-2 px-4 font-bold border-b border-gray-700 flex justify-between items-center shrink-0">
            <span>📝 Task Manager</span>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
          </div>
          <iframe
            src="/todo"
            className="w-full flex-1 bg-gray-900 border-0"
            title="ToDo App"
          />
        </div>

        {/* ② Battle Field */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden flex flex-col shadow-lg shadow-green-900/10 min-h-[500px]">
          <div className="bg-gray-800 p-2 px-4 font-bold border-b border-gray-700 flex justify-between items-center shrink-0">
            <span>🎮 Battle Field</span>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
          </div>
          <iframe
            src="https://pong-game-vert.vercel.app/"
            className="w-full flex-1 border-0"
            title="Pong Game"
          />
        </div>

        {/* ③ AI Planner */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden flex flex-col shadow-lg shadow-purple-900/10 min-h-[500px]">
          <div className="bg-gray-800 p-2 px-4 font-bold border-b border-gray-700 flex justify-between items-center shrink-0">
            <span>🧠 AI Planner</span>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
          </div>
          <a
            href="https://ai-planner-alpha.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center text-indigo-300 hover:text-indigo-100 text-lg"
          >
            ▶ AI Planner を起動
          </a>
        </div>

        {/* ④ Insight Tutor */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden flex flex-col shadow-lg shadow-indigo-900/10 min-h-[500px]">
          <div className="bg-gray-800 p-2 px-4 font-bold border-b border-gray-700 flex justify-between items-center shrink-0">
            <span>📚 Insight Tutor</span>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
          </div>
          <a
            href="https://insight-tutor-two.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center text-indigo-300 hover:text-indigo-100 text-lg"
          >
            ▶ Insight Tutor を起動
          </a>
        </div>

      </div>
    </div>
  );
}
