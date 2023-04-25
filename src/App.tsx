import React, { useCallback, useState } from 'react'
import { v4 as uuid } from 'uuid'
import styled from '@emotion/styled'
import type { Todo } from './types'
import * as localStorageServices from './services/localStorage'
import { sortTodos } from './models/sortTodos.models'
import { AddInput } from './components/AddInput'
import { TodoItem } from './components/TodoItem'
import { TodoList } from './components/TodoList'
import { Header } from './components/Header'

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 300,
  marginBottom: '50px',
})

/**
 * This is the initial todo state.
 * Instead of loading this data on every reload,
 * we should save the todo state to local storage,
 * and restore on page load. This will give us
 * persistent storage.
 */
const initialData: Todo[] = localStorageServices.getTodos() || []

function App() {
  const [todos, setTodos] = useState<Todo[]>(initialData)

  const addTodo = useCallback((label: string) => {
    setTodos(prev => [
      {
        id: uuid(),
        label,
        checked: false,
        createdAt: new Date(),
        completedAt: null,
      },
      ...prev,
    ])
    localStorageServices.setTodos(todos)
  }, [])

  const handleChange = useCallback(
    ({ id, checked }: { id: string; checked: boolean }) => {
      const todoIndex = todos.findIndex(todo => todo.id === id)
      if (todoIndex === -1) {
        console.warn('todo not found. id:', id)
        return
      }
      const newTodos = [...todos]
      newTodos[todoIndex].checked = checked
      newTodos[todoIndex].completedAt = checked ? new Date() : null
      const sortedNewTodos = sortTodos(newTodos)
      setTodos(sortedNewTodos)
      localStorageServices.setTodos(sortedNewTodos)
    },
    [todos]
  )

  const handleRemove = useCallback(
    ({ id }: { id: string }) => {
      const newTodos = todos.filter(todo => todo.id !== id)
      setTodos(newTodos)
      localStorageServices.setTodos(newTodos)
    },
    [todos]
  )

  return (
    <Wrapper>
      <Header>Todo List</Header>
      <AddInput onAdd={addTodo} />
      <TodoList>
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} onChange={handleChange} onRemove={handleRemove} />
        ))}
      </TodoList>
    </Wrapper>
  )
}

export default App
