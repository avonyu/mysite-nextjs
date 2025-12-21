import { prisma } from "@/lib/prisma"
import { TestService } from "./service"

export async function GET() {
  try {
    const tests = await TestService.getAllTests()
    return Response.json({ tests })
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const test = await TestService.createTest({ content: body.content, userId: body.userId })
    return Response.json({ test }, { status: 201 })
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const test = await TestService.updateTest(params.id, { content: body.content })

    if (!test) {
      return Response.json({ error: 'Test not found' }, { status: 404 })
    }

    return Response.json({ test })
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const deleted = await TestService.deleteTest(params.id)

    if (!deleted) {
      return Response.json({ error: 'Test not found' }, { status: 404 })
    }

    return Response.json({ message: 'Test deleted successfully' })
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 })
  }
}