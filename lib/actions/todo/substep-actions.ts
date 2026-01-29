"use server"

import prisma from "@/lib/prisma";

export interface Substep {
  id: number;
  content: string;
  isFinish: boolean;
  order: number;
  todoItemId: number;
}

export interface Response {
  message: string;
  code: number; // 200: success, 400: bad request, 500: internal server error
  data: Substep[] | null;
}

export interface SubstepInput {
  content: string;
  isFinish: boolean;
  order: number;
  todoItemId: number;
}

export async function createSubstep(userId: string, input: SubstepInput): Promise<Response> {
  try {
    const substep = await prisma.todoSubstep.create({
      data: {
        content: input.content,
        isFinish: input.isFinish || false,
        order: input.order,
        todoItemId: input.todoItemId,
        userId: userId,
      },
    });

    return {
      message: 'Substep created successfully',
      code: 200,
      data: [substep],
    };
  } catch (error) {
    throw new Error(`Failed to create substep: ${error}`);
  }
}

export async function getAllSubsteps(todoItemId: number): Promise<Response> {
  try {
    const substeps = await prisma.todoSubstep.findMany({
      where: {
        todoItemId,
      },
      orderBy: {
        order: 'asc',
      },
    });

    return {
      message: 'Substeps fetched successfully',
      code: 200,
      data: substeps,
    };
  } catch (error) {
    throw new Error(`Failed to fetch substeps: ${error}`);
  }
}

export async function updateSubstep(substepId: number, input: SubstepInput): Promise<Response> {
  try {
    const substep = await prisma.todoSubstep.update({
      where: {
        id: substepId,
      },
      data: {
        content: input.content,
        isFinish: input.isFinish,
        order: input.order,
        todoItemId: input.todoItemId,
      },
    });

    return {
      message: 'Substep updated successfully',
      code: 200,
      data: [substep],
    };
  } catch (error) {
    throw new Error(`Failed to update substep: ${error}`);
  }
}

export async function deleteSubstep(substepId: number): Promise<Response> {
  try {
    await prisma.todoSubstep.delete({
      where: {
        id: substepId,
      },
    });

    return {
      message: 'Substep deleted successfully',
      code: 200,
      data: null,
    };
  } catch (error) {
    throw new Error(`Failed to delete substep: ${error}`);
  }
}