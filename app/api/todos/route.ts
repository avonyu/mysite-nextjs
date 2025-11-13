import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma/client';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const prisma = new PrismaClient();

// 获取所有待办事项
export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
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
  console.log(session);
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
        categories: {
          create: categoryIds.map((categoryId: string) => ({
            category: {
              connect: { id: categoryId },
            },
          })),
        },
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
  }
}
