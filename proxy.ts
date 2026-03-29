import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hostname = request.headers.get('host') || ''

  // non-www to www redirect (SEO & favicon icin onemli)
  if (hostname === 'kalindayapi.com' || hostname.startsWith('kalindayapi.com:')) {
    const redirectUrl = `https://www.kalindayapi.com${pathname}${request.nextUrl.search}`
    return NextResponse.redirect(redirectUrl, 301)
  }

  // Admin rotalarini kontrol et
  if (pathname.startsWith('/admin')) {
    // Login sayfasi haric
    if (pathname === '/admin/giris') {
      // Zaten giris yapmissa admin paneline yonlendir
      const token = await getToken({ req: request })
      if (token) {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
      return NextResponse.next()
    }

    // Diger admin sayfalari icin auth kontrolu
    const token = await getToken({ req: request })
    if (!token) {
      const loginUrl = new URL('/admin/giris', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // www redirect icin tum path'ler (static dosyalar haric)
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
