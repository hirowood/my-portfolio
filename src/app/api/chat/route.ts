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
    
    // ★ここを最新モデルに変更しました！
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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