'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await signIn('credentials', {
      password: password,
      redirect: false,
    });

    if (result?.error) {
      setError('パスワードが違います');
    } else {
      router.push('/mission'); // 成功したらMissionページへ
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 text-white font-sans p-6">
      <div className="w-full max-w-md bg-gray-900/50 border border-gray-800 p-8 rounded-2xl backdrop-blur-sm shadow-2xl">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Security Check
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            これより先は機密エリアです。<br/>パスワードを入力してください。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              placeholder="Access Code..."
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition text-center tracking-widest text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center animate-pulse">
              ⚠️ {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition shadow-[0_0_20px_rgba(37,99,235,0.3)]"
          >
            LOGIN
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-600">
          Mission Control System v2.5
        </div>
      </div>
    </div>
  );
}