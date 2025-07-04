"use client"

import { Marquee } from "@/components/ui/marquee"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function PartnersMarquee() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const partners = [
    {
      name: "HOPE FOR MIAMI",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-13%20at%208.56.08%E2%80%AFPM-Gad8Kl4GsHuU9wkwxzhZS9AwAhCHSV.png",
      width: 160,
    },
    { name: "Partner 2", width: 160 },
    { name: "Partner 3", width: 160 },
    { name: "Partner 4", width: 160 },
    { name: "Partner 5", width: 160 },
    { name: "Partner 6", width: 160 },
    { name: "Partner 7", width: 160 },
  ]

  return (
    <section ref={ref} className="py-16 bg-black">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4">Our Partners</h2>
        <p className="text-gray-400">Working together to empower the next generation</p>
      </motion.div>

      <Marquee pauseOnHover speed={50}>
        {partners.map((partner, index) => (
          <div key={index} className="flex items-center justify-center mx-16">
            <div className="bg-zinc-900 rounded-lg p-8 border border-white/5">
              <Image
                src={partner.image || `/placeholder.svg?height=60&width=${partner.width}`}
                alt={partner.name}
                width={partner.width}
                height={60}
                className="opacity-50 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  )
}

