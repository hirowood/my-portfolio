import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { taskId, taskTitle } = await req.json();
    const apiKey = process.env.GOOGLE_API_KEY || "";
    const genAI = new GoogleGenerativeAI(apiKey);

    // 高速なモデルを使用
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash", // ダメなら "gemini-1.5-flash"
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
      あなたは「タスク分解のプロ」です。
      以下のタスクを、実行可能な具体的な「小タスク（手順）」に分解してください。

      【対象タスク】
      ${taskTitle}

      【ルール】
      1. 初心者でも迷わずできる具体的な行動にする（例：「調べる」→「公式サイトの○○ページを読む」）。
      2. 3〜5個のステップに分ける。
      3. JSON形式で返す。

      【出力フォーマット】
      {
        "subTasks": ["手順1", "手順2", "手順3"]
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const data = JSON.parse(responseText);

    // DBに保存
    if (data.subTasks && Array.isArray(data.subTasks)) {
      for (const title of data.subTasks) {
        await prisma.subTask.create({
          data: {
            title: title,
            taskId: taskId
          }
        });
      }
    }

    return NextResponse.json({ success: true, subTasks: data.subTasks });

  } catch (error) {
    console.error("Breakdown Error:", error);
    return NextResponse.json({ error: "分解に失敗しました" }, { status: 500 });
  }
}