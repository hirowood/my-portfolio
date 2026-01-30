export default function Projects() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">私の作品集</h1>
      
      <div className="max-w-4xl mx-auto grid gap-8">
        {/* Pong Game Card */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4">🏓 Pong Game (AI Battle)</h2>
          <p className="text-gray-400 mb-4">
            Phaser.jsを使って開発した、AIと対戦できるピンポンゲームです。
            私が初めて作ったブラウザゲームです！
          </p>
          
          {/* ゲームの埋め込み (iframe) */}
          <div className="aspect-video w-full border-2 border-gray-600 rounded-lg overflow-hidden">
            <iframe 
              src="https://pong-game-vert.vercel.app/" 
              className="w-full h-full"
              title="Pong Game"
            />
          </div>
        </div>
      </div>
    </div>
  );
}