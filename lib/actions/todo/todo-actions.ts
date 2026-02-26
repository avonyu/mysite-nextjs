"use server"

import prisma from "@/lib/prisma";
import { Response } from '../types'
import { type TodoTask, Prisma } from "@/generated/prisma/client"

export async function createTodoTask(userId: string | undefined, formData: FormData): Promise<Response<TodoTask>> {
  try {
    if (!userId) throw new Error("userId is undefined.")
    const rawFormData = Object.fromEntries(formData)

    const todoItem = await prisma.todoTask.create({
      data: {
        id: crypto.randomUUID(),
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

export async function getAllTodoTasks(userId: string): Promise<Response<TodoTask>> {
  try {
    const todoItems = await prisma.todoTask.findMany({
      where: {
        userId,
      },
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

export async function getTodoTasksBySetId(userId: string | undefined, todoSetId?: string): Promise<Response<TodoTask>> {
  try {
    if (!userId) throw new Error("userId is undefined.")

    const where: Prisma.TodoTaskWhereInput = {
      userId,
    };

    if (todoSetId === "today") {
      where.isToday = true;
    } else if (todoSetId === "important") {
      where.isImportant = true;
    } else if (todoSetId === "inbox") {
      // inbox集合用于获取所有的todoItem
    } else if (todoSetId === "planned") {
      where.dueDate = { not: null };
    } else {
      where.setId = todoSetId;
    }

    const todoItems = await prisma.todoTask.findMany({
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

export async function changeTodoTask(todoId: string, input: Partial<Omit<TodoTask, "id">>): Promise<Response<TodoTask>> {
  try {
    const todoItem = await prisma.todoTask.update({
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

export async function deleteTodoTask(todoId: string): Promise<Response<TodoTask>> {
  try {
    const deletedTodoItem = await prisma.todoTask.delete({
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