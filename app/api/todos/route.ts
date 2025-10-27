import { NextResponse } from "next/server"

export type Todo = {
  id: string
  text: string
  completed: boolean
  createdAt: string
}

// In-memory storage (replace with database in production)
const todos: Todo[] = [
  {
    id: "1",
    text: "Build a to-do list app",
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    text: "Add API routes",
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    text: "Create super ugly UI",
    completed: false,
    createdAt: new Date().toISOString(),
  },
]

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
