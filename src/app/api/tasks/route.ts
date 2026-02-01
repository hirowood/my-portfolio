import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 1. GET: タスク一覧を取得する（子タスク付き）
export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        subTasks: {
          orderBy: { id: 'asc' }
        }
      },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: '取得失敗' }, { status: 500 });
  }
}

// 2. POST: タスクを追加する
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newTask = await prisma.task.create({
      data: {
        title: body.title,
      },
    });
    return NextResponse.json(newTask);
  } catch (error) {
    return NextResponse.json({ error: '作成失敗' }, { status: 500 });
  }
}