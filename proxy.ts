import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only guard /admin routes — everything else on the site is public
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  // The login page itself must stay reachable, or nobody could ever sign in
  if (pathname === "/admin/login") {
    return NextResponse.next()
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value
  const isValid = token ? await verifySessionToken(token) : false

  if (!isValid) {
    const loginUrl = new URL("/admin/login", request.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}