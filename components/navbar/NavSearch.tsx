/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Input } from '../ui/input'
import { useState, useEffect } from 'react'
import { Product } from '@prisma/client'
import { useProductContext } from '../contexts/ProductContext'

function NavSearch({ products }: { products: Product[] }) {
  const [searchValue, setSearchValue] = useState('')
  const { displayedProducts, setDisplayedProducts } = useProductContext()

  // Show all products at the first render
  useEffect(() => {
    setDisplayedProducts(products)
  }, [])

  // Show filtered products onChange with a delay
  useEffect(() => {
    if (searchValue) {
      const delaySearch = setTimeout(() => {
        const filterProducts = displayedProducts.filter(
          (product) =>
            product.description
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            product.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        setDisplayedProducts(filterProducts)
        console.log(filterProducts)
      }, 300)
      return () => clearTimeout(delaySearch)
    }
  }, [searchValue])
  return (
    <Input
      type='search'
      placeholder='search product...'
      className='max-w-xs dark:bg-muted '
      value={searchValue}
      onChange={(e) => {
        setDisplayedProducts(products)
        setSearchValue(e.target.value)
      }}
    />
  )
}
export default NavSearch
