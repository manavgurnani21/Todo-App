import { TodoList } from "@/components/todo-list"
import { CheckSquare } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center gap-3 mb-8">
          <CheckSquare className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold text-balance">Task Manager</h1>
        </div>
        <p className="text-center text-muted-foreground mb-12 text-balance">
          Stay organized and productive with your personal task list
        </p>
        <TodoList />
      </div>
    </main>
  )
}
