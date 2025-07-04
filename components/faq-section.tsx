"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function FAQSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const faqItems = [
    {
      question: "What is the Codepreneur Network?",
      answer:
        "The Codepreneur Network is a nonprofit organization dedicated to empowering youth through the intersection of coding and entrepreneurship. Our goal is to provide hands-on learning experiences that equip students with the technical and business skills needed to innovate and succeed in the digital economy.",
    },
    {
      question: "Who can participate in Codepreneur Network programs?",
      answer:
        "Our programs are designed for middle and high school students who have an interest in technology, coding, and entrepreneurship. Whether you're a beginner or have some experience, we welcome all students who are eager to learn and create.",
    },
    {
      question: "How does the Codepreneur Network support students?",
      answer:
        "We offer coding workshops, mentorship opportunities, networking events, and project-based learning experiences that help students develop real-world problem-solving skills. Our collaboration with organizations like HOPE FOR MIAMI further extends our reach to underserved communities.",
    },
    {
      question: "How can I get involved with the Codepreneur Network?",
      answer:
        "There are several ways to get involved! Students can join our programs, volunteers can help mentor and guide participants, and donors can support our mission through contributions. If you're interested in partnering with us, please reach out through our website.",
    },
    {
      question: "What impact does the Codepreneur Network aim to achieve?",
      answer:
        "We strive to equip students with valuable coding and entrepreneurial skills that can transform their futures. By fostering creativity, collaboration, and problem-solving abilities, we aim to create a generation of tech-savvy entrepreneurs who can drive innovation in their communities.",
    },
  ]

  return (
    <section ref={ref} className="md:py-16 px-4 bg-gradient-to-b from-black via-zinc-950 to-black">
      <motion.div
        className="max-w-4xl mx-auto text-center mb-8 md:mb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold mb-4">
          Answers to All Your{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">Questions</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Learn more about the Codepreneur Network and how we're empowering youth through coding and entrepreneurship.
        </p>
      </motion.div>

      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              <AccordionItem value={`item-${index + 1}`} className="border-white/10 px-6">
                <AccordionTrigger className="text-left hover:text-white text-lg">{item.question}</AccordionTrigger>
                <AccordionContent className="text-gray-400">{item.answer}</AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </section>
  )
}

