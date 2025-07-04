"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function PartnersSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const partners = [
    {
      name: "HOPE FOR MIAMI",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-13%20at%209.08.46%E2%80%AFPM-wTgEwfqvExy84q7kyTZe208xKOOKqa.png",
      width: 280,
    },
    {
      name: "Fundación Colombia Chiquita",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-13%20at%209.10.39%E2%80%AFPM-7ixb51bAKT3Y9p2iaDsc5PO9kTsD7Q.png",
      width: 280,
    },
  ]

  return (
    <section ref={ref} className="py-16 px-4 bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          className="space-y-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold">Our Partners</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            There are plenty of people who believe in The Codepreneur Network just as much as we do. We are proud to
            have the support of some of the most innovative organizations in the industry. Looking to partner with us?
          </p>
          <div>
            <Button variant="link" asChild className="text-white hover:text-gray-200 group">
              <Link href="/contact" className="inline-flex items-center gap-2">
                Contact Us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row gap-8 items-center justify-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-zinc-900/50 rounded-lg p-12 w-full md:w-1/2 aspect-[4/3] flex items-center justify-center border border-white/5 hover:border-white/20 transition-colors"
            >
              <Image
                src={partner.image || "/placeholder.svg"}
                alt={partner.name}
                width={280}
                height={100}
                className="opacity-60 hover:opacity-100 transition-opacity duration-300 object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

