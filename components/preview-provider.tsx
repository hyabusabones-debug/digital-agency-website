"use client"

import { LiveQueryProvider } from "@sanity/preview-kit"
import { client } from "@/sanity/lib/client"
import type { ReactNode } from "react"

export function PreviewProvider({
  children,
  token,
}: {
  children: ReactNode
  token: string
}) {
  if (!token) {
    throw new Error("Preview token is required")
  }

  return (
    <LiveQueryProvider client={client} token={token}>
      {children}
    </LiveQueryProvider>
  )
}
