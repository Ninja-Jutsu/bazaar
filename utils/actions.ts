import prisma from '@/prisma/prismaClient';

export const fetchFeaturedProducts = async () => {
  const products = await prisma.product.findMany({
    where: {
      featured: true,
    },
  });
  return products;
};

export const fetchAllProducts = () => {
  return prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};