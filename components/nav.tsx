"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"

interface NavProps {
  unreadCount: number
}

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/campaigns/new", label: "New Campaign" },
  { href: "/notifications", label: "Notifications" },
]

export function Nav({ unreadCount }: NavProps) {
  const pathname = usePathname()

  return (
    <nav className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <span className="text-sm font-semibold tracking-tight">UGC Studio</span>
          <div className="flex items-center gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm",
                  pathname === link.href
                    ? "font-medium text-zinc-900"
                    : "text-zinc-500 hover:text-zinc-900"
                )}
              >
                {link.label}
                {link.href === "/notifications" && unreadCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white">
                    {unreadCount}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-sm text-zinc-500 hover:text-zinc-900"
        >
          Sign out
        </button>
      </div>
    </nav>
  )
}
