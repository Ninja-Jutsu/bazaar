/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import prisma from '@/prisma/prismaClient'
import delay from 'delay'
import { redirect } from 'next/navigation'
import { auth, currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { imageSchema, productSchema, validateWithZodSchema } from './schemas'
import { deleteImage, uploadImage } from './supabase'

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
    return { message: 'product created' }
  } catch (error) {
    console.log(error)
    return renderError(error)
  }

  //I could choose to redirect the Admin to the products page
  redirect('/admin/products')
}

const getAdminUser = async () => {
  const user = await getCurrentUser()
  if (user.id !== process.env.ADMIN_USER_ID) redirect('/')
  return user
}
// refactor createProductAction

export const fetchAdminProducts = async () => {
  await getAdminUser()
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
  return products
}

export const deleteProductAction = async (prevState: { productId: string }) => {
  const { productId } = prevState
  await getAdminUser()

  try {
    const product = await prisma.product.delete({
      where: {
        id: productId,
      },
    })
    await deleteImage(product.image)
    revalidatePath('/admin/products')

    return { message: 'product removed' }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchAdminProductDetails = async (productId: string) => {
  await getAdminUser()
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  })
  if (!product) redirect('/admin/products')
  return product
}

export const updateProductAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAdminUser()
  try {
    const productId = formData.get('id') as string
    const rawData = Object.fromEntries(formData)
    const validatedFields = validateWithZodSchema(productSchema, rawData)
    console.log(validatedFields)
    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...validatedFields,
      },
    })
    revalidatePath(`/admin/products/${productId}/edit`)
    return { message: 'Product updated successfully' }
  } catch (error) {
    return renderError(error)
  }
}


export const updateProductImageAction = async (
  prevState: any,
  formData: FormData
) => {
  await getCurrentUser()
  try {
    const image = formData.get('image') as File
    const productId = formData.get('id') as string
    const oldImageUrl = formData.get('url') as string

    const validatedFile = validateWithZodSchema(imageSchema, { image })
    const fullPath = await uploadImage(validatedFile.image)
    await deleteImage(oldImageUrl)
    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        image: fullPath,
      },
    })
    revalidatePath(`/admin/products/${productId}/edit`)
    return { message: 'Product Image updated successfully' }
  } catch (error) {
    return renderError(error)
  }
}
