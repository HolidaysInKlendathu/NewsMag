// app/layout.tsx
import './globals.css'
import { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/components/auth-provider'
import { Providers } from './providers'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Modern Magazine',
    template: '%s | Modern Magazine',
  },
  description: 'Your source for the latest news and stories',
  keywords: ['news', 'magazine', 'articles', 'stories'],
  authors: [{ name: 'Modern Magazine' }],
  creator: 'Modern Magazine',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'Modern Magazine',
    description: 'Your source for the latest news and stories',
    siteName: 'Modern Magazine',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Magazine',
    description: 'Your source for the latest news and stories',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Providers>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </Providers>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}