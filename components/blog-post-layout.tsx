import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import type React from "react" // Added import for React

interface BlogPostLayoutProps {
  title: string
  date: string
  readTime: string
  author: string
  image: string
  children: React.ReactNode
  tags?: string[]
}

export function BlogPostLayout({ title, date, readTime, author, image, children, tags = [] }: BlogPostLayoutProps) {
  return (
    <article className="min-h-screen bg-black text-white pb-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back button */}
        <div className="py-8">
          <Button variant="ghost" asChild className="text-gray-400 hover:text-white">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Post Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-4">
            <time>{date}</time>
            <span>·</span>
            <span>{readTime}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{title}</h1>
          <p className="text-gray-400">By {author}</p>
        </div>

        {/* Featured Image */}
        <div className="relative w-full aspect-[16/9] mb-12">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover rounded-xl" priority />
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-zinc-900 text-gray-300 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="prose prose-invert max-w-none">{children}</div>
      </div>
    </article>
  )
}

