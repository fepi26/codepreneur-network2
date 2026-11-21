"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

type Partner = { name: string; image: string; width: number; height: number; local?: boolean }

const partners: Partner[] = [
  {
    name: "HOPE FOR MIAMI",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-13%20at%209.08.46%E2%80%AFPM-wTgEwfqvExy84q7kyTZe208xKOOKqa.png",
    width: 280,
    height: 100,
  },
  {
    name: "Fundación Colombia Chiquita",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-13%20at%209.10.39%E2%80%AFPM-7ixb51bAKT3Y9p2iaDsc5PO9kTsD7Q.png",
    width: 280,
    height: 100,
  },
  // Logos stored in /public/partners are high-resolution PNGs with transparent backgrounds.
  { name: "University of Miami", image: "/partners/university-of-miami.png", width: 2400, height: 603, local: true },
  { name: "First Star", image: "/partners/first-star.png", width: 1200, height: 628, local: true },
]

// The list is repeated so the strip is always wider than the screen.
const loop = [...partners, ...partners]

function LogoCard({ partner }: { partner: Partner }) {
  return (
    <div className="mx-4 flex h-44 w-72 shrink-0 items-center justify-center rounded-lg border border-white/5 bg-zinc-900/50 p-8 transition-colors hover:border-white/20">
      <Image
        src={partner.image}
        alt={partner.name}
        width={partner.width}
        height={partner.height}
        unoptimized={partner.local}
        className="max-h-full w-auto max-w-full object-contain opacity-70 transition-opacity duration-300 hover:opacity-100"
      />
    </div>
  )
}

export function PartnersSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="overflow-hidden bg-black px-4 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          className="mb-12 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold">Our Partners</h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            There are plenty of people who believe in The Codepreneur Network just as much as we do. We are proud to
            have the support of some of the most innovative organizations in the industry. Looking to partner with us?
          </p>
          <div>
            <Button variant="link" asChild className="group text-white hover:text-gray-200">
              <Link href="/partner" className="inline-flex items-center gap-2">
                Become a Partner
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Horizontal carousel: slides left forever; when a logo leaves one side it re-enters on the other. */}
      <motion.div
        className="-mx-4"
        style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
        >
          {loop.map((partner, i) => (
            <LogoCard key={i} partner={partner} />
          ))}
          {loop.map((partner, i) => (
            <LogoCard key={`b-${i}`} partner={partner} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}