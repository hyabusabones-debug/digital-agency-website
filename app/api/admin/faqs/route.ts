import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { requireAdmin, serverError } from "@/lib/admin-auth"
import { parseFaqListInput } from "@/lib/faq-input"
import { saveContentJson } from "@/lib/content-store"

export async function PUT(request: Request) {
  const denied = await requireAdmin()
  if (denied) return denied

  const body = await request.json().catch(() => null)
  const parsed = parseFaqListInput(body)
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }

  try {
    await saveContentJson("faqs.json", parsed.data, "Update FAQs")
    revalidatePath("/", "layout")
    return NextResponse.json({ success: true, faqs: parsed.data })
  } catch (err) {
    return serverError("save FAQs", err)
  }
}