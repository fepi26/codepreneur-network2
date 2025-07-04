import { Check, Code, Users, Lightbulb, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import type React from "react"

export function MethodologySection() {
  return (
    <section id="methodology" className="md:pt-10 md:pb-16 px-4 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Our Methodology: Empowering Future Innovators
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            At Codepreneur Network, we follow a comprehensive approach to nurture the next generation of tech
            entrepreneurs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Coding Skills Pillar */}
          <div className="relative rounded-2xl bg-gradient-to-b from-zinc-900/90 to-black p-8 border border-white/10 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Code className="w-6 h-6" />
              Coding Skills
            </h3>
            <p className="text-gray-400 mb-6">
              Equipping students with practical programming knowledge and problem-solving abilities.
            </p>
            <ul className="space-y-4">
              <Feature>Hands-on coding workshops</Feature>
              <Feature>Project-based learning</Feature>
              <Feature>Industry-relevant technologies</Feature>
              <Feature>Adaptive curriculum for all levels</Feature>
            </ul>
          </div>

          {/* Entrepreneurship Mindset Pillar */}
          <div className="relative rounded-2xl bg-gradient-to-b from-zinc-900/90 to-black p-8 border border-white/10 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="w-6 h-6" />
              Entrepreneurship Mindset
            </h3>
            <p className="text-gray-400 mb-6">Fostering creativity, innovation, and business acumen in young minds.</p>
            <ul className="space-y-4">
              <Feature>Idea generation workshops</Feature>
              <Feature>Business model development</Feature>
              <Feature>Pitch practice sessions</Feature>
              <Feature>Market analysis techniques</Feature>
            </ul>
          </div>

          {/* Community and Mentorship Pillar */}
          <div className="relative rounded-2xl bg-gradient-to-b from-zinc-900/90 to-black p-8 border border-white/10 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Users className="w-6 h-6" />
              Community and Mentorship
            </h3>
            <p className="text-gray-400 mb-6">Building a supportive ecosystem for growth and learning.</p>
            <ul className="space-y-4">
              <Feature>One-on-one mentoring</Feature>
              <Feature>Networking events</Feature>
              <Feature>Collaborative projects</Feature>
              <Feature>Industry expert talks</Feature>
            </ul>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button className="bg-white text-black hover:bg-gray-200">
            <a href="#" className="flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              Join Our Program
            </a>
          </Button>
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

