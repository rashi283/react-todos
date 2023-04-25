👉 Taken from a coderpad.io template

## React Todo List

The goal of this exercise is to create a working todo list with persistent data storage.

To start with, we have a styled todo list that supports adding todos. We also have premade styles for completed todo items. Although there's no working mechanism for "completing" a todo.

## Requirements

1. Clicking on a todo item should toggle the "checked" state. ✅
2. The todo list state should be saved and loaded from local storage. ✅
3. Checked items should sink to the bottom of the list automatically ✅

## Stretch Goals

1. Allow todos to be deleted. When you hover your mouse over a todo, an X should appear on the far right side, clicking the X should remove it from the list. ✅

2. Add hidden timestamps to todos (createdAt, completedAt), these will be used for sorting
- The active todos should be sorted by createdAt descending ✅
- The completed todos should be sorted by completedAt ascending ✅

## Other additions:

1. Add Prettier ✅
2. Unit tests for the sortTodos models function with vitest ✅

## TODO

1. Add https://zod.dev/ to properly parse what's coming from localStorage ✅
2. Update to React 18 ⏳
3. Add a quick Github Action to run lint / tests ⏳
4. Add a nice icon for the delete button ⏳
