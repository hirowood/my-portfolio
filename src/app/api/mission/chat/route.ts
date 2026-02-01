import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// データ構造の定義
type GeneratedTask = {
  title: string;
  estimatedMinutes: number;
  subTasks: string[];
};

type ChatMessage = {
  role: "user" | "bot";
  content: string;
};

export async function POST(req: Request) {
  try {
    const { message, history = [] } = await req.json();
    const apiKey = process.env.GOOGLE_API_KEY || "";
    const genAI = new GoogleGenerativeAI(apiKey);

    // ★ご指摘の通り gemini-2.5-flash を使用します
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash", 
      generationConfig: { responseMimeType: "application/json" }
    });

    // 会話履歴を文字列に変換（過去の文脈をAIに読ませる）
    const conversationHistory = (history as ChatMessage[])
      .map(msg => `【${msg.role === "user" ? "ユーザー" : "コーチ"}】\n${msg.content}`)
      .join("\n\n");

    const systemPrompt = `
      あなたはユーザーの学習を成功させる「専属学習コーチ」です。

      【これまでの会話履歴】
      ${conversationHistory || "（初回の会話です）"}

      【あなたのミッション】
      ユーザーの目標達成のために、以下の2フェーズを実行してください。

      === フェーズ1：徹底ヒアリング ===
      ユーザーの情報が足りない場合、タスクを作らずに以下の情報を収集してください。
      **一度に質問するのは1つだけにしてください（ユーザーが答えやすくするため）。**
      
      必要な情報：
      1. **目的**: 何を学びたいか、なぜ学びたいか
      2. **現状**: 今のスキルレベル（初心者/経験者など）
      3. **時間**: 1日の学習可能時間

      === フェーズ2：タスク設計 ===
      **上記3つがすべて揃ったら、追加質問せずにタスクを生成してください。**

      タスク設計のルール：
      - ユーザーの1日の学習時間に収まるように設計
      - 具体的で迷わず着手できるレベルにする
      - 親タスク → 子タスクの2階層構造

      【出力フォーマット（JSON）】
      必ず以下のJSON形式で返答してください。
      {
        "reply": "ユーザーへのメッセージ（質問または提案）",
        "phase": "HEARING" または "PLANNING", 
        "tasks": [
          {
             "title": "親タスク名",
             "estimatedMinutes": 30,
             "subTasks": ["子タスク1", "子タスク2"]
          }
        ]
      }
      ※ ヒアリング中は "tasks": [] にしてください。
    `;

    const result = await model.generateContent([
      systemPrompt, 
      `\n【ユーザーの最新メッセージ】\n${message}`
    ]);
    const responseText = result.response.text();
    const data = JSON.parse(responseText);

    // タスク保存処理
    if (data.tasks && Array.isArray(data.tasks) && data.tasks.length > 0) {
      for (const t of data.tasks as GeneratedTask[]) {
        const newParent = await prisma.task.create({
          data: {
            title: t.title,
            estimatedMinutes: t.estimatedMinutes,
          }
        });

        if (t.subTasks && t.subTasks.length > 0) {
          for (const subTitle of t.subTasks) {
            await prisma.subTask.create({
              data: {
                title: subTitle,
                taskId: newParent.id
              }
            });
          }
        }
      }
    }

    return NextResponse.json({ 
      reply: data.reply,
      phase: data.phase,
      tasks: data.tasks 
    });

  } catch (error) {
    console.error("Mission API Error:", error);
    return NextResponse.json({ reply: "エラーが発生しました" }, { status: 500 });
  }
}