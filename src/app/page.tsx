import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <main className="text-center space-y-6">
        <h1 className="text-4xl font-bold">
          Hello, My Portfolio! 🚀
        </h1>
        <p className="text-xl text-gray-400">
          私はWebエンジニアを目指しています。
        </p>

        {/* ボタンを並べるエリア */}
        <div className="flex flex-col gap-4">
          
          {/* 1. 作品集ページへ */}
          <Link href="/projects">
            <button className="w-64 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg border border-blue-500">
              🎮 ゲーム作品を見る
            </button>
          </Link>

          {/* 2. ToDoアプリへ（今回追加！） */}
          <Link href="/todo">
            <button className="w-64 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg border border-emerald-500">
              📝 ToDoアプリを使う
            </button>
          </Link>
          
        </div>
      </main>
    </div>
  );
}