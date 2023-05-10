// import { useEffect, useId, useImperativeHandle, useReducer, useRef, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useState } from 'react'
import './App.css'
import { useProducts } from './hooks/useProducts'
import useCategories from './hooks/useCategories'
// import useCounter from './hooks/useConter'
// react hooks -> useState --> useCallback() --> useEffect() --> useRef() -->  useMemo() --> useImperativeHandle() --> useId() --> useReducer()

// agregar con scroll infinito
// agregar vista individual de productos // --> wrouter
// login
// routing
// context
// agregar ejemplo de re-render infinito por elegir malas depencias
// global state
// react-profiler
// react dev tools
// ver re-renders
// optimization
// useMemo
// useRef
// useCallback
// 
function App() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { products, searchProduct, nextProductsPageProduct } = useProducts()
  const { categories } = useCategories()

  const [searchBar, setSearchBar] = useState('')

  const hadleSelectedProduct = (product) => {
    console.log(product)
    setSelectedProduct(product)
  }

  const handleSearchBarChange = ({ target }) => {
    setSearchBar(target.value)
  }

  const handelSearchFormSubmit = (e) => {
    e.preventDefault()
    searchProduct({
      search: searchBar
    })
  }
  if (selectedProduct) {
    console.log(selectedProduct)
    const goBack = () => setSelectedProduct(null)
    return <main>
      <article>
        <button onClick={goBack}>
          X
        </button>
        <h1>{selectedProduct.title}</h1>
        <img src={selectedProduct.thumbnail}></img>
        <p>
          $ {selectedProduct.price}
        </p>
        <p>
          {selectedProduct.description}
        </p>
      </article>
    </main >
  }


  return (
    <>
      <header>
        <form onSubmit={handelSearchFormSubmit} >
          <input type='search' onChange={handleSearchBarChange} value={searchBar} />
          {searchBar}
        </form>
      </header>
      <main>
        <aside>
          <ul className='categories'>
            {
              categories.map((categoryTitle) => {
                return <li className="categories-item" key={categoryTitle}>
                  <a>
                    {categoryTitle}
                  </a>
                </li>
              })
            }
          </ul>
        </aside>
        {
          /* products !==  &&  */

          products.map((product) => {
            const { title, thumbnail, id, price } = product
            const handleClick = () => hadleSelectedProduct(product)
            return <article key={id} onClick={handleClick}>
              <h1>{title}</h1>
              <img src={thumbnail}></img>
              <p>
                $ {price}
              </p>

            </article>
          })
        }
        <button onClick={nextProductsPageProduct} >
          Load more products
        </button>
      </main>
    </>
  )
}

export default App
