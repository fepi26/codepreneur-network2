"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function WhiteContentBlock() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-12 mx-auto max-w-6xl px-4">
      <motion.div
        className="bg-white rounded-3xl shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-full mx-auto px-6 md:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <motion.div
              className="text-black lg:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="text-gray-500 font-medium tracking-wider text-sm">OUR MISSION</span>

              <h2 className="mt-4 text-3xl md:text-4xl font-serif mb-4">
                Empowering <span className="italic">youth</span> through <span className="italic">code &</span>{" "}
                <span className="italic">entrepreneurship</span>
              </h2>

              <p className="text-gray-600 text-base mb-6">
                At Codepreneur Network, we nurture the next generation of innovators with tools, knowledge, and support
                to thrive in the digital age.
              </p>

              <div className="space-y-4 mb-6">
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-medium">Coding Workshops</h3>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-medium">Entrepreneurship Mentoring</h3>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-medium">Innovation Challenges</h3>
                </div>
              </div>

              <Button className="bg-white text-black hover:bg-gray-100 border border-gray-300">Get Involved</Button>
            </motion.div>

            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-02%20at%204.52.38%E2%80%AFPM-id98Z7tGh3LLHax6V8hJ0Ok65yV71z.png"
                alt="Students participating in a coding workshop"
                width={500}
                height={375}
                className="rounded-lg object-cover w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

