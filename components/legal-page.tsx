import type { ReactNode } from "react"
import { Header } from "@/components/header"
import { MainFooter } from "@/components/main-footer"

// Shared layout for long legal documents (Privacy Policy, Terms of Service).
// Headings, lists and links are styled here, so the page files only hold the text.
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  updated?: string
  children: ReactNode
}) {
  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto max-w-3xl px-4 pt-32 pb-16">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">{title}</span>
          </h1>
          {updated && <p className="text-sm text-gray-500">{updated}</p>}
        </div>

        <div
          className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 text-sm leading-relaxed text-gray-300 backdrop-blur-xl md:p-10 md:text-base
            [&>*+*]:mt-4
            [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white md:[&_h2]:text-2xl
            [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-white md:[&_h3]:text-lg
            [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6
            [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6
            [&_strong]:font-semibold [&_strong]:text-white
            [&_a]:break-words [&_a]:text-indigo-400 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-indigo-300"
        >
          {children}
        </div>
      </div>
      <MainFooter />
    </main>
  )
}