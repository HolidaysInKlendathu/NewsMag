// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    typedRoutes: true,
    mdxRs: true
  },
  images: {
    domains: [
      'images.unsplash.com',
      'res.cloudinary.com',  
      'imgur.com',
      'i.imgur.com',
      's3.amazonaws.com',    
      'your-custom-domain.com'
    ],
  },
  transpilePackages: ['next-mdx-remote'],

}

module.exports = nextConfig