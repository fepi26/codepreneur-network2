"use client"

import { useRef, useCallback } from "react"
import { motion, useInView } from "framer-motion"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import type { Engine } from "tsparticles-engine"

const BarChart = () => {
  const bars = [
    { height: 20 },
    { height: 30 },
    { height: 40 },
    { height: 35 },
    { height: 50 },
    { height: 25 },
    { height: 45 },
    { height: 55 },
    { height: 40 },
    { height: 60 },
    { height: 50 },
    { height: 35 },
  ]

  return (
    <div className="flex items-end justify-between h-32 w-full">
      {bars.map((bar, index) => (
        <motion.div
          key={index}
          className="w-2 bg-orange-500 rounded-full"
          initial={{ height: 0 }}
          animate={{ height: `${bar.height}%` }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
        ></motion.div>
      ))}
    </div>
  )
}

const LineChart = () => {
  return (
    <div className="relative h-32 w-full">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFA500" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FFA500" stopOpacity="1" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,100 Q25,80 50,60 T100,0"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.circle
          cx="85"
          cy="15"
          r="4"
          fill="#FFA500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        />
        <motion.circle
          cx="85"
          cy="15"
          r="8"
          fill="#FFA500"
          fillOpacity="0.3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        />
      </svg>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
        <span>-5</span>
        <span>0</span>
        <span>5</span>
        <span>15</span>
        <span>25</span>
        <span>35</span>
        <span>45</span>
      </div>
    </div>
  )
}

const BlockDiagram = () => {
  const blocks = [
    { x: 25, y: 70, width: 50, height: 20, color: "#FFA500" },
    { x: 30, y: 45, width: 40, height: 20, color: "#FF8C00" },
    { x: 35, y: 20, width: 30, height: 20, color: "#FF7F50" },
  ]

  return (
    <div className="relative h-32 w-full">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {blocks.map((block, index) => (
          <motion.rect
            key={index}
            x={block.x}
            y={block.y}
            width={block.width}
            height={block.height}
            fill={block.color}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          />
        ))}
        <motion.path
          d="M50 90 L50 10"
          stroke="#FFD700"
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
      </svg>
    </div>
  )
}

const AnimatedGrowthCard = ({ title, description, chart, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      className="bg-zinc-900 rounded-3xl p-6 shadow-lg border border-gray-800"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="mb-4 text-gray-300 font-semibold"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.2 + index * 0.2 }}
      >
        Growth
      </motion.div>
      {chart}
      <motion.h3
        className="text-2xl font-bold mb-2 text-white"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.4 + index * 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.p
        className="text-gray-400"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.6 + index * 0.2 }}
      >
        {description}
      </motion.p>
    </motion.div>
  )
}

export function GrowthSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <section ref={sectionRef} className="py-16 px-4 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <Particles
          id="tsparticles-growth"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "grab",
                },
                resize: true,
              },
              modes: {
                grab: {
                  distance: 140,
                  links: {
                    opacity: 0.5,
                  },
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.1,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: true,
                speed: 0.3,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.3,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
              },
              twinkle: {
                particles: {
                  enable: true,
                  frequency: 0.05,
                  opacity: 1,
                },
              },
            },
            detectRetina: true,
          }}
          className="opacity-30"
        />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-white">Empowering Youth Growth</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our programs are designed to nurture and accelerate the development of young innovators.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <AnimatedGrowthCard
            index={0}
            title="Learn Modern Day Skills"
            description="Acquire cutting-edge coding and entrepreneurship skills that are in high demand in today's digital economy."
            chart={<BarChart />}
          />
          <AnimatedGrowthCard
            index={1}
            title="Go From Idea to Reality"
            description="Transform your innovative ideas into tangible projects and potentially successful startups with our guidance and resources."
            chart={<LineChart />}
          />
          <AnimatedGrowthCard
            index={2}
            title="Our Build to Learn Approach"
            description="Experience hands-on learning by working on real-world projects, fostering practical skills and problem-solving abilities."
            chart={<BlockDiagram />}
          />
        </div>

        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {[
            "Mentorship",
            "Project-Based Learning",
            "Industry Connections",
            "Skill Development",
            "Innovation Challenges",
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-zinc-800 rounded-full px-4 py-2 text-sm text-gray-300 flex items-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
            >
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              {feature}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

