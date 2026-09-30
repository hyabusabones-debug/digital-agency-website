import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { SESSION_COOKIE_NAME, verifySessionToken } from "./auth"

/** True when the request carries a valid admin session cookie. */
export async function isAdminRequest(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  return token ? verifySessionToken(token) : false
}

/** Call at the top of every admin API route. Returns a 401 response if not signed in. */
export async function requireAdmin(): Promise<NextResponse | null> {
  if (await isAdminRequest()) return null
  return NextResponse.json({ error: "Not signed in" }, { status: 401 })
}

/** Consistent 500 response for admin API routes. Safe to show the message: only signed-in admins reach these. */
export function serverError(context: string, err: unknown) {
  console.error(`[admin] ${context}:`, err)
  const message = err instanceof Error ? err.message : "Something went wrong saving your changes."
  return NextResponse.json({ error: message }, { status: 500 })
}