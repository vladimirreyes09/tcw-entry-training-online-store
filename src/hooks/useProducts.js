import { useState, useEffect, useReducer, useRef } from "react"

export function useProducts({
  limit = 10,
} = {}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  let total = useRef();

  useEffect(() => {
    setLoading(true)
    const skip = limit * (currentPage - 1)

    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .then((res) => res.json())
      .then((productsReponse) => {
        const notExistingProducts = productsReponse.products.filter((product) => {
          return !products.find((alreadyLodedProduct) => alreadyLodedProduct.id === product.id)
        })
        console.log(notExistingProducts)
        total.current = productsReponse.total
        setProducts([...products, ...notExistingProducts])
        // setProducts([...products, ...productsReponse.products])
      })
      .catch((error) => {
        setErrorMessage(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [currentPage])

  console.log(total)
  function searchProduct({ search }) {
    return fetch(`https://dummyjson.com/products/search?q=${search}`)
      .then(res => res.json())
      .then((searchResults) => {
        setProducts(searchResults.products)
      })
  }

  function nextProductsPageProduct() {
    if (total.current && currentPage < total.current) {
      setCurrentPage(currentPage + 1)
    }
  }

  function jumpToProductPage(page) {
    setCurrentPage(page)
  }

  return {
    products,
    loading,
    nextProductsPageProduct,
    jumpToProductPage,
    searchProduct,
    hasErrors: Boolean(errorMessage),
    errorMessage
  }
}