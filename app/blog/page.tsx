import { Header } from "@/components/header"
import { InstagramFeed } from "@/components/instagram-feed"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const posts = [
  {
    date: "June 1st, 2025",
    readTime: "5 min read",
    title: "Live to Create",
    description: "How The Codepreneur Network came to be",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-01%20at%203.51.56%E2%80%AFPM-584BBy6y0Zv92sQ0MCOTtdlwzazQah.png",
    href: "/blog/live-to-create",
    tags: ["Business", "Programming"]
  },
  {
    date: "Mar 15, 2025",
    readTime: "6 min read",
    title: "21st Century Success",
    description: "The Evolution of Success in the Age of Technology",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-01%20at%203.52.16%E2%80%AFPM-uqFPHw2jCZxuce9Oo7t1BLEnc7pasu.png",
    href: "/blog/future-of-content-creation",
    tags: ["Technology", "AI", "Future Tech"],
  },
  {
    date: "Jan 25, 2025",
    readTime: "6 min read",
    title: "AI-Driven Content Strategy Guide",
    description: "A comprehensive guide to implementing AI in your content marketing strategy.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-01%20at%203.52.39%E2%80%AFPM-xxfEgzmuPPoKzY2wBzK65mjhcTuwqm.png",
    href: "/blog/ai-driven-content-strategy",
    tags: ["Content Strategy", "AI", "Marketing"],
  },
  {
    date: "Jan 20, 2025",
    readTime: "4 min read",
    title: "Leveraging AI for Better Engagement",
    description: "How artificial intelligence is changing the way we connect with our audience.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-01%20at%203.51.56%E2%80%AFPM-584BBy6y0Zv92sQ0MCOTtdlwzazQah.png",
    tags: ["Engagement", "AI", "Social Media"],
  },
  {
    date: "Jan 15, 2025",
    readTime: "5 min read",
    title: "The Rise of Automated Content Creation",
    description: "Exploring the latest trends in AI-powered content generation and automation.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-01%20at%203.52.16%E2%80%AFPM-uqFPHw2jCZxuce9Oo7t1BLEnc7pasu.png",
    tags: ["Automation", "Content Creation", "Trends"],
  },
  {
    date: "Jan 10, 2025",
    readTime: "7 min read",
    title: "Building a Strong Content Strategy with AI",
    description: "A step-by-step guide to incorporating AI into your content marketing efforts.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-01%20at%203.52.39%E2%80%AFPM-xxfEgzmuPPoKzY2wBzK65mjhcTuwqm.png",
    tags: ["Strategy", "Marketing", "AI Tools"],
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-20">
        {/* Back button */}
        <div className="mb-12">
          <Button variant="ghost" asChild className="text-gray-400 hover:text-white">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Latest Articles</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover insights and strategies about AI-powered content creation and digital marketing.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link
              key={index}
              href={post.href || "#"}
              className="group relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-white/10 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10 flex flex-col"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority={index < 3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-full bg-white/10 text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                  <time>{post.date}</time>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-red-400 transition-colors">{post.title}</h2>
                <p className="text-sm text-gray-400 line-clamp-2">{post.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}