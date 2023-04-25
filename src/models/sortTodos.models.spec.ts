import type { Todo } from '../types'
import { sortTodos } from './sortTodos.models'

describe('sortTodos.models', function () {
  describe('When giving an empty array of todos', function () {
    it('should return an empty array', function () {
      // --- WHEN
      const sortedTodos = sortTodos([])

      // --- THEN
      expect(sortedTodos).toEqual([])
    })
  })

  describe('When giving 2 todos with different checked', function () {
    it('should put the active todo first', function () {
      // --- WHEN
      const sortedTodos = sortTodos([
        { id: '1', checked: true },
        { id: '2', checked: false },
      ] as Todo[])

      // --- THEN
      expect(sortedTodos.map(todo => todo.id)).toEqual(['2', '1'])
    })
  })

  describe('When both todos are complete', function () {
    it('should sort them by completedAt in the ASCENDING order', function () {
      // --- WHEN
      const sortedTodos = sortTodos([
        { id: '1', checked: true, completedAt: new Date('2023-04-25') },
        { id: '2', checked: true, completedAt: new Date('2023-04-24') },
      ] as Todo[])

      // --- THEN
      expect(sortedTodos.map(todo => todo.id)).toEqual(['2', '1'])
    })
  })

  describe('When both todos are still active', function () {
    it('should sort them by createdAt in the DESCENDING order', function () {
      // --- WHEN
      const sortedTodos = sortTodos([
        { id: '1', checked: false, createdAt: new Date('2023-04-10') },
        { id: '2', checked: false, createdAt: new Date('2023-04-20') },
      ] as Todo[])

      // --- THEN
      expect(sortedTodos.map(todo => todo.id)).toEqual(['2', '1'])
    })
  })
})
