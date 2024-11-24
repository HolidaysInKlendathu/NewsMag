// data/seed-authors.ts
export type AuthorData = {
    name: string
    email: string
    bio: string
    avatar: string
    website: string
    location: string
    expertise: string
    socialLinks: {
      twitter: string
      github: string
      linkedin: string
    }
    title: string
    company: string
    featured: boolean
    verified: boolean
  }
  
  export const seedAuthors: AuthorData[] = [
    {
      name: "John Smith",
      email: "john.smith@example.com",
      bio: "Senior technical writer with 10+ years of experience in web development and software architecture.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      website: "https://johnsmith.dev",
      location: "San Francisco, CA",
      expertise: "Web Development, Technical Writing, JavaScript",
      socialLinks: {
        twitter: "https://twitter.com/johnsmith",
        github: "https://github.com/johnsmith",
        linkedin: "https://linkedin.com/in/johnsmith"
      },
      title: "Senior Technical Writer",
      company: "TechDocs Inc.",
      featured: true,
      verified: true,
    },
    {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      bio: "Full-stack developer specializing in React and Node.js. Creator of popular dev tools and open source contributor.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      website: "https://sarahjohnson.dev",
      location: "New York, NY",
      expertise: "React, Node.js, TypeScript, System Architecture",
      socialLinks: {
        twitter: "https://twitter.com/sarahj",
        github: "https://github.com/sarahjohnson",
        linkedin: "https://linkedin.com/in/sarahjohnson"
      },
      title: "Lead Developer",
      company: "WebStack Solutions",
      featured: true,
      verified: true,
    },
    // ... add more authors as needed
  ]