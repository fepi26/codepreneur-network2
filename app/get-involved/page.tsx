import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Building2, UserPlus } from "lucide-react"
import { Header } from "@/components/header"
import { MainFooter } from "@/components/main-footer"

export const metadata: Metadata = {
  title: "Get Involved | The Codepreneur Network",
  description: "Become a fellow or apply for a partnership with the Codepreneur Network.",
}

const options = [
  {
    href: "/apply",
    icon: UserPlus,
    title: "Become a Fellow",
    description:
      "For individuals who want to help empower kids through programming, AI, and business education. Apply to join our fellowship team.",
    cta: "Apply as a fellow",
  },
  {
    href: "/partner",
    icon: Building2,
    title: "Apply for a Partnership",
    description:
      "For organizations — schools, nonprofits, companies and more — that want to bring our education to the students they serve.",
    cta: "Apply as an organization",
  },
]

export default function GetInvolvedPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto max-w-4xl px-4 pt-32 pb-16">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-indigo-400">
            The Codepreneur Network
          </p>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">Get Involved</span>
          </h1>
          <p className="mx-auto max-w-xl text-gray-400">Choose the option that fits you best.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {options.map(({ href, icon: Icon, title, description, cta }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col rounded-2xl border border-white/10 bg-zinc-900/60 p-8 backdrop-blur-xl transition hover:border-indigo-400/50 hover:bg-zinc-900/80"
            >
              <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                <Icon className="h-6 w-6" />
              </span>
              <h2 className="mb-3 text-2xl font-bold text-white">{title}</h2>
              <p className="mb-8 flex-grow leading-relaxed text-gray-400">{description}</p>
              <span className="inline-flex items-center gap-2 font-medium text-white">
                {cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
      <MainFooter />
    </main>
  )
}