// scripts/fix-categories.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixCategories() {
  try {
    // First, verify categories exist
    const categories = await prisma.category.findMany()
    
    // Create categories if they don't exist
    if (categories.length === 0) {
      console.log('🏗️ No categories found. Creating main categories...')
      
      await prisma.category.createMany({
        data: [
          {
            name: "Industry News",
            slug: "industry-news",
            description: "Stay informed about the latest regulatory changes, market shifts, trends, ESG initiatives, and ethical practices in the insurance industry."
          },
          {
            name: "Risk & Innovation",
            slug: "risk-innovation",
            description: "Explore advancements in risk management, insurance technology, and fraud prevention."
          },
          {
            name: "Claims & Policies",
            slug: "claims-policies",
            description: "Understand the processes behind claims management, underwriting, and insurance regulations."
          },
          {
            name: "Products & Trends",
            slug: "products-trends",
            description: "Discover and compare insurance products, explore consumer preferences, and analyze market trends."
          },
          {
            name: "Geographical",
            slug: "geographical-breakdown",
            description: "Explore insurance news and trends across different regions in the United States and internationally."
          }
        ]
      })
      console.log('✅ Categories created successfully!')
    }

    // Get all articles that need category assignment
    const articles = await prisma.article.findMany({
      include: {
        categories: true
      }
    })

    console.log(`\n📝 Found ${articles.length} articles to process`)

    // Update each article
    for (const article of articles) {
      if (article.categories.length === 0) {
        // Determine appropriate category based on article content/title
        let categorySlug = 'industry-news' // default category
        
        const titleLower = article.title.toLowerCase()
        
        // Category determination logic
        if (
          titleLower.includes('ai') || 
          titleLower.includes('technology') ||
          titleLower.includes('innovation') ||
          titleLower.includes('insurtech') ||
          titleLower.includes('digital') ||
          titleLower.includes('automation')
        ) {
          categorySlug = 'risk-innovation'
        } 
        else if (
          titleLower.includes('claim') ||
          titleLower.includes('policy') ||
          titleLower.includes('underwriting') ||
          titleLower.includes('coverage') ||
          titleLower.includes('premium')
        ) {
          categorySlug = 'claims-policies'
        } 
        else if (
          titleLower.includes('product') ||
          titleLower.includes('trend') ||
          titleLower.includes('consumer') ||
          titleLower.includes('market') ||
          titleLower.includes('customer')
        ) {
          categorySlug = 'products-trends'
        } 
        else if (
          titleLower.includes('region') ||
          titleLower.includes('local') ||
          titleLower.includes('state') ||
          titleLower.includes('country') ||
          titleLower.includes('global')
        ) {
          categorySlug = 'geographical-breakdown'
        }

        const category = await prisma.category.findUnique({
          where: { slug: categorySlug }
        })

        if (category) {
          await prisma.article.update({
            where: { id: article.id },
            data: {
              categories: {
                connect: [{ id: category.id }]
              }
            }
          })
          console.log(`✅ Updated: "${article.title}" → ${categorySlug}`)
        }
      } else {
        console.log(`⏭️ Skipped: "${article.title}" (already categorized)`)
      }
    }

    console.log('\n✨ Category fix completed!')

  } catch (error) {
    console.error('❌ Error fixing categories:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the function
fixCategories()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })