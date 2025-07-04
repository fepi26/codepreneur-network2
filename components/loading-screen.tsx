"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time (remove in production and use real loading state)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  const text = "The Codepreneur Network"

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
    >
      {/* Static logo */}
      <div className="mb-6">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Copia%20de%20visual-xEv6VBJIekq7tW5SF0423WXZBu0AlR.png"
          alt="Codepreneur Network Logo"
          width={200}
          height={200}
          className="w-48 h-48 object-contain"
          priority
        />
      </div>

      {/* Text animation */}
      <div className="relative">
        <div className="text-xl md:text-2xl lg:text-3xl font-bold tracking-wide text-white overflow-hidden">
          {text.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1.5,
                delay: index * 0.05,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

