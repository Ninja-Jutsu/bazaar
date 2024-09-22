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
    if (searchValue.length > 0) {
      const delaySearch = setTimeout(() => {
        setDisplayedProducts(products)
        const filterByName = displayedProducts.filter(
          (product) =>
            normalizeString(product.name).includes(
              normalizeString(searchValue)
            ) ||
            normalizeString(product.company).includes(
              normalizeString(searchValue)
            ) ||
            normalizeString(product.description).includes(
              normalizeString(searchValue)
            )
        )
        setDisplayedProducts([...filterByName])
      }, 300)
      return () => clearTimeout(delaySearch)
    } else {
      setDisplayedProducts(products)
    }
  }, [searchValue])
  return (
    <Input
      type='search'
      placeholder='search product...'
      className='max-w-xs dark:bg-muted '
      value={searchValue}
      onChange={(e) => {
        setSearchValue(e.target.value)
      }}
    />
  )
}
export default NavSearch

function normalizeString(string: string) {
  return string.trim().toLowerCase()
}
