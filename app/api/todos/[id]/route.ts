import { NextResponse } from "next/server"
import type { Todo } from "../route"

// In-memory storage (same reference as route.ts)
// In production, use a shared database
const todos: Todo[] = []

// PATCH update todo
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()

  const todoIndex = todos.findIndex((t) => t.id === id)
  if (todoIndex === -1) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 })
  }

  todos[todoIndex] = { ...todos[todoIndex], ...body }
  return NextResponse.json(todos[todoIndex])
}

// DELETE todo
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const todoIndex = todos.findIndex((t) => t.id === id)

  if (todoIndex === -1) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 })
  }

  todos.splice(todoIndex, 1)
  return NextResponse.json({ success: true })
}
