const TODOS_KEY = 'coderpad:todos'

export function getTodos() {
  const todosAsString = localStorage.getItem(TODOS_KEY)
  if (!todosAsString) {
    return null
  }
  try {
    const parsedTodos = JSON.parse(todosAsString) as Todo[]
    // TODO Use zod (or similar) to assert todos structure
    return parsedTodos.map((todo) => ({
      ...todo,
      createdAt: new Date(todo.createdAt),
      completedAt: todo.completedAt ? new Date(todo.completedAt) : null,
    }))
  } catch (e) {
    console.warn('Invalid todos', e)
    return null
  }
}

export function setTodos(todos: Todo[]) {
  return localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
}
