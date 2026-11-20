"use client"

import { Button } from "@/components/ui/button"
import { InteractiveGrid } from "@/components/ui/interactive-grid"
import { ShineBorder } from "@/components/ui/shine-border"
import { UserPlus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function HeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="relative min-h-screen pt-36 pb-0 md:pt-44 md:pb-8 overflow-hidden bg-black">
      <InteractiveGrid containerClassName="absolute inset-0" className="opacity-30" points={40} />

      <ShineBorder
        className="relative z-10 max-w-6xl mx-auto px-6"
        borderClassName="border border-white/10 rounded-xl overflow-hidden"
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4 mt-5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <UserPlus className="w-4 h-4 text-white" />
            <span className="text-sm font-medium">We are looking for volunteers!</span>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="text-white">Contribute to the </span>
            <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              Next Generation of Creators
            </span>
          </motion.h1>
          <motion.p
            className="text-gray-400 text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            We have a clear objective: As an organization, we seek to provide State of the art education to the kids of
            tomorrow. We believe this is the best way to catalyze a future full of innovation and passion for creation.
          </motion.p>
          <motion.div
            className="flex gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button variant="secondary" className="bg-white text-black hover:bg-gray-200">
              <Link href="/apply" className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
              Volunteer
            </Link>
            </Button>
          </motion.div>
        </motion.div>

        <ShineBorder className="relative mx-auto" borderClassName="border border-white/10 rounded-xl overflow-hidden">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-02%20at%204.52.38%E2%80%AFPM-id98Z7tGh3LLHax6V8hJ0Ok65yV71z.png"
              alt="Code editor showing Python function for document processing"
              width={1920}
              height={1080}
              className="w-full h-auto rounded-xl"
              priority
            />
          </motion.div>
        </ShineBorder>
      </ShineBorder>
    </section>
  )
}

