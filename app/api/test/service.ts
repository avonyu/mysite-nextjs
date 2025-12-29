import { prisma } from "@/lib/prisma";

export interface TestInput {
  content: string;
  userId: string;
}

export interface TestResponse {
  id: string;
  content: string;
  createAt: Date;
  updateAt: Date;
  userId: string;
}

// TODO: understand this⬇️
export class TestService {
  static async createTest(input: TestInput): Promise<TestResponse> {
    try {
      const test = await prisma.test.create({
        data: {
          id: crypto.randomUUID(),
          content: input.content,
          userId: input.userId
        },
      });

      return {
        id: test.id,
        content: test.content,
        createAt: test.createAt,
        updateAt: test.updateAt,
        userId: test.userId
      };
    } catch (error) {
      throw new Error(`Failed to create test: ${error}`);
    }
  }

  static async getAllTests(): Promise<TestResponse[]> {
    try {
      const tests = await prisma.test.findMany({
        orderBy: {
          createAt: 'desc',
        },
      });

      return tests.map(test => ({
        id: test.id,
        content: test.content,
        createAt: test.createAt,
        updateAt: test.updateAt,
        userId: test.userId
      }));
    } catch (error) {
      throw new Error(`Failed to fetch tests: ${error}`);
    }
  }

  static async getTestById(id: string): Promise<TestResponse | null> {
    try {
      const test = await prisma.test.findUnique({
        where: {
          id,
        },
      });

      if (!test) {
        return null;
      }

      return {
        id: test.id,
        content: test.content,
        createAt: test.createAt,
        updateAt: test.updateAt,
        userId: test.userId
      };
    } catch (error) {
      throw new Error(`Failed to fetch test: ${error}`);
    }
  }

  static async updateTest(id: string, input: Partial<TestInput>): Promise<TestResponse | null> {
    try {
      const test = await prisma.test.update({
        where: {
          id,
        },
        data: {
          content: input.content,
        },
      });

      return {
        id: test.id,
        content: test.content,
        createAt: test.createAt,
        updateAt: test.updateAt,
        userId: test.userId
      };
    } catch (error) {
      throw new Error(`Failed to update test: ${error}`);
    }
  }

  static async deleteTest(id: string): Promise<boolean> {
    try {
      await prisma.test.delete({
        where: {
          id,
        },
      });

      return true;
    } catch (error) {
      throw new Error(`Failed to delete test: ${error}`);
    }
  }
}