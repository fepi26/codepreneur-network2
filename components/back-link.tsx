import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Small "back" link shown at the top of blog posts and application pages.
export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Link>
  )
}