// scripts/create-test-author.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createTestAuthor() {
  try {
    // First create the user
    const user = await prisma.user.create({
      data: {
        name: "Test Author",
        email: "test@example.com",
        role: "AUTHOR",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      }
    })

    // Then create the author linked to the user
    const author = await prisma.author.create({
      data: {
        name: "Test Author",
        email: "test@example.com",
        bio: "Senior technical writer and web development expert with over 8 years of experience.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        website: "https://example.com",
        location: "Test Location",
        expertise: "Web Development, Technical Writing, JavaScript",
        socialLinks: {
          twitter: "https://twitter.com/testauthor",
          github: "https://github.com/testauthor",
          linkedin: "https://linkedin.com/in/testauthor"
        },
        title: "Senior Technical Writer",
        company: "TechDocs Inc.",
        featured: true,
        verified: true,
        userId: user.id  // Link to the user we just created
      }
    })

    console.log('Test author created successfully:', author)
    console.log('Author ID:', author.id) // Save this ID for your markdown files
  } catch (error) {
    console.error('Error creating test author:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestAuthor()