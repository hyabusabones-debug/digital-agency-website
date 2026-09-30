import type { Service } from "./content-types"

// Icons the site knows how to render (see iconMap in components/sections/services-strip.tsx).
export const SERVICE_ICONS = ["Code2", "Megaphone", "Palette", "ShoppingCart", "Smartphone"] as const

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function isValidSlug(slug: string): boolean {
  return slug.length > 0 && slug.length <= 80 && SLUG_PATTERN.test(slug)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

type ParseResult = { ok: true; data: Service } | { ok: false; error: string }

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

/**
 * Turns raw form data into a clean Service object, or explains what's wrong.
 * When `forcedSlug` is given (editing), the slug can't be changed by the request body.
 */
export function parseServiceInput(body: unknown, forcedSlug?: string): ParseResult {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request." }
  }
  const b = body as Record<string, unknown>

  const slug = forcedSlug ?? text(b.slug)
  if (!isValidSlug(slug)) {
    return { ok: false, error: "Slug can only contain lowercase letters, numbers and hyphens." }
  }

  const title = text(b.title)
  if (!title) return { ok: false, error: "Title is required." }
  if (title.length > 120) return { ok: false, error: "Title is too long (max 120 characters)." }

  const shortDescription = text(b.shortDescription)
  if (!shortDescription) return { ok: false, error: "Short description is required." }
  if (shortDescription.length > 200) {
    return { ok: false, error: "Short description is too long (max 200 characters)." }
  }

  const description = typeof b.description === "string" ? b.description.trim() : ""
  if (!description) return { ok: false, error: "Description is required." }

  const icon = text(b.icon)
  if (!(SERVICE_ICONS as readonly string[]).includes(icon)) {
    return { ok: false, error: "Please choose one of the available icons." }
  }

  const image = text(b.image)
  if (image && !image.startsWith("/") && !/^https?:\/\//i.test(image)) {
    return { ok: false, error: "Image must be a path like /images/services/x.jpg or a full URL." }
  }

  const features = Array.isArray(b.features)
    ? b.features.map(text).filter(Boolean).slice(0, 20)
    : []

  const processSteps = Array.isArray(b.processSteps)
    ? b.processSteps
        .map((step) => {
          const s = (step ?? {}) as Record<string, unknown>
          return { title: text(s.title), description: text(s.description) }
        })
        .filter((step) => step.title)
        .slice(0, 12)
    : []

  const orderNumber = Number(b.order)
  const order = Number.isFinite(orderNumber) ? Math.trunc(orderNumber) : 0

  const seoTitle = text(b.seoTitle)
  const seoDescription = text(b.seoDescription)

  const data: Service = {
    slug,
    title,
    shortDescription,
    description,
    icon,
    features,
    processSteps,
    order,
    ...(image ? { image } : {}),
    ...(seoTitle ? { seoTitle } : {}),
    ...(seoDescription ? { seoDescription } : {}),
  }

  return { ok: true, data }
}