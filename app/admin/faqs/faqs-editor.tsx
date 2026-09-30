"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronUp, ChevronDown, Trash2, Plus, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { FAQ } from "@/lib/content-types"

type DraftFaq = Omit<FAQ, "order">

function makeBlank(): DraftFaq {
  return { id: "", question: "", answer: "", category: "General" }
}

export function FaqsEditor({ initialFaqs }: { initialFaqs: FAQ[] }) {
  const router = useRouter()
  const [faqs, setFaqs] = useState<DraftFaq[]>(
    initialFaqs.length > 0 ? initialFaqs.map(({ order, ...f }) => f) : [makeBlank()]
  )
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  const categoryOptions = useMemo(
    () => Array.from(new Set(faqs.map((f) => f.category).filter(Boolean))),
    [faqs]
  )

  function update(index: number, patch: Partial<DraftFaq>) {
    setSaved(false)
    setFaqs((list) => list.map((f, i) => (i === index ? { ...f, ...patch } : f)))
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= faqs.length) return
    setSaved(false)
    setFaqs((list) => {
      const next = [...list]
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }

  function remove(index: number) {
    setSaved(false)
    setFaqs((list) => list.filter((_, i) => i !== index))
  }

  function addNew() {
    setSaved(false)
    setFaqs((list) => [...list, makeBlank()])
  }

  async function handleSave() {
    setSaving(true)
    setSaved(false)
    setError("")

    try {
      const res = await fetch("/api/admin/faqs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(faqs),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(data.error || "Could not save. Please try again.")
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        setFaqs((data.faqs as FAQ[]).map(({ order, ...f }) => f))
        setSaved(true)
        router.refresh()
      }
    } catch {
      setError("Network error. Check your connection and try again.")
    }

    setSaving(false)
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {error && (
        <div
          role="alert"
          className="p-4 rounded-2xl bg-destructive/10 border border-destructive/30 text-sm text-destructive"
        >
          {error}
        </div>
      )}

      {saved && (
        <div
          role="status"
          className="flex items-center gap-2 p-4 rounded-2xl bg-primary/10 border border-primary/20 text-sm text-foreground"
        >
          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
          Saved — your FAQs page reflects this order now.
        </div>
      )}

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <div className="flex flex-col gap-1 pt-1 shrink-0">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  aria-label={`Move question ${index + 1} up`}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === faqs.length - 1}
                  aria-label={`Move question ${index + 1} down`}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 space-y-3">
                <div className="grid sm:grid-cols-[1fr_180px] gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor={`question-${index}`} className="text-xs">
                      Question
                    </Label>
                    <Input
                      id={`question-${index}`}
                      value={faq.question}
                      onChange={(e) => update(index, { question: e.target.value })}
                      placeholder="What services does your agency offer?"
                      maxLength={300}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor={`category-${index}`} className="text-xs">
                      Category
                    </Label>
                    <Input
                      id={`category-${index}`}
                      value={faq.category}
                      onChange={(e) => update(index, { category: e.target.value })}
                      placeholder="General"
                      list="faq-categories"
                      maxLength={60}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`answer-${index}`} className="text-xs">
                    Answer
                  </Label>
                  <Textarea
                    id={`answer-${index}`}
                    value={faq.answer}
                    onChange={(e) => update(index, { answer: e.target.value })}
                    className="min-h-[90px]"
                    maxLength={2000}
                  />
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Delete question ${index + 1}`}
                onClick={() => remove(index)}
                className="text-muted-foreground hover:text-destructive shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <datalist id="faq-categories">
        {categoryOptions.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button type="button" variant="outline" onClick={addNew}>
          <Plus className="w-4 h-4 mr-2" />
          Add question
        </Button>
        <Button type="button" onClick={handleSave} disabled={saving} className="min-w-[140px]">
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving…
            </>
          ) : (
            "Save FAQs"
          )}
        </Button>
      </div>
    </div>
  )
}