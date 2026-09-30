import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { requireAdmin, serverError } from "@/lib/admin-auth"
import { saveContentJson } from "@/lib/content-store"
import { getGlobalSettings } from "@/lib/content"
import type { GlobalSettings } from "@/lib/content-types"

const SOCIAL_KEYS = ["facebook", "twitter", "linkedin", "instagram"] as const
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

export async function PUT(request: Request) {
  const denied = await requireAdmin()
  if (denied) return denied

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  const siteName = text(body.siteName)
  if (!siteName) return NextResponse.json({ error: "Site name is required." }, { status: 400 })
  if (siteName.length > 80) {
    return NextResponse.json({ error: "Site name is too long (max 80 characters)." }, { status: 400 })
  }

  const footerText = text(body.footerText)
  if (footerText.length > 500) {
    return NextResponse.json({ error: "Footer text is too long (max 500 characters)." }, { status: 400 })
  }

  const email = text(body.email)
  if (email && !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 })
  }

  const phone = text(body.phone).slice(0, 40)
  const address = text(body.address).slice(0, 200)

  const socialLinks: GlobalSettings["socialLinks"] = {}
  for (const key of SOCIAL_KEYS) {
    const value = text((body.socialLinks as Record<string, unknown> | undefined)?.[key])
    if (!value) continue
    if (!/^https?:\/\//i.test(value)) {
      return NextResponse.json(
        { error: `The ${key} link must start with http:// or https://` },
        { status: 400 }
      )
    }
    socialLinks[key] = value
  }

  const seoTitle = text(body.seoTitle)
  const seoDescription = text(body.seoDescription)

  try {
    const existing = await getGlobalSettings()
    // Keep anything the form doesn't edit (logos, SEO image) instead of wiping it
    const { defaultSEO: previousSeo, ...preserved } = existing ?? ({} as Partial<GlobalSettings>)

    const seo = {
      ...(previousSeo?.image ? { image: previousSeo.image } : {}),
      ...(seoTitle ? { title: seoTitle } : {}),
      ...(seoDescription ? { description: seoDescription } : {}),
    }

    const data: GlobalSettings = {
      ...preserved,
      siteName,
      footerText,
      contactInfo: { email, phone, ...(address ? { address } : {}) },
      socialLinks,
      ...(Object.keys(seo).length > 0 ? { defaultSEO: seo } : {}),
    }

    await saveContentJson("settings.json", data, "Update site settings")
    revalidatePath("/", "layout")
    return NextResponse.json({ success: true })
  } catch (err) {
    return serverError("save settings", err)
  }
}