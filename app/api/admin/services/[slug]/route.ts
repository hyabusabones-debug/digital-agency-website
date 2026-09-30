import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { requireAdmin, serverError } from "@/lib/admin-auth"
import { isValidSlug, parseServiceInput } from "@/lib/service-input"
import { contentFileExists, saveContentJson, deleteContentFile } from "@/lib/content-store"

type RouteContext = { params: Promise<{ slug: string }> }

export async function PUT(request: Request, { params }: RouteContext) {
  const denied = await requireAdmin()
  if (denied) return denied

  const { slug } = await params
  if (!isValidSlug(slug)) {
    return NextResponse.json({ error: "Invalid slug." }, { status: 400 })
  }

  const body = await request.json().catch(() => null)
  // The slug in the URL is the source of truth: it can't be changed from the request body.
  const parsed = parseServiceInput(body, slug)
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }

  const relativePath = `services/${slug}.json`

  try {
    if (!(await contentFileExists(relativePath))) {
      return NextResponse.json({ error: "Service not found." }, { status: 404 })
    }

    await saveContentJson(relativePath, parsed.data, `Update service: ${parsed.data.title}`)
    revalidatePath("/", "layout")
    return NextResponse.json({ success: true })
  } catch (err) {
    return serverError("update service", err)
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const denied = await requireAdmin()
  if (denied) return denied

  const { slug } = await params
  if (!isValidSlug(slug)) {
    return NextResponse.json({ error: "Invalid slug." }, { status: 400 })
  }

  try {
    await deleteContentFile(`services/${slug}.json`, `Delete service: ${slug}`)
    revalidatePath("/", "layout")
    return NextResponse.json({ success: true })
  } catch (err) {
    return serverError("delete service", err)
  }
}