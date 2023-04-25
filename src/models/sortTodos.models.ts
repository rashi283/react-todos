export function sortTodos(todos: Todo[]) {
  return todos.toSorted((a, b) => {
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
