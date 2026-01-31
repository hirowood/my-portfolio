'use client';

import { useState, useEffect } from 'react'; // ★useEffectを追加

export default function TodoPage() {
  const [tasks, setTasks] = useState<{ id: number; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  // ★ロードが完了したかどうかのフラグ
  const [isLoaded, setIsLoaded] = useState(false);
  
// --------------------------------------------
  // ★追加機能1：アプリを開いた瞬間に、データを読み込む
  // --------------------------------------------
  useEffect(() => {
    const savedTasks = localStorage.getItem("my-todo-tasks");
    
    if (savedTasks) {
      // eslint-disable-next-line
      setTasks(JSON.parse(savedTasks));
    }
    
    setIsLoaded(true);
  }, []);

  // --------------------------------------------
  // ★追加機能2：タスクが変わるたびに、自動保存する
  // --------------------------------------------
  useEffect(() => {
    // ロードが終わってから保存を開始する（空っぽで上書きしないように！）
    if (isLoaded) {
      localStorage.setItem("my-todo-tasks", JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]); // tasks か isLoaded が変わるたびに実行

  // --------------------------------------------
  // 以下はさっきと同じ機能です
  // --------------------------------------------

  const addTask = () => {
    if (input === "") return;
    const newTask = { id: Date.now(), text: input };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (id: number, currentText: string) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const saveTask = (id: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, text: editText };
      }
      return task;
    });
    setTasks(updatedTasks);
    setEditingId(null);
    setEditText("");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">📝 ずっと残るToDoリスト</h1>

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

      <ul className="w-full max-w-md space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-gray-800 p-3 rounded border border-gray-700 flex justify-between items-center min-h-[60px]"
          >
            {editingId === task.id ? (
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