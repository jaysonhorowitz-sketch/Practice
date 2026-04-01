"use client"

import { useRouter } from "next/navigation"

export function MarkAllReadButton() {
  const router = useRouter()

  async function handleClick() {
    await fetch("/api/notifications/mark-read", { method: "POST" })
    router.refresh()
  }

  return (
    <button
      onClick={handleClick}
      className="text-sm text-zinc-500 hover:text-zinc-900 hover:underline"
    >
      Mark all read
    </button>
  )
}
