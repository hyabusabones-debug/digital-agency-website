import { SignJWT, jwtVerify } from "jose"
import bcrypt from "bcryptjs"

export const SESSION_COOKIE_NAME = "admin_session"
export const SESSION_MAX_AGE = 60 * 60 * 8 // 8 hours, in seconds

function getSecretKey() {
  const secret = process.env.SESSION_SECRET
  if (!secret) {
    throw new Error("Missing required environment variable: SESSION_SECRET")
  }
  return new TextEncoder().encode(secret)
}

/**
 * bcrypt hashes contain "$" characters, which .env loaders treat as variable
 * references and silently destroy. To avoid that, the hash is stored base64-encoded
 * in ADMIN_PASSWORD_HASH_B64 (no "$" in base64) and decoded here.
 *
 * Generate the value once, from your project folder, with:
 *   node -e "console.log(Buffer.from(require('bcryptjs').hashSync('your-password-here', 10)).toString('base64'))"
 */
function getPasswordHash(): string | null {
  const b64 = process.env.ADMIN_PASSWORD_HASH_B64
  if (b64) {
    const decoded = Buffer.from(b64.trim(), "base64").toString("utf-8")
    if (decoded.startsWith("$2")) return decoded
  }

  // Fallback for a raw hash, in case it survived the .env parser intact
  const raw = process.env.ADMIN_PASSWORD_HASH
  if (raw && raw.startsWith("$2")) return raw

  return null
}

export async function verifyPassword(password: string): Promise<boolean> {
  const hash = getPasswordHash()
  if (!hash) {
    const status = (name: string) => (process.env[name] ? "set" : "MISSING")
    throw new Error(
      `Admin password hash not found. Env check → ` +
        `SESSION_SECRET: ${status("SESSION_SECRET")}, ` +
        `ADMIN_PASSWORD_HASH_B64: ${status("ADMIN_PASSWORD_HASH_B64")}, ` +
        `ADMIN_PASSWORD_HASH: ${status("ADMIN_PASSWORD_HASH")}`
    )
  }
  return bcrypt.compare(password, hash)
}

export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecretKey())
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey())
    return payload.role === "admin"
  } catch {
    return false
  }
}