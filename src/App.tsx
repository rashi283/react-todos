import React, { useCallback, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import styled from "@emotion/styled";
import { AddInput } from "./components/AddInput";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Header } from "./components/Header";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 300,
});

/**
* This is the initial todo state.
* Instead of loading this data on every reload,
* we should save the todo state to local storage,
* and restore on page load. This will give us
* persistent storage.
*/
const initialData: Todo[] = [
  {
    id: "1",//uuid(),
    label: "Buy groceries",
    checked: false,
  },
  {
    id: "2",//uuid(),
    label: "Reboot computer",
    checked: false,
  },
  {
    id: "3",//uuid(),
    label: "Ace CoderPad interview",
    checked: true,
  },
];

function App() {
  const [todos, setTodos] = useState<Todo[]>(initialData);

  const addTodo = useCallback((label: string) => {
    setTodos((prev) => [
      {
        id: uuid(),
        label,
        checked: false,
      },
      ...prev,
    ])
    window.localStorage.setItem('todoKey', JSON.stringify(todos))
    console.log(window.localStorage.getItem('todoKey'))
  }, []);
  useEffect(()=>{
    const num = Math.floor(Math.random()*200)
    fetch('https://jsonplaceholder.typicode.com/todos/'+num)
    .then(res=>res.json())
    .then(res=>{
      setTodos(todos=>[...todos, {
        id: uuid(),
        label:res.title,
        checked: res.completed,
      }])
    })
  }, [])

  const handleChange = useCallback(({id, checked}: {id: string, checked: boolean}) => {
    // handle the check/uncheck logic
    const todoIndex = todos.findIndex(todo => todo.id === id)
    const newTodos = [...todos]
    newTodos[todoIndex].checked = checked
    setTodos(newTodos)
    
  }, [todos]);

  return (
    <Wrapper>
      <Header>Todo List</Header>
      <AddInput onAdd={addTodo} />
      <TodoList>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} onChange={handleChange} />
        ))}
      </TodoList>
    </Wrapper>
  );
}

export default App;
