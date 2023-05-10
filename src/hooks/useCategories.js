import { useState, useEffect } from 'react'


export default function useCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then((categries) => {
        setCategories(categries)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  
  return {
    categories,
    loading
  }
}