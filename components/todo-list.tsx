"use client"

import type React from "react"

import { useState } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Trash2, Plus } from "lucide-react"
import type { Todo } from "@/app/api/todos/route"
import { useToast } from "@/hooks/use-toast"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function TodoList() {
  const { data: todos, mutate } = useSWR<Todo[]>("/api/todos", fetcher)
  const [newTodoText, setNewTodoText] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const { toast } = useToast()

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodoText.trim()) return

    setIsAdding(true)
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newTodoText }),
      })
      const newTodo = await response.json()
      mutate([...(todos || []), newTodo], false)
      setNewTodoText("")
    } catch (error) {
      console.error("[v0] Error adding todo:", error)
    } finally {
      setIsAdding(false)
    }
  }

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      })
      mutate(
        todos?.map((todo) => (todo.id === id ? { ...todo, completed: !completed } : todo)),
        false,
      )
    } catch (error) {
      console.error("[v0] Error toggling todo:", error)
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      await fetch(`/api/todos/${id}`, { method: "DELETE" })
      mutate(
        todos?.filter((todo) => todo.id !== id),
        false,
      )
    } catch (error) {
      console.error("[v0] Error deleting todo:", error)
    }
  }

  const handleTaskClick = (todo: Todo) => {
    toast({
      title: "Task Details",
      description: `"${todo.text}" - ${todo.completed ? "Completed" : "Active"}`,
    })
  }

  const activeTodos = todos?.filter((t) => !t.completed) || []
  const completedTodos = todos?.filter((t) => t.completed) || []

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <form onSubmit={addTodo} className="flex gap-2">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          className="flex-1"
          disabled={isAdding}
        />
        <Button type="submit" disabled={isAdding || !newTodoText.trim()}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </form>

      <div className="space-y-4">
        {activeTodos.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground">Active Tasks ({activeTodos.length})</h2>
            {activeTodos.map((todo) => (
              <Card key={todo.id} className="p-4">
                <div className="flex items-center gap-3">
                  <Checkbox checked={todo.completed} onCheckedChange={() => toggleTodo(todo.id, todo.completed)} />
                  <span
                    className="flex-1 text-foreground cursor-pointer hover:text-primary transition-colors"
                    onClick={() => handleTaskClick(todo)}
                  >
                    {todo.text}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {completedTodos.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground">Completed ({completedTodos.length})</h2>
            {completedTodos.map((todo) => (
              <Card key={todo.id} className="p-4 opacity-60">
                <div className="flex items-center gap-3">
                  <Checkbox checked={todo.completed} onCheckedChange={() => toggleTodo(todo.id, todo.completed)} />
                  <span
                    className="flex-1 line-through text-muted-foreground cursor-pointer hover:text-primary transition-colors"
                    onClick={() => handleTaskClick(todo)}
                  >
                    {todo.text}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {!todos && <div className="text-center text-muted-foreground py-8">Loading tasks...</div>}

        {todos && todos.length === 0 && (
          <div className="text-center text-muted-foreground py-8">No tasks yet. Add one to get started!</div>
        )}
      </div>
    </div>
  )
}
