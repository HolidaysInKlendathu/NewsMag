// lib/fonts.ts
import localFont from 'next/font/local'

export const fontSans = localFont({
  src: [
    {
      path: '../public/fonts/inter-var.woff2',
      style: 'normal',
    },
    {
      path: '../public/fonts/inter-var-italic.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})