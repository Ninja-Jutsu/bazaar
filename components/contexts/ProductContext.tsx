'use client'
import { Product } from '@prisma/client'

import React, { createContext, useState, useContext } from 'react'

// Define the shape of your context value
interface ProductContextValue {
  displayedProducts: Product[]
  setDisplayedProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

// Create the context with a default value (optional but recommended)
export const ProductContext = createContext<ProductContextValue>({
  displayedProducts: [],
  setDisplayedProducts: () => {}, // No-op function
})

// The provider component
export default function ProductProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([])
  return (
    <ProductContext.Provider
      value={{ displayedProducts, setDisplayedProducts }}
    >
      {children}
    </ProductContext.Provider>
  )
}

// The custom hook to consume the context
export function useProductContext(): ProductContextValue {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider')
  }
  return context
}
