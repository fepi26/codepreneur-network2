import { Header } from "@/components/header"
import { MainFooter } from "@/components/main-footer"

export default function LoadingCourses() {
  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="h-8 w-48 bg-zinc-800 rounded-lg animate-pulse mx-auto mb-4" />
          <div className="h-4 w-96 bg-zinc-800 rounded-lg animate-pulse mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded-2xl bg-zinc-900/90 p-8 border border-white/10 space-y-4 animate-pulse">
              <div className="h-6 w-3/4 bg-zinc-800 rounded-lg" />
              <div className="h-4 w-full bg-zinc-800 rounded-lg" />
              <div className="h-4 w-2/3 bg-zinc-800 rounded-lg" />
              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-4 bg-zinc-800 rounded-lg" />
                ))}
              </div>
              <div className="h-10 w-32 bg-zinc-800 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
      <MainFooter />
    </main>
  )
}

