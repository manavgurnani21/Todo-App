export type Todo = {
  id: string
  text: string
  completed: boolean
  createdAt: string
}

// Shared in-memory storage (replace with database in production)
export const todos: Todo[] = [
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
    text: "Create beautiful UI",
    completed: false,
    createdAt: new Date().toISOString(),
  },
]