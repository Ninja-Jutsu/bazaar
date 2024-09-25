/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import prisma from '@/prisma/prismaClient'
import { Cart } from '@prisma/client'
import delay from 'delay'
import { redirect } from 'next/navigation'
import { auth, currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import {
  imageSchema,
  productSchema,
  reviewSchema,
  validateWithZodSchema,
} from './schemas'
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
    redirect('/')
  }
  return user
}

const getAdminUser = async () => {
  const user = await getCurrentUser()
  if (user.id !== process.env.ADMIN_USER_ID) redirect('/')
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

export const fetchAllProducts = ({ search = '' }: { search: string }) => {
  return prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
      ],
    },
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
    return renderError(error)
  }

  //I could choose to redirect the Admin to the products page
  redirect('/admin/products')
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

export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  const user = await getCurrentUser()
  const favorite = await prisma.favorite.findFirst({
    where: {
      productId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  })
  return favorite?.id || null
}

export const toggleFavoriteAction = async (prevState: {
  productId: string
  favoriteId: string | null
  pathname: string
}) => {
  const user = await getCurrentUser()
  const { productId, favoriteId, pathname } = prevState
  try {
    if (favoriteId) {
      await prisma.favorite.delete({
        where: {
          id: favoriteId,
        },
      })
    } else {
      await prisma.favorite.create({
        data: {
          productId,
          clerkId: user.id,
        },
      })
    }
    revalidatePath(pathname)
    return {
      message: favoriteId ? 'Removed from favorites' : 'Added to favorites',
    }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchUserFavorites = async () => {
  const user = await getCurrentUser()
  const favorites = await prisma.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  })
  return favorites
}

// Reviews:
export const createReviewAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getCurrentUser()
  try {
    const rawData = Object.fromEntries(formData)

    const validatedFields = validateWithZodSchema(reviewSchema, rawData)

    await prisma.review.create({
      data: {
        ...validatedFields,
        clerkId: user.id,
      },
    })

    revalidatePath(`/products/${validatedFields.productId}`)
    return { message: 'Review submitted successfully' }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchProductReviews = async (productId: string) => {
  const reviews = await prisma.review.findMany({
    where: {
      productId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return reviews
}

export const fetchProductRating = async (productId: string) => {
  const result = await prisma.review.groupBy({
    by: ['productId'],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      productId,
    },
  })

  //! empty array if no reviews, that's why we use ?.
  return {
    rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
    count: result[0]?._count.rating ?? 0,
  }
}

export const fetchProductReviewsByUser = async () => {
  const user = await getCurrentUser()
  const reviews = await prisma.review.findMany({
    where: {
      clerkId: user.id,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      product: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  })
  return reviews
}
export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState
  const user = await getCurrentUser()

  try {
    await prisma.review.delete({
      where: {
        id: reviewId,
        clerkId: user.id,
      },
    })

    revalidatePath('/reviews')
    return { message: 'Review deleted successfully' }
  } catch (error) {
    return renderError(error)
  }
}

export const findExistingReview = async (userId: string, productId: string) => {
  return prisma.review.findFirst({
    where: {
      clerkId: userId,
      productId,
    },
  })
}

// Cart
export const fetchCartItems = async () => {
  const { userId } = auth()

  const cart = await prisma.cart.findFirst({
    where: {
      clerkId: userId ?? '',
    },
    select: {
      numItemsInCart: true,
    },
  })
  return cart?.numItemsInCart || 0
}

const fetchProduct = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  })
  if (!product) {
    throw new Error('Product not found')
  }
  return product
}

// As I am going to use this in several actions:
const includeProductClause = {
  cartItems: {
    include: {
      product: true,
    },
  },
}

// Create Cart if doesn't exist. Or fetch it if it does
export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false,
}: {
  userId: string
  errorOnFailure?: boolean
}) => {
  let cart = await prisma.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: includeProductClause,
  })

  if (!cart && errorOnFailure) {
    throw new Error('Cart not found')
  }

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        clerkId: userId,
      },
      include: includeProductClause,
    })
  }

  return cart
}

const updateOrCreateCartItem = async ({
  productId,
  cartId,
  amount,
}: {
  productId: string
  cartId: string
  amount: number
}) => {
  let cartItem = await prisma.cartItem.findFirst({
    where: {
      productId,
      cartId,
    },
  })

  if (cartItem) {
    cartItem = await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        amount: cartItem.amount + amount,
      },
    })
  } else {
    cartItem = await prisma.cartItem.create({
      data: { amount, productId, cartId },
    })
  }
}

export const updateCart = async (cart: Cart) => {
  const cartItems = await prisma.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true, // Include the related product
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  let numItemsInCart = 0
  let cartTotal = 0

  for (const item of cartItems) {
    numItemsInCart += item.amount
    cartTotal += item.amount * item.product.price
  }
  const tax = cart.taxRate * cartTotal
  const shipping = cartTotal ? cart.shipping : 0
  const orderTotal = cartTotal + tax + shipping

  const currentCart = await prisma.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      numItemsInCart,
      cartTotal,
      tax,
      orderTotal,
    },
    include: includeProductClause,
  })
  return { message: 'Cart updated' }
}

export const addToCartAction = async (prevState: any, formData: FormData) => {
  const user = await getCurrentUser()
  try {
    const productId = formData.get('productId') as string
    const amount = Number(formData.get('amount'))
    await fetchProduct(productId)
    const cart = await fetchOrCreateCart({ userId: user.id })
    await updateOrCreateCartItem({ productId, cartId: cart.id, amount })
    await updateCart(cart)
    revalidatePath('/', 'layout')
    return {
      message: 'ADDED',
    }
  } catch (error) {
    return renderError(error)
  }
  redirect('/cart')
}

export const updateCartItemAction = async ({
  amount,
  cartItemId,
}: {
  amount: number
  cartItemId: string
}) => {
  const user = await getCurrentUser()

  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    })
    await prisma.cartItem.update({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
      data: {
        amount,
      },
    })
    await updateCart(cart)
    revalidatePath('/cart')
    return { message: 'cart updated' }
  } catch (error) {
    return renderError(error)
  }
}

export const removeCartItemAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getCurrentUser()
  try {
    const cartItemId = formData.get('id') as string
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    })
    await prisma.cartItem.delete({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
    })

    await updateCart(cart)
    revalidatePath('/cart')
    return { message: 'Item removed from cart' }
  } catch (error) {
    return renderError(error)
  }
}

// Orders:
export const createOrderAction = async (prevState: any, formData: FormData) => {
  const user = await getCurrentUser()
  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    })
    const order = await prisma.order.create({
      data: {
        clerkId: user.id,
        products: cart.numItemsInCart,
        orderTotal: cart.orderTotal,
        tax: cart.tax,
        shipping: cart.shipping,
        email: user.emailAddresses[0].emailAddress,
      },
    })

    await prisma.cart.delete({
      where: {
        id: cart.id,
      },
    })
  } catch (error) {
    return renderError(error)
  }
  redirect('/orders')
}
export const fetchUserOrders = async () => {
  const user = await getCurrentUser()
  const orders = await prisma.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return orders
}

export const fetchAdminOrders = async () => {
  const user = await getAdminUser()

  const orders = await prisma.order.findMany({
    where: {
      isPaid: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return orders
}
