"use server"

import prisma from "@/lib/prisma";

export interface TodoSet {
  id: number;
  name: string;
  userId: string;
}

export interface Response {
  message: string;
  code: number; // 200: success, 400: bad request, 500: internal server error
  data: TodoSet | null;
}

export async function createTodoSet(input: TodoSet): Promise<Response> {
  try {
    const todoSet = await prisma.todoSet.create({
      data: {
        name: input.name,
        userId: input.userId,
      },
    });

    return {
      message: 'Todo set created successfully',
      code: 200,
      data: todoSet,
    };
  } catch (error) {
    throw new Error(`Failed to create todo set: ${error}`);
  }
}