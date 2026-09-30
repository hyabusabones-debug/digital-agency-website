import { NextResponse } from "next/server"
import {
  verifyPassword,
  createSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE,
} from "@/lib/auth"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const password = body?.password

  if (!password || typeof password !== "string") {
    return NextResponse.json({ error: "Password is required" }, { status: 400 })
  }

  try {
    const valid = await verifyPassword(password)
    if (!valid) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 })
    }

    const token = await createSessionToken()
    const response = NextResponse.json({ success: true })

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    })

    return response
  } catch (err) {
    // Always logged server-side so the real cause shows up in your terminal
    console.error("[admin login] error:", err)
    const message =
      err instanceof Error && process.env.NODE_ENV !== "production"
        ? err.message
        : "Server error — check your environment variables"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}