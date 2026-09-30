"use client"

import { Suspense, useState } from "react"
import type { FormEvent } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock } from "lucide-react"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.error || "Something went wrong. Try again.")
      setLoading(false)
      return
    }

    const redirectTo = searchParams.get("from") || "/admin"
    router.push(redirectTo)
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-card border border-border rounded-3xl p-10 shadow-xl"
      >
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto">
          <Lock className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-center text-foreground mb-2">Admin Login</h1>
        <p className="text-sm text-muted-foreground text-center mb-8">
          Sign in to manage ICTSERVE content
        </p>

        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="mb-4"
        />

        {error && <p className="text-sm text-destructive mb-4">{error}</p>}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Signing in…" : "Sign In"}
        </Button>
      </form>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}