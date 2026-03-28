import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

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
  matcher: ['/admin/:path*'],
}
