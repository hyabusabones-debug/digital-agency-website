"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function SignOutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSignOut() {
    setLoading(true)
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <Button variant="outline" size="sm" onClick={handleSignOut} disabled={loading}>
      <LogOut className="w-4 h-4 mr-2" />
      {loading ? "Signing out…" : "Sign Out"}
    </Button>
  )
}