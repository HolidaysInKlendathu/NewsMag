// scripts/verify-author.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function verifyAndShowAuthor() {
  try {
    const authors = await prisma.author.findMany()
    console.log('All authors with their IDs:')
    authors.forEach(author => {
      console.log(`ID: ${author.id}`)
      console.log(`Name: ${author.name}`)
      console.log('-------------------')
    })
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verifyAndShowAuthor()