"use server"

import prisma from "@/lib/prisma";
import { Response } from '../types'
import { type TodoItem, Prisma } from "@/generated/prisma/client"

export async function createTodoItem(userId: string | undefined, formData: FormData): Promise<Response<TodoItem>> {
  try {
    if (!userId) throw new Error("userId is undefined.")
    const rawFormData = Object.fromEntries(formData)

    const todoItem = await prisma.todoItem.create({
      data: {
        userId: userId,
        content: (rawFormData.content as string).trim(),
      },
    });

    return {
      message: 'Todo item created successfully',
      code: 200,
      data: [todoItem],
    };
  } catch (error) {
    throw new Error(`Failed to create todo item: ${error}`);
  }
}

export async function getAllTodoItemsBySetId(userId: string | undefined, todoSetId?: string): Promise<Response<TodoItem>> {
  try {
    if (!userId) throw new Error("userId is undefined.")

    const where: Prisma.TodoItemWhereInput = {
      userId,
    };

    if (todoSetId === "today") {
      where.isToday = true;
    } else if (todoSetId === "important") {
      where.isImportant = true;
    } else if (todoSetId === "tasks") {
      // tasks集合用于获取所有的todoItem
    } else if (todoSetId === "planned") {
      where.dueDate = { not: null };
    } else {
      where.todoSetId = todoSetId;
    }

    const todoItems = await prisma.todoItem.findMany({
      where,
      orderBy: [
        { isImportant: 'desc' },
        { updatedAt: 'desc' },
      ],
    });

    return {
      message: 'Todo items fetched successfully',
      code: 200,
      data: todoItems,
    };
  } catch (error) {
    throw new Error(`Failed to fetch todo items: ${error}`);
  }
}

export async function changeTodoItem(todoId: string, input: Partial<Omit<TodoItem, "id">>): Promise<Response<TodoItem>> {
  try {
    const todoItem = await prisma.todoItem.update({
      where: {
        id: todoId,
      },
      data: {
        ...input,
      },
    });

    return {
      message: 'Todo item updated successfully',
      code: 200,
      data: [todoItem],
    };
  } catch (error) {
    throw new Error(`Failed to update todo item: ${error}`);
  }
}

export async function deleteTodoItem(todoId: string): Promise<Response<TodoItem>> {
  try {
    const deletedTodoItem = await prisma.todoItem.delete({
      where: {
        id: todoId,
      },
    });

    return {
      message: 'Todo item deleted successfully',
      code: 200,
      data: [deletedTodoItem],
    };
  } catch (error) {
    throw new Error(`Failed to delete todo item: ${error}`);
  }
}