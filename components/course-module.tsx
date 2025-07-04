"use client"

import { motion } from "framer-motion"
import { ChevronRight, Clock, BookOpen, Users, Video, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CourseModuleProps {
  title: string
  description: string
  duration: string
  lessons: number
  students: number
  index: number
  href: string
  hasVideos?: boolean
  featured?: boolean
}

export function CourseModule({
  title,
  description,
  duration,
  lessons,
  students,
  index,
  href,
  hasVideos = false,
  featured = false,
}: CourseModuleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-900/90 to-black p-8 border border-white/10 backdrop-blur-sm hover:border-orange-500/50 transition-all duration-300"
    >
      {featured && (
        <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3" />
          <span>Featured</span>
        </div>
      )}
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-orange-400 transition-colors">
          Module {index + 1}: {title}
        </h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="w-4 h-4 text-orange-500" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <BookOpen className="w-4 h-4 text-orange-500" />
            <span>{lessons} lessons</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Users className="w-4 h-4 text-orange-500" />
            <span>{students} students</span>
          </div>
        </div>
        {hasVideos ? (
          <div className="flex gap-3">
            <Button asChild className="group-hover:bg-orange-500 transition-colors">
              <Link href="/courses/video-lessons" className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                Watch Videos
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white/20 hover:border-orange-500/50">
              <Link href={href} className="flex items-center gap-2">
                Start Learning
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <Button asChild className="group-hover:bg-orange-500 transition-colors">
            <Link href={href} className="flex items-center gap-2">
              Start Learning
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  )
}

