import prisma from '@/prisma/prismaClient'
import delay from 'delay'

export const fetchFeaturedProducts = async () => {
  await delay(2000)
  const products = await prisma.product.findMany({
    where: {
      featured: true,
    },
  })
  return products
}

export const fetchAllProducts = () => {
  return prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}
