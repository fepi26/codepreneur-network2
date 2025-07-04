import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import type React from "react"

export function PricingSection() {
  return (
    <section id="pricing" className="md:pt-10 md:pb-16 px-4 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Simple Pricing for Effortless Content Automation
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our pricing is designed for people who need more features with added flexibility.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter Plan */}
          <div className="relative rounded-2xl bg-gradient-to-b from-zinc-900/90 to-black p-8 border border-white/10 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4">Momentum Boost</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-bold">$249</span>
              <span className="text-gray-400">/month</span>
            </div>
            <Button className="w-full bg-white text-black hover:bg-gray-200 mb-8">
              <a href="https://cal.com/visible-ai/30min" target="_blank" rel="noopener noreferrer">
                Get Started
              </a>
            </Button>
            <ul className="space-y-4">
              <Feature>2 AI-Generated Videos/Month (3 per week)</Feature>
              <Feature>AI Avatar & Voice Creation</Feature>
              <Feature>Scriptwriting & Topic Ideation</Feature>
              <Feature>Automated Posting (Instagram feed & reels scheduling)</Feature>
              <Feature>Monthly Performance Report (Follower growth, engagement insights)</Feature>
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="relative rounded-2xl bg-gradient-to-b from-gray-900/50 to-black p-8 border border-white backdrop-blur-sm">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-white text-black px-3 py-1 rounded-full text-sm">Featured</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Brand Accelerator</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-bold">$499</span>
              <span className="text-gray-400">/month</span>
            </div>
            <Button className="w-full bg-white text-black hover:bg-gray-200 mb-8">
              <a href="https://cal.com/visible-ai/30min" target="_blank" rel="noopener noreferrer">
                Get Pro
              </a>
            </Button>
            <ul className="space-y-4">
              <Feature>Everything in Momentum Boost</Feature>
              <Feature>20 AI-Generated Videos/Month (5 per week)</Feature>
              <Feature>Professional Video Editing & Branding</Feature>
              <Feature>Bi-Weekly Strategy Call</Feature>
              <Feature>Advanced analytics dashboard</Feature>
              <Feature>AI-Optimized Hashtags & Captions</Feature>
            </ul>
          </div>

          {/* Premium Plan */}
          <div className="relative rounded-2xl bg-gradient-to-b from-zinc-900/90 to-black p-8 border border-white/10 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4">Influence Engine</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-bold">$999</span>
              <span className="text-gray-400">/month</span>
            </div>
            <Button className="w-full bg-white text-black hover:bg-gray-200 mb-8">
              <a href="https://cal.com/visible-ai/30min" target="_blank" rel="noopener noreferrer">
                Contact Sales
              </a>
            </Button>
            <ul className="space-y-4">
              <Feature>Everything in Brand Accelerator</Feature>
              <Feature>30 AI-Generated Videos/Month</Feature>
              <Feature>Custom Funnel & Monetization Strategy </Feature>
              <Feature>
                AI-Driven Engagement System (Auto-DMs, replies, and comments to grow audience interaction)
              </Feature>
              <Feature>AI-Powered Ad Testing & Scaling</Feature>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-gray-300">
      <Check className="w-5 h-5 flex-shrink-0 text-white mt-0.5" />
      <span>{children}</span>
    </li>
  )
}

