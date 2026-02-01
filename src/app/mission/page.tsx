'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
// ★追加: ログアウト機能の読み込み
import { signOut } from 'next-auth/react';

// ---------------------------------------------------------
// 型定義
// ---------------------------------------------------------
type Message = { role: 'user' | 'bot'; content: string };
type SubTask = { id: number; title: string; completed: boolean };
type Task = {
  id: number;
  title: string;
  completed: boolean;
  estimatedMinutes: number | null;
  startedAt: string | null;
  finishedAt: string | null;
  subTasks: SubTask[];
};

export default function MissionPage() {
  // ---------------------------------------------------------
  // State
  // ---------------------------------------------------------
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTasksLoading, setIsTasksLoading] = useState(true);
  
  // どのタスクが「細分化中」かを管理するState
  const [breakingDownId, setBreakingDownId] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ---------------------------------------------------------
  // API通信: タスク取得
  // ---------------------------------------------------------
  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      if (res.ok) setTasks(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setIsTasksLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ---------------------------------------------------------
  // API通信: チャット送信
  // ---------------------------------------------------------
  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;

    const userMsg: Message = { role: 'user', content: chatInput };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const history = updatedMessages.map(msg => ({
        role: msg.role === 'bot' ? 'assistant' : 'user',
        content: msg.content
      }));

      const res = await fetch('/api/mission/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: chatInput,
          history: history
        }),
      });
      
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', content: data.reply }]);
      fetchTasks();

    } catch (e) {
      setMessages(prev => [...prev, { role: 'bot', content: 'エラーが発生しました' }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ---------------------------------------------------------
  // タスク操作: 細分化
  // ---------------------------------------------------------
  const breakDownTask = async (task: Task) => {
    if (breakingDownId !== null) return; // 二重送信防止
    setBreakingDownId(task.id);

    try {
      const res = await fetch('/api/mission/breakdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          taskId: task.id,
          taskTitle: task.title
        }),
      });

      if (res.ok) {
        await fetchTasks(); // リストを更新して子タスクを表示
      }
    } catch (e) {
      alert("細分化に失敗しました");
    } finally {
      setBreakingDownId(null);
    }
  };

  // ---------------------------------------------------------
  // タスク操作: その他
  // ---------------------------------------------------------
  const startTask = async (id: number) => {
    const now = new Date().toISOString();
    setTasks(tasks.map(t => t.id === id ? { ...t, startedAt: now } : t));
    await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ startedAt: now }),
    });
  };

  const finishTask = async (id: number) => {
    const now = new Date().toISOString();
    setTasks(tasks.map(t => t.id === id ? { ...t, finishedAt: now, completed: true } : t));
    await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ finishedAt: now, completed: true }),
    });
  };

  const deleteTask = async (id: number) => {
    if(!confirm("削除しますか？")) return;
    setTasks(tasks.filter(t => t.id !== id));
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
  };

  const calculateDuration = (start: string, end: string) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    return Math.round((endTime - startTime) / 1000 / 60);
  };

  // ---------------------------------------------------------
  // 画面描画
  // ---------------------------------------------------------
  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden font-sans">
      
      {/* 左エリア */}
      <div className="w-1/3 flex flex-col border-r border-gray-800 bg-gray-900/50">
        <div className="p-4 border-b border-gray-800 bg-gray-900 sticky top-0 flex items-center shadow-lg z-10">
          <Link href="/" className="mr-3 text-gray-400 hover:text-white transition">←</Link>
          <h2 className="font-bold text-blue-400 tracking-wide">AI Coach</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-10 text-sm">
              <p>目標を教えてください。</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[90%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-200 border border-gray-700'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isChatLoading && <div className="text-gray-500 text-xs ml-2 animate-pulse">Thinking...</div>}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-gray-900 border-t border-gray-800">
          <div className="flex gap-2">
            <input
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:border-blue-500 outline-none transition"
              placeholder="メッセージを入力..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.nativeEvent.isComposing && sendChatMessage()}
            />
            <button 
              onClick={sendChatMessage}
              disabled={isChatLoading || !chatInput}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-4 rounded-lg font-bold text-sm transition"
            >
              送信
            </button>
          </div>
        </div>
      </div>

      {/* 右エリア */}
      <div className="w-2/3 flex flex-col bg-black">
        <div className="p-4 border-b border-gray-800 bg-gray-900/80 backdrop-blur sticky top-0 z-10 flex justify-between items-center">
          <h2 className="font-bold text-emerald-400 flex items-center gap-2">
            🚀 Mission Control
          </h2>
          
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">
              Task Count: {tasks.length}
            </span>
            
            {/* ★ログアウトボタン */}
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="text-xs text-gray-400 hover:text-red-400 border border-gray-700 hover:border-red-500/50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2"
              title="ログアウト"
            >
              🚪 Sign Out
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {isTasksLoading ? (
            <p className="text-gray-500 text-center mt-10">Loading...</p>
          ) : (
            <div className="space-y-4 max-w-3xl mx-auto">
              {tasks.map(task => {
                const isRunning = task.startedAt && !task.finishedAt;
                const isDone = task.completed;
                const actualTime = (task.startedAt && task.finishedAt) 
                  ? calculateDuration(task.startedAt, task.finishedAt) 
                  : null;

                return (
                  <div key={task.id} className={`relative border rounded-xl p-5 transition-all duration-300 ${
                    isDone ? 'bg-gray-900/30 border-gray-800 opacity-60' : 
                    isRunning ? 'bg-gray-900 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 
                    'bg-gray-900 border-gray-800 hover:border-gray-600'
                  }`}>
                    
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className={`text-xl font-bold ${isDone ? 'line-through text-gray-500' : 'text-white'}`}>
                          {task.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-1 text-xs font-mono">
                          <span className="text-gray-400 bg-gray-800 px-2 py-1 rounded">
                            {task.estimatedMinutes ?? '?'}min
                          </span>
                          {actualTime !== null && (
                            <span className={`px-2 py-1 rounded ${actualTime > (task.estimatedMinutes || 0) ? 'text-red-400 bg-red-900/20' : 'text-emerald-400 bg-emerald-900/20'}`}>
                              Actual: {actualTime}min
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* ★細分化ボタン (子タスクがない、かつ未完了の場合に表示) */}
                        {!isDone && (
                          <button 
                            onClick={() => breakDownTask(task)}
                            disabled={breakingDownId === task.id}
                            className={`p-2 rounded hover:bg-gray-800 text-yellow-400 transition ${
                                breakingDownId === task.id ? 'animate-spin' : ''
                            }`}
                            title="AIでプロセスを細分化する"
                          >
                            {breakingDownId === task.id ? '⏳' : '⚡'}
                          </button>
                        )}

                        <button onClick={() => deleteTask(task.id)} className="text-gray-600 hover:text-red-500 p-2">
                          🗑️
                        </button>
                        
                        {!isDone && !isRunning && (
                          <button onClick={() => startTask(task.id)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg active:scale-95 transition">
                            ▶ START
                          </button>
                        )}
                        {isRunning && (
                          <button onClick={() => finishTask(task.id)} className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg animate-pulse active:scale-95 transition">
                            ■ STOP
                          </button>
                        )}
                        {isDone && (
                          <span className="text-emerald-500 font-bold text-sm border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 rounded-full">
                            DONE
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 子タスクリスト */}
                    {task.subTasks.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-800 animate-in slide-in-from-top-2">
                        <ul className="space-y-2">
                          {task.subTasks.map(sub => (
                            <li key={sub.id} className="flex items-center text-sm text-gray-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mr-3"></span>
                              {sub.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}