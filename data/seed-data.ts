// data/seed-data.ts
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
    {
      name: "Michael Chen",
      email: "michael.chen@example.com",
      bio: "Cloud architecture expert and DevOps specialist. AWS certified professional with a passion for scalable systems.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      website: "https://michaelchen.tech",
      location: "Seattle, WA",
      expertise: "Cloud Architecture, DevOps, AWS, Kubernetes",
      socialLinks: {
        twitter: "https://twitter.com/michaelchen",
        github: "https://github.com/mchen",
        linkedin: "https://linkedin.com/in/michaelchen"
      },
      title: "Cloud Architect",
      company: "CloudScale Systems",
      featured: false,
      verified: true,
    },
    {
      name: "Emily Davis",
      email: "emily.davis@example.com",
      bio: "UI/UX designer turned frontend developer. Focused on creating beautiful and accessible web experiences.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      website: "https://emilydavis.design",
      location: "Austin, TX",
      expertise: "UI/UX, Frontend Development, Accessibility",
      socialLinks: {
        twitter: "https://twitter.com/emilydesigns",
        github: "https://github.com/emilyd",
        linkedin: "https://linkedin.com/in/emilydavis"
      },
      title: "Frontend Developer",
      company: "DesignCode Labs",
      featured: true,
      verified: true,
    },
    {
      name: "Alex Rodriguez",
      email: "alex.rodriguez@example.com",
      bio: "Security researcher and backend developer. Expert in building secure and scalable APIs.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      website: "https://alexr.security",
      location: "Miami, FL",
      expertise: "Security, Backend Development, API Design",
      socialLinks: {
        twitter: "https://twitter.com/alexrsec",
        github: "https://github.com/alexrsecurity",
        linkedin: "https://linkedin.com/in/alexrodriguez"
      },
      title: "Security Engineer",
      company: "SecureStack Inc.",
      featured: false,
      verified: true,
    }
  ]