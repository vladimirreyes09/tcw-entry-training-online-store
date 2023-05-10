import { useState } from "react";

export default function useCounter() {
  const [counter, setCounter] = useState(0)

  const addOneToCounter = () => {
    return setCounter(counter + 1)
  }
  return {
    counter,
    addOneToCounter
  }
}