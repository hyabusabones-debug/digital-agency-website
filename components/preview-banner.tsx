"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AlertCircle, X } from "lucide-react"

export function PreviewBanner() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-amber-500 text-amber-950 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span className="font-medium">Preview Mode</span>
          <span className="text-sm">You are viewing unpublished content.</span>
        </div>
        <Link
          href={`/api/exit-preview?redirect=${encodeURIComponent(pathname)}`}
          className="flex items-center gap-1 bg-amber-600 hover:bg-amber-700 px-3 py-1 rounded text-sm font-medium transition-colors"
        >
          <X className="w-4 h-4" />
          Exit Preview
        </Link>
      </div>
    </div>
  )
}
