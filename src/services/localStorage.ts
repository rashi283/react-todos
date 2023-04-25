import type { Todo } from '../types'
import { todosSchema } from '../types'

const TODOS_KEY = 'coderpad:todos'

export function getTodos() {
  const todosAsString = localStorage.getItem(TODOS_KEY)
  if (!todosAsString) {
    return null
  }
  try {
    const parsedLocalStorage = JSON.parse(todosAsString) as Todo[]
    const parsedTodos = todosSchema.parse(parsedLocalStorage)
    return parsedTodos.map(todo => ({
      ...todo,
      createdAt: new Date(todo.createdAt),
      completedAt: todo.completedAt ? new Date(todo.completedAt) : null,
    }))
  } catch (err) {
    console.warn('Invalid JSON for localStorage todos', err)
    return null
  }
}

export function setTodos(todos: Todo[]) {
  return localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
}
