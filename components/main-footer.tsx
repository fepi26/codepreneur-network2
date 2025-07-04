"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Linkedin, Instagram, Youtube, Twitter } from "lucide-react"

export function MainFooter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "App Privacy Policy", href: "/app-privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Disclaimer", href: "/disclaimer" },
      ],
    },
    {
      title: "Product",
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "Pricing", href: "/#pricing" },
        { name: "Blog", href: "/blog" },
        { name: "Changelog", href: "/changelog" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "FAQ", href: "/faq" },
        { name: "Email", href: "mailto:support@visible-ai.com" },
        { name: "Discord", href: "https://discord.gg/visible-ai" },
        { name: "Download", href: "/#pricing" },
      ],
    },
  ]

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/the-codepreneur-network/posts/?feedView=all",
      label: "LinkedIn",
    },
    { icon: Instagram, href: "https://www.instagram.com/codepreneur.network/", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ]

  return (
    <footer ref={ref} className="bg-black border-t border-white/10 py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-5 mb-16">
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Copia%20de%20visual-xEv6VBJIekq7tW5SF0423WXZBu0AlR.png"
                alt="Visible AI Logo"
                width={160}
                height={160}
                className="h-24 w-24 object-contain"
              />
            </Link>
            <p className="text-gray-400 max-w-sm">
              Accelerate your content creation process by seamlessly integrating AI into your workflow.
            </p>
          </motion.div>

          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            >
              <h3 className="font-semibold mb-4 text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label={social.label}
            >
              <social.icon className="w-6 h-6" />
            </Link>
          ))}
        </motion.div>
      </div>
    </footer>
  )
}

