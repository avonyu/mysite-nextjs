import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma/client';

const prisma = new PrismaClient();

// 更新待办事项
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const { completed } = await request.json();
    const todo = await prisma.todo.update({
      where: { id },
      data: { completed },
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
    console.error('Error updating todo:', error);
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
  }
}

// 删除待办事项
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.todo.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}