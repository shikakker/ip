import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: '/',
}

const safeSegment = (value: string | undefined | null, fallback: string) => {
  const normalized = value?.trim().toLowerCase()
  return normalized && /^[a-z0-9-]{2,35}$/.test(normalized)
    ? normalized
    : fallback
}

export default function middleware(req: NextRequest) {
  const country = safeSegment(req.geo?.country, 'unknown')
  const preferredLocale = req.headers.get('accept-language')?.split(',')?.[0]
  const locale = safeSegment(preferredLocale, 'en-us')

  req.nextUrl.pathname = `/${locale}/${country}`
  return NextResponse.rewrite(req.nextUrl)
}
