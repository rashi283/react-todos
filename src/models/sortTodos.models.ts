import type { Todo } from '../types'

export function sortTodos(todos: Todo[]): Todo[] {
  // @ts-ignore toSorted: I know it works (Node.js v20 + Chrome)
  // See: https://caniuse.com/mdn-javascript_builtins_array_tosorted
  return todos.toSorted((a: Todo, b: Todo) => {
    if (a.checked !== b.checked) {
      return a.checked ? 1 : -1
    }
    if (a.checked && b.checked) {
      if (!a.completedAt || !b.completedAt) {
        console.warn('completedAt should be defined...')
        return 0
      }
      // The completed todos should be sorted by completedAt ascending
      return a.completedAt.getTime() > b.completedAt.getTime() ? 1 : -1
    }
    if (!a.createdAt || !b.createdAt) {
      console.warn('createdAt should be defined...')
      return 0
    }
    // The active todos should be sorted by createdAt descending
    return a.createdAt.getTime() > b.createdAt.getTime() ? -1 : 1
  })
}
