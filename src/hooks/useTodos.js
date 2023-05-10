import { useEffect, useState } from "react";
import { getTodos, deleteTodo as deleteTodoService } from "../services/todos"

export default function useTodos() {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // const [errorMessage, setErrorMessage] = useState('')
  
  useEffect(() => {
    getTodos()
      .then(todos => {
        setTodos(todos)
      })
      .catch(() => { })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  async function deleteTodo({ todoId }) {
    setIsLoading(true)
    const prevState = todos.slice()
    deleteTodoService({ todoId })
      .then(() => {
        // setTodos(todos.filter((el) => el.id !== todoId))
      })
      .catch(() => {
        setTodos(prevState)
      })
      .finally(() => {
        setIsLoading(false)
      })

    setTodos(todos.filter((el) => el.id !== todoId))
  }

  return {
    todos,
    deleteTodo,
    isLoading
  }
}