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
      name: "Industry News",
      slug: "industry-news",
      description: "Latest updates and developments in the insurance industry",
      subCategories: [
        { name: "Regulatory Changes", slug: "regulatory-changes" },
        { name: "Mergers & Acquisitions", slug: "mergers-acquisitions" },
        { name: "Major Industry Shifts", slug: "major-industry-shifts" },
        { name: "Market Trends & Insights", slug: "market-trends-insights" }
      ]
    },
    {
      name: "Insurance Insights",
      slug: "insurance-insights",
      description: "Deep analysis of insurance markets and strategies",
      subCategories: [
        { name: "Market Analysis", slug: "market-analysis" },
        { name: "Risk Management Strategies", slug: "risk-management" },
        { name: "Insurance Tech (InsurTech)", slug: "insurtech" },
        { name: "Risk Analytics & Data Insights", slug: "risk-analytics" }
      ]
    },
    {
      name: "Claims & Underwriting",
      slug: "claims-underwriting",
      description: "Best practices in claims and underwriting processes",
      subCategories: [
        { name: "Claims Management Best Practices", slug: "claims-management" },
        { name: "Underwriting Processes", slug: "underwriting-processes" },
        { name: "Fraud Prevention & Scams", slug: "fraud-prevention" }
      ]
    },
    // ... Add other categories similarly
  ]