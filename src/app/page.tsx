import Link from "next/link";
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <main className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Hello, My Portfolio! 🚀
        </h1>
        <p className="text-xl text-gray-400">
          私はWebエンジニアを目指しています。
        </p>
        <Link href="https://pong-game-vert.vercel.app/">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">
            私の作品を見る
          </button>
        </Link>
        
      </main>
    </div>
  );
}