// config/categories.ts
export type SubCategory = {
  name: string
  slug: string
  description?: string
}

export type Category = {
  name: string
  slug: string
  description?: string
  subCategories: SubCategory[]
}

export const categories: Category[] = [
  {
    name: "Industry Updates",
    slug: "industry-updates",
    description: "Stay informed about the latest regulatory changes, market shifts, and trends in the insurance industry.",
    subCategories: [
      { name: "Regulatory & Legal Changes", slug: "regulatory-legal-changes" },
      { name: "Mergers, Acquisitions & Market Shifts", slug: "mergers-acquisitions-market-shifts" },
      { name: "Trends & Insights", slug: "trends-insights" }
    ]
  },
  {
    name: "Risk & Innovation",
    slug: "risk-innovation",
    description: "Explore advancements in risk management, insurance technology, and fraud prevention.",
    subCategories: [
      { name: "Risk Management & Analytics", slug: "risk-management-analytics" },
      { name: "Insurance Technology (InsurTech)", slug: "insurance-technology-insurtech" },
      { name: "Fraud Prevention & Scam Detection", slug: "fraud-prevention-scam-detection" }
    ]
  },
  {
    name: "Claims & Policies",
    slug: "claims-policies",
    description: "Understand the processes behind claims management, underwriting, and insurance regulations.",
    subCategories: [
      { name: "Claims Management", slug: "claims-management" },
      { name: "Underwriting Processes", slug: "underwriting-processes" },
      { name: "Insurance Laws & Regulations", slug: "insurance-laws-regulations" }
    ]
  },
  {
    name: "Products & Reviews",
    slug: "products-reviews",
    description: "Discover and compare insurance types, specialized products, and in-depth reviews.",
    subCategories: [
      { name: "Insurance Types (Life, Health, Auto, etc.)", slug: "insurance-types" },
      { name: "Specialized Insurance Products (Cyber, Pet, etc.)", slug: "specialized-insurance-products" },
      { name: "Product Comparisons & Reviews", slug: "product-comparisons-reviews" }
    ]
  },
  {
    name: "Consumer Trends",
    slug: "consumer-trends",
    description: "Analyze customer preferences, behavioral trends, and the overall insurance market landscape.",
    subCategories: [
      { name: "Customer Experience in Insurance", slug: "customer-experience-insurance" },
      { name: "Changing Consumer Preferences", slug: "changing-consumer-preferences" },
      { name: "Behavioral Shifts & Market Trends", slug: "behavioral-shifts-market-trends" }
    ]
  },
  {
    name: "Sustainability & Advocacy",
    slug: "sustainability-advocacy",
    description: "Learn about ESG initiatives, consumer rights, and ethical practices in the insurance industry.",
    subCategories: [
      { name: "ESG & Green Insurance", slug: "esg-green-insurance" },
      { name: "Consumer Protection & Fair Practices", slug: "consumer-protection-fair-practices" },
      { name: "Transparency & Ethical Insurance", slug: "transparency-ethical-insurance" }
    ]
  }
]
