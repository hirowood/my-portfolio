import Link from 'next/link';
// ★さっき作った3D部品を読み込み
// import Scene from '../components/SpinningBox';
import Scene from '@/components/SpinningBox';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 text-white p-4">
      <main className="text-center space-y-8 max-w-2xl w-full">
        
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Hello, My Future! 🚀
        </h1>
        
        <p className="text-xl text-gray-400">
          エンジニア × 3Dクリエイターへの道
        </p>

        {/* ★ここに3Dシーンを表示！ */}
        <div className="w-full">
          <Scene />
          <p className="text-sm text-gray-500 mt-2">
            👆 クリックしたり、マウスを乗せたりしてみて！
          </p>
        </div>

        {/* ボタンエリア */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <Link href="/projects" className="w-full">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition shadow-lg border border-blue-500">
              🎮 ゲーム作品
            </button>
          </Link>

          <Link href="/todo" className="w-full">
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition shadow-lg border border-emerald-500">
              📝 ToDoアプリ
            </button>
          </Link>

          <Link href="/dashboard" className="w-full">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition shadow-lg border border-purple-500">
              🚀 司令室
            </button>
          </Link>
          {/* AIチャットへのリンクカード */}
          <Link href="/chat" className="block p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500 hover:bg-gray-750 transition group">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white group-hover:text-blue-400">
              AI Chat 🤖
            </h2>
            <span className="text-3xl">✨</span>
          </div>
          <p className="text-gray-400">
            Gemini 2.5 を搭載した最新のAIチャット。<br/>
            悩み相談からアイデア出しまで。
          </p>
        </Link>
        </div>

      </main>
    </div>
  );
}