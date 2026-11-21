import type { Metadata } from "next"
import { Header } from "@/components/header"
import { MainFooter } from "@/components/main-footer"
import { PartnerForm } from "@/components/partner-form"

export const metadata: Metadata = {
  title: "Partner With Us | The Codepreneur Network",
  description:
    "Organizations: apply to partner with the Codepreneur Network and bring programming, AI, and entrepreneurship education to your students.",
}

export default function PartnerPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto max-w-3xl px-4 pt-32 pb-16">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-indigo-400">
            The Codepreneur Network
          </p>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl">
            <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              Partnership Application
            </span>
          </h1>
          <p className="mb-4 leading-relaxed text-gray-400">
            Is your organization looking to bring programming, artificial intelligence, and entrepreneurship education
            to the students you serve? Tell us about your organization and your goals, and our team will get in touch
            to explore how we can work together.
          </p>
          <p className="text-sm text-gray-500">This application is for organizations only.</p>
        </div>

        <PartnerForm />
      </div>
      <MainFooter />
    </main>
  )
}