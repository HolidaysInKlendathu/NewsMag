import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function verifyAuthor() {
  try {
    // List all authors
    const authors = await prisma.author.findMany()
    console.log('Existing authors:', authors)

    if (authors.length === 0) {
      // Create a test author if none exists
      const author = await prisma.author.create({
        data: {
          name: "Test Author",
          email: "test@example.com",
          bio: "A test author for our blog platform",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
          website: "https://example.com",
          location: "Test Location",
          expertise: "Web Development, AI, Technical Writing",
          title: "Senior Technical Writer",
          company: "Test Company",
          featured: true,
          verified: true,
          socialLinks: {
            twitter: "https://twitter.com/testauthor",
            github: "https://github.com/testauthor",
            linkedin: "https://linkedin.com/in/testauthor"
          }
        }
      })
      console.log('Created new author:', author)
      console.log('Use this ID in your markdown files:', author.id)
    }
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verifyAuthor()