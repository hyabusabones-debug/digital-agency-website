import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { requireAdmin, serverError } from "@/lib/admin-auth"
import { parseServiceInput } from "@/lib/service-input"
import { contentFileExists, saveContentJson } from "@/lib/content-store"

export async function POST(request: Request) {
  const denied = await requireAdmin()
  if (denied) return denied

  const body = await request.json().catch(() => null)
  const parsed = parseServiceInput(body)
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }

  const { data } = parsed
  const relativePath = `services/${data.slug}.json`

  try {
    if (await contentFileExists(relativePath)) {
      return NextResponse.json(
        { error: "A service with this slug already exists. Choose a different title or slug." },
        { status: 409 }
      )
    }

    await saveContentJson(relativePath, data, `Add service: ${data.title}`)
    revalidatePath("/", "layout")
    return NextResponse.json({ success: true, slug: data.slug })
  } catch (err) {
    return serverError("create service", err)
  }
}