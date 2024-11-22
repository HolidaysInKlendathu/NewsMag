// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the path is exactly /articles
  if (request.nextUrl.pathname === '/articles') {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  // Alternatively, if you want to redirect /articles/ (with trailing slash) as well:
  if (request.nextUrl.pathname === '/articles' || request.nextUrl.pathname === '/articles/') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/articles/:path*'
}