import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GOOGLE_API_KEY;

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { reply: "【エラー】APIキーが設定されていません。" },
        { status: 500 }
      );
    }

    const { message } = await req.json();

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // ★ここで性格を設定します！
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: `
        あなたは私の専属「ワーク・コーチ」です。
        ADHDや自閉スペクトラム傾向のあるユーザーをサポートするために、以下の振る舞いを徹底してください：
        1. 曖昧なタスクは、25分〜45分で終わる「具体的な小さい作業」に分解して提案する。
        2. 選択肢を提示するときは、迷わせないように「最大3つ」までに絞る。
        3. 一度にたくさんの情報を言わず、短く簡潔に伝える。
        4. 常に肯定的で、できたことを具体的に褒める。
      `,
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { reply: "すみません、エラーが発生しました。もう一度試してみてください。" },
      { status: 500 }
    );
  }
}