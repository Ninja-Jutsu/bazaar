/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import prisma from '@/prisma/prismaClient'
import delay from 'delay'
import { redirect } from 'next/navigation'

export const fetchFeaturedProducts = async () => {
  const products = await prisma.product.findMany({
    where: {
      featured: true,
    },
  })
  return products
}

export const fetchAllProducts = async () => {
  return prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export const fetchSingleProduct = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  })
  if (!product) {
    redirect('/products')
  }
  return product
}

export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  return { message: 'product created' }
}
