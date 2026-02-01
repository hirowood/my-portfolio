import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Next.js 15対応: paramsはPromise型として定義します
type RouteParams = {
  params: Promise<{ id: string }>;
};

// 3. PATCH: タスクを更新する（編集・完了・時間記録）
export async function PATCH(
  request: Request,
  props: RouteParams // ここで型を指定
) {
  try {
    // ★ここが修正ポイント！ await して中身を取り出します
    const params = await props.params;
    const id = parseInt(params.id);
    
    const body = await request.json();

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title: body.title,
        completed: body.completed,
        startedAt: body.startedAt,
        finishedAt: body.finishedAt,
      },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '更新に失敗しました' }, { status: 500 });
  }
}

// 4. DELETE: タスクを削除する
export async function DELETE(
  request: Request,
  props: RouteParams // ここでも型を指定
) {
  try {
    // ★ここも修正ポイント！ await します
    const params = await props.params;
    const id = parseInt(params.id);

    await prisma.task.delete({
      where: { id },
    });

    return NextResponse.json({ message: '削除しました' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '削除に失敗しました' }, { status: 500 });
  }
}