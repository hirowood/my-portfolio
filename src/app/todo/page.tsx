'use client';

import { useState } from 'react';

export default function TodoPage() {
  // 1. 基本の記憶（タスク一覧、新規追加用の入力）
  const [tasks, setTasks] = useState<{ id: number; text: string }[]>([]);
  const [input, setInput] = useState("");

  // ★追加：編集のための記憶
  // editingId: 今編集しているタスクのID（誰も編集してなければ null）
  // editText: 編集中の文字
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  // 機能A：タスク追加
  const addTask = () => {
    if (input === "") return;
    const newTask = { id: Date.now(), text: input };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  // 機能B：削除
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // ★機能C：編集モードを開始する
  const startEditing = (id: number, currentText: string) => {
    setEditingId(id);       // 「このIDのやつを編集するぞ！」とマーク
    setEditText(currentText); // 今の文字を入力欄にセット
  };

  // ★機能D：編集を保存する
  const saveTask = (id: number) => {
    const updatedTasks = tasks.map((task) => {
      // IDが一致したら、文字を書き換える
      if (task.id === id) {
        return { ...task, text: editText };
      }
      return task; // 違うやつはそのまま
    });
    setTasks(updatedTasks);
    setEditingId(null); // 編集モード終了
    setEditText("");
  };

  // ★機能E：編集キャンセル
  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">📝 多機能ToDoリスト</h1>

      {/* 新規追加エリア */}
      <div className="flex gap-2 mb-8 w-full max-w-md">
        <input
          type="text"
          className="flex-1 p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="新しいタスクを入力..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-bold transition"
        >
          追加
        </button>
      </div>

      {/* タスク一覧表示エリア */}
      <ul className="w-full max-w-md space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-gray-800 p-3 rounded border border-gray-700 flex justify-between items-center min-h-[60px]"
          >
            {/* ★ここがポイント！編集モードかどうかで表示を切り替える */}
            {editingId === task.id ? (
              // ■ 編集モードのときの表示（入力欄 + 保存ボタン）
              <div className="flex gap-2 w-full">
                <input
                  type="text"
                  className="flex-1 p-1 rounded bg-gray-700 text-white border border-blue-500 outline-none"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button
                  onClick={() => saveTask(task.id)}
                  className="text-emerald-400 hover:text-emerald-300 font-bold text-sm px-2"
                >
                  保存
                </button>
                <button
                  onClick={cancelEditing}
                  className="text-gray-400 hover:text-gray-300 text-sm px-2"
                >
                  戻る
                </button>
              </div>
            ) : (
              // ■ 通常モードのときの表示（文字 + 編集ボタン + 削除ボタン）
              <>
                <span className="flex-1 break-all">{task.text}</span>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => startEditing(task.id, task.text)}
                    className="text-yellow-400 hover:text-yellow-300 font-bold text-sm px-2 py-1 rounded hover:bg-gray-700 transition"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-400 hover:text-red-300 font-bold text-sm px-2 py-1 rounded hover:bg-gray-700 transition"
                  >
                    削除
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}