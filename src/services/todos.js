
export function getTodos() {
  return fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(todos => todos)
}

export function deleteTodo({ todoId }) {
  return fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
    method: 'DELETE'
  })
    .then((res) => {
      if (res.ok) {
        return
      }
    })
}