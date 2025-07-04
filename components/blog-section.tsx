"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function BlogSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const posts = [
    {
      date: "Feb 1, 2025",
      readTime: "5 min read",
      title: "Our Story: Empowering the Next Generation of Innovators",
      description:
        "Discover the journey of Codepreneur Network and our mission to empower youth through coding and entrepreneurship.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-01%20at%203.51.56%E2%80%AFPM-584BBy6y0Zv92sQ0MCOTtdlwzazQah.png",
      href: "/blog/our-story",
    },
    {
      date: "Jan 28, 2025",
      readTime: "4 min read",
      title: "The Future of Programming",
      description: "Explore how programming is evolving and shaping the digital landscape of tomorrow.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-01%20at%203.52.16%E2%80%AFPM-uqFPHw2jCZxuce9Oo7t1BLEnc7pasu.png",
      href: "/blog/future-of-programming",
    },
    {
      date: "Jan 25, 2025",
      readTime: "6 min read",
      title: "The World Needs More Entrepreneurs",
      description: "Why entrepreneurship is crucial for solving global challenges and how we can foster it.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-01%20at%203.52.39%E2%80%AFPM-xxfEgzmuPPoKzY2wBzK65mjhcTuwqm.png",
      href: "/blog/world-needs-entrepreneurs",
    },
  ]

  return (
    <section ref={ref} id="blog" className="md:py-16 px-4 bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4">
            Insights and{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">Updates</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay informed about our journey, impact, and the latest in youth empowerment through technology and
            entrepreneurship.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            >
              <Link
                href={post.href}
                className="group relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-white/10 backdrop-blur-sm hover:border-white/50 transition-all duration-300 hover:shadow-2xl hover:shadow-white/10 flex flex-col"
              >
                <div className="relative overflow-hidden flex-grow">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={800}
                    height={600}
                    className="object-cover group-hover:scale-105 transition-transform duration-500 w-full h-full"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="inline-flex items-center self-start rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 text-xs text-gray-200 mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-2 group-hover:text-white transition-colors">{post.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{post.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors group"
          >
            <span className="text-lg">View all posts</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

