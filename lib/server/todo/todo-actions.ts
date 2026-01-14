"use server"

import prisma from "@/lib/prisma";

export interface TodoItemInput {
  content: string;
  isFinish: boolean;
  isImportant: boolean;
  isToday: boolean;
  order: number;
  todoSetId: number | null;
  dueDate: Date | null;
  userId: string;
}

export interface Response {
  message: string;
  code: number; // 200: success, 400: bad request, 500: internal server error
  data: TodoItem[];
}

export interface TodoItem {
  id: number;
  content: string;
  isFinish: boolean;
  isImportant: boolean;
  isToday: boolean;
  order: number;
  todoSetId: number | null;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface TodoSetInput {
  name: string;
  emoji?: string;
  bgImg?: string;
  userId: string;
}

export interface TodoSetResponse {
  id: number;
  name: string;
  emoji?: string;
  bgImg?: string;
  userId: string;
}

export async function createTodoItem(input: TodoItemInput): Promise<Response> {
  try {
    const todoItem = await prisma.todoItem.create({
      data: {
        ...input,
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

export async function getAllTodoItems(userId: string): Promise<Response> {
  try {
    const todoItems = await prisma.todoItem.findMany({
      where: {
        userId,
      },
      orderBy: {
        order: 'asc',
      },
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

export async function changeTodoItem(todoId: number, input: TodoItemInput): Promise<Response> {
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

export async function deleteTodoItem(todoId: number): Promise<Response> {
  try {
    await prisma.todoItem.delete({
      where: {
        id: todoId,
      },
    });

    return {
      message: 'Todo item deleted successfully',
      code: 200,
      data: [],
    };
  } catch (error) {
    throw new Error(`Failed to delete todo item: ${error}`);
  }
}