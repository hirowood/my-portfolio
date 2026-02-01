import Link from 'next/link'; // ★これを追加

export default function Projects() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      
      {/* ヘッダーエリア */}
      <div className="max-w-4xl mx-auto mb-8 flex items-center relative">
        {/* 戻るボタン */}
        <Link 
          href="/" 
          className="absolute left-0 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-gray-200 transition text-sm"
        >
          ← 戻る
        </Link>

        {/* タイトル（画面中央に配置） */}
        <h1 className="text-3xl font-bold text-center w-full">
          私の作品集
        </h1>
      </div>
      
      <div className="max-w-4xl mx-auto grid gap-8">
        {/* Pong Game Card */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-xl shadow-purple-900/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-orange-400">🏓 Pong Game (AI Battle)</h2>
            <span className="bg-orange-900 text-orange-200 text-xs px-2 py-1 rounded">Phaser.js</span>
          </div>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            Phaser.jsを使って開発した、AIと対戦できるピンポンゲームです。<br/>
            ボールの速度計算やAIの動きなど、JavaScriptの基礎ロジックを詰め込みました。
            私が初めて作った記念すべきブラウザゲームです！
          </p>
          
          {/* ゲームの埋め込み (iframe) */}
          <div className="aspect-video w-full border border-gray-600 rounded-lg overflow-hidden bg-black shadow-inner">
            <iframe 
              src="https://pong-game-vert.vercel.app/" 
              className="w-full h-full"
              title="Pong Game"
            />
          </div>
          
          <div className="mt-4 text-center">
            <a 
              href="https://pong-game-vert.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline text-sm"
            >
              🔗 全画面で遊ぶ（外部サイトへ）
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}