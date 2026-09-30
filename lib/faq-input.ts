import { randomUUID } from "crypto"
import type { FAQ } from "./content-types"

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

type ParseResult = { ok: true; data: FAQ[] } | { ok: false; error: string }

/**
 * FAQs are stored and edited as one ordered list, not individual pages, so saving
 * replaces the whole array at once. `order` is assigned from each item's position
 * in the array the admin submits — reordering in the UI is what sets it.
 */
export function parseFaqListInput(body: unknown): ParseResult {
  if (!Array.isArray(body)) {
    return { ok: false, error: "Invalid request." }
  }
  if (body.length > 200) {
    return { ok: false, error: "That's a lot of FAQs — please keep it under 200." }
  }

  const seenIds = new Set<string>()
  const data: FAQ[] = []

  for (let i = 0; i < body.length; i++) {
    const raw = (body[i] ?? {}) as Record<string, unknown>

    const question = text(raw.question)
    if (!question) return { ok: false, error: `FAQ #${i + 1} is missing a question.` }
    if (question.length > 300) {
      return { ok: false, error: `FAQ #${i + 1}'s question is too long (max 300 characters).` }
    }

    const answer = text(raw.answer)
    if (!answer) return { ok: false, error: `FAQ #${i + 1} ("${question}") is missing an answer.` }
    if (answer.length > 2000) {
      return { ok: false, error: `FAQ #${i + 1}'s answer is too long (max 2000 characters).` }
    }

    const category = text(raw.category).slice(0, 60) || "General"

    let id = text(raw.id)
    if (!id || seenIds.has(id)) id = randomUUID()
    seenIds.add(id)

    data.push({ id, question, answer, category, order: i })
  }

  return { ok: true, data }
}