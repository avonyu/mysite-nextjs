"use server"

import prisma from "@/lib/prisma";

export interface Substep {
  id: string;
  content: string;
  isFinish: boolean;
  taskId: string;
}

export interface Response {
  message: string;
  code: number; // 200: success, 400: bad request, 500: internal server error
  data: Substep[] | null;
}

export interface SubstepInput {
  content: string;
  isFinish: boolean;
  taskId: string;
}

export async function createSubstep(userId: string, input: SubstepInput): Promise<Response> {
  try {
    const substep = await prisma.todoTaskStep.create({
      data: {
        id: crypto.randomUUID(),
        content: input.content,
        isFinish: input.isFinish || false,
        taskId: input.taskId,
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

export async function getAllSubsteps(taskId: string): Promise<Response> {
  try {
    const substeps = await prisma.todoTaskStep.findMany({
      where: {
        taskId,
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

export async function updateSubstep(substepId: string, input: SubstepInput): Promise<Response> {
  try {
    const substep = await prisma.todoTaskStep.update({
      where: {
        id: substepId,
      },
      data: {
        content: input.content,
        isFinish: input.isFinish,
        taskId: input.taskId,
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

export async function deleteSubstep(substepId: string): Promise<Response> {
  try {
    await prisma.todoTaskStep.delete({
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