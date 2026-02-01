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
        <Link href="/mission" 
            className="
              relative group md:col-span-2 overflow-hidden p-8 md:p-10 rounded-3xl 
              bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900
              text-white shadow-2xl 
              hover:shadow-[0_25px_60px_-15px_rgba(59,130,246,0.5)]
              hover:scale-[1.02] 
              transition-all duration-500 ease-out
              border border-white/10
            "
          >
            {/* 背景のグロー効果 */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* アニメーションする光の粒子風オーブ */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl group-hover:bg-blue-400/40 transition-all duration-700" />
            <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all duration-700" />
            
            {/* 装飾アイコン（SVGでより洗練された表現） */}
            <div className="absolute right-8 bottom-8 opacity-[0.07] group-hover:opacity-[0.15] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
              <svg className="w-40 h-40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>

            {/* メインコンテンツ */}
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                {/* バッジエリア */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="
                    bg-gradient-to-r from-amber-400/20 to-orange-400/20 
                    backdrop-blur-xl px-4 py-1.5 rounded-full text-xs font-bold 
                    border border-amber-400/30 text-amber-200
                    shadow-lg shadow-amber-500/10
                    animate-pulse
                  ">
                    ✨ NEW
                  </span>
                  <span className="
                    bg-gradient-to-r from-emerald-500/20 to-teal-500/20 
                    backdrop-blur-xl text-emerald-300 px-4 py-1.5 rounded-full text-xs font-bold 
                    border border-emerald-400/30 
                    flex items-center gap-1.5
                    shadow-lg shadow-emerald-500/10
                  ">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    Gemini 2.5
                  </span>
                </div>

                {/* タイトル */}
                <h2 className="
                  text-3xl md:text-4xl font-black mb-4 tracking-tight 
                  bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text
                  group-hover:from-blue-100 group-hover:via-white group-hover:to-blue-100
                  transition-all duration-500
                ">
                  Mission Control
                  <span className="block text-lg md:text-xl font-semibold text-blue-300 mt-1">
                    AI-Powered Task Generator
                  </span>
                </h2>

                {/* 説明文 */}
                <p className="text-blue-100/80 max-w-lg leading-relaxed text-sm md:text-base">
                  <span className="text-white font-medium">「何から始めればいい？」</span>を一瞬で解決。
                  <br className="hidden sm:block"/>
                  AIコーチが目標をヒアリングし、今日やるべきタスクを自動生成。
                  <br className="hidden md:block"/>
                  あなたの成長を加速させる、次世代の学習管理ツール。
                </p>

                {/* 特徴リスト */}
                <div className="flex flex-wrap gap-3 mt-5 text-xs text-blue-200/70">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    目標設定
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    タスク自動生成
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    進捗トラッキング
                  </span>
                </div>
              </div>

              {/* CTAエリア */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <span className="
                  inline-flex items-center gap-2
                  bg-gradient-to-r from-white to-blue-50 
                  text-blue-700 px-6 py-3 rounded-xl font-bold text-sm 
                  shadow-lg shadow-black/20
                  group-hover:shadow-xl group-hover:shadow-blue-500/25
                  group-hover:from-blue-50 group-hover:to-white
                  transition-all duration-300
                ">
                  Launch Mission
                  <svg 
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                
                <span className="
                  text-xs font-medium text-blue-300/60 
                  flex items-center gap-2
                ">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Powered by Gemini
                </span>
              </div>
            </div>
            
            {/* ボーダーグロー効果 */}
            <div className="absolute inset-0 rounded-3xl border border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none" />
         </Link>
        </div>

      </main>
    </div>
  );
}