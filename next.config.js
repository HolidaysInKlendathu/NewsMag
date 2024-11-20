// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    typedRoutes: true,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'res.cloudinary.com',  // if you use Cloudinary
      'imgur.com',
      'i.imgur.com',
      's3.amazonaws.com',    // if you use AWS S3
      'your-custom-domain.com'
    ],
  },
}

module.exports = nextConfig