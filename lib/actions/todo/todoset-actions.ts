"use server"

import prisma from "@/lib/prisma";
import { type TodoSet } from "@/generated/prisma/client";
import { Response } from "../types";

export async function createTodoSet(userId: string, name: string): Promise<Response<TodoSet>> {
  try {
    const todoSet = await prisma.todoSet.create({
      data: {
        id: crypto.randomUUID(),
        name: name,
        userId: userId,
      },
    });

    return {
      message: 'Todo set created successfully',
      code: 200,
      data: [todoSet],
    };
  } catch (error) {
    throw new Error(`Failed to create todo set: ${error}`);
  }
}

export async function getAllTodoSets(userId: string): Promise<Response<TodoSet>> {
  try {
    const todoSets = await prisma.todoSet.findMany({
      where: {
        userId: userId,
      },
    });

    return {
      message: 'Todo sets fetched successfully',
      code: 200,
      data: todoSets,
    };
  } catch (error) {
    throw new Error(`Failed to fetch todo sets: ${error}`);
  }
}
