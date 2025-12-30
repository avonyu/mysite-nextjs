import { NextRequest, NextResponse } from 'next/server';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from '@/lib/prisma'

// 获取所有待办事项
export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return;

  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        userId: session.user.id
      }
    });
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
  }
}

// 创建新待办事项
export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return;

  try {
    const { title, description, dueDate, priority, categoryIds } = await request.json();

    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        userId: session.user.id, // 从session中获取userId
      }
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
  }
}
