/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import prisma from '@/prisma/prismaClient'
import delay from 'delay'
import { redirect } from 'next/navigation'
import { auth, currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { imageSchema, productSchema, validateWithZodSchema } from './schemas'
import { uploadImage } from './supabase'

function renderError(error: unknown): { message: string } {
  console.log(error)
  return {
    message: error instanceof Error ? error.message : 'An error occurred',
  }
}

// Even though we know for sure that the route is protected, TypeScript doesn't
const getCurrentUser = async () => {
  const user = await currentUser()
  if (!user) {
    throw new Error('You must be logged in to access this route')
  }
  return user
}

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
  const user = await getCurrentUser()
  try {
    const rawData = Object.fromEntries(formData)
    const file = formData.get('image') as File
    // Validate data
    const validatedFields = validateWithZodSchema(productSchema, rawData)
    // Validate Image File
    const validatedFile = validateWithZodSchema(imageSchema, { image: file })
    const imageFullPath = await uploadImage(validatedFile.image)
    await prisma.product.create({
      data: {
        ...validatedFields,
        image: imageFullPath,
        clerkId: user.id,
      },
    })
    revalidatePath('/', 'layout')
  } catch (error) {
    console.log(error)
    return renderError(error)
  }
  redirect('/admin/products')
}
