"use client"

import { Header } from "@/components/header"
import { MainFooter } from "@/components/main-footer"
import { motion } from "framer-motion"
import { Construction, Clock, BookOpen, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CourseInProgress() {
  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Button variant="ghost" asChild className="text-gray-400 hover:text-white mb-8">
            <Link href="/courses" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </Link>
          </Button>

          <motion.div
            className="rounded-2xl bg-gradient-to-b from-zinc-900/90 to-black p-8 border border-orange-500/20 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center mb-6"
              >
                <Construction className="w-10 h-10 text-orange-500" />
              </motion.div>
              <motion.h1
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Course In Progress
              </motion.h1>
              <motion.p
                className="text-gray-400 max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                We&apos;re working hard to create an amazing learning experience for you. This course is currently under
                development and will be available soon.
              </motion.p>
            </div>

            <motion.div
              className="grid md:grid-cols-2 gap-6 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <h2 className="font-semibold">Estimated Release</h2>
                </div>
                <p className="text-gray-400">Coming in Q2 2025</p>
              </div>
              <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-5 h-5 text-orange-500" />
                  <h2 className="font-semibold">Course Content</h2>
                </div>
                <p className="text-gray-400">12 modules with hands-on projects</p>
              </div>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <p className="text-gray-400">
                Want to be notified when this course is ready?{" "}
                <Link href="/contact" className="text-orange-500 hover:text-orange-400 underline">
                  Contact us
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <MainFooter />
    </main>
  )
}

