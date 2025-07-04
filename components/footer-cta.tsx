"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function FooterCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative md:py-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black pointer-events-none" />
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Ready to shift the future of
          <br />
          programming and business education?
        </motion.h2>
        <motion.p
          className="text-lg text-gray-200 mb-8 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Be part of the revolution in tech and entrepreneurship education for youth
        </motion.p>
      </motion.div>
    </section>
  )
}

