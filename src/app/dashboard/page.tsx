export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      {/* ヘッダー部分 */}
      <header className="mb-6 flex justify-between items-center border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-bold text-blue-400">
          🚀 My Command Center
        </h1>
        <span className="text-gray-500 text-sm">
          システム稼働中...
        </span>
      </header>

      {/* ダッシュボードのメインエリア（グリッドレイアウト） */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[80vh]">
        
        {/* 左側：ToDoアプリ（内部のページを埋め込み） */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden flex flex-col">
          <div className="bg-gray-800 p-2 px-4 font-bold border-b border-gray-700 flex justify-between">
            <span>📝 Task Manager</span>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          {/* ★ここで /todo ページを埋め込んでいます */}
          <iframe 
            src="/todo" 
            className="w-full h-full bg-gray-900"
            title="ToDo App"
          />
        </div>

        {/* 右側：Pongゲーム（外部のURLを埋め込み） */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden flex flex-col">
          <div className="bg-gray-800 p-2 px-4 font-bold border-b border-gray-700 flex justify-between">
            <span>🎮 Battle Field</span>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          {/* ★ここでゲームのURLを埋め込んでいます */}
          <iframe 
            src="https://pong-game-vert.vercel.app/" 
            className="w-full h-full"
            title="Pong Game"
          />
        </div>

      </div>
    </div>
  );
}