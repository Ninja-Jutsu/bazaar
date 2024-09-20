/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client')
const products = require('./products.json')
const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.product.createMany({
      data: products,
    })
    console.log('Products created successfully!')
  } catch (error) {
    console.error('Error creating products:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
