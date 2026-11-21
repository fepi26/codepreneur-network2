import type { Metadata } from "next"
import { Header } from "@/components/header"
import { MainFooter } from "@/components/main-footer"
import { FellowshipForm } from "@/components/fellowship-form"

export const metadata: Metadata = {
  title: "Become a Fellow | The Codepreneur Network",
  description:
    "Apply to the Codepreneur Network Fellowship Program and help empower kids with education in programming, AI, and business principles.",
}

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto max-w-3xl px-4 pt-40 pb-16">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#fcac30]">
            The Codepreneur Network
          </p>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl">
            <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              Become a Fellow
            </span>
          </h1>
          <p className="mb-4 leading-relaxed text-gray-400">
            The Codepreneur Network is dedicated to empowering kids in need by providing state-of-the-art education in
            Programming, Artificial Intelligence, and Business Principles. Join us in shaping the future by equipping
            young minds with the tools to succeed.
          </p>
          <p className="mb-4 leading-relaxed text-gray-400">
            If you&apos;re passionate about making a significant impact on a child&apos;s future and inspiring their
            vocation, sign up now and be part of this transformative journey!
          </p>
        </div>

        <FellowshipForm />
      </div>
      <MainFooter />
    </main>
  )
}