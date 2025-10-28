import { NextResponse } from "next/server"
import { todos, type Todo } from "@/lib/todos-store"

// GET all todos
export async function GET() {
  return NextResponse.json(todos)
}

// POST new todo
export async function POST(request: Request) {
  const body = await request.json()
  const newTodo: Todo = {
    id: Date.now().toString(),
    text: body.text,
    completed: false,
    createdAt: new Date().toISOString(),
  }
  todos.push(newTodo)
  return NextResponse.json(newTodo, { status: 201 })
}
export { Todo }

