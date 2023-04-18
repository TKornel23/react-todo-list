import React, { useEffect, useState } from 'react'
import './style.css'
import NewTodoForm from './NewTodoForm'
import TodoList from './TodoList'

function App() {

  const [todos, setTodos]  = useState(() => {
    const localValue = localStorage.getItem("ITEMS")

    if(localValue == null) return []

    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos]) //run this function every time when the object of the second argument changes
 
  function addTodo(title) {
    setTodos((currentTodos) => {
      return [...currentTodos, { id: crypto.randomUUID(), completed: false, title: title }]
    })
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if(todo.id === id) {
          todo.completed = completed
          return todo
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <NewTodoForm onSubmit={ addTodo }/>
      <h1 className='header'>
        Todo List
      </h1>     
      <TodoList todos={ todos } toggleTodo={ toggleTodo } deleteTodo={ deleteTodo }/> 
    </>
  )
}

export default App