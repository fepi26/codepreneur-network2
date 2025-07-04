import { Header } from "@/components/header"
import { MainFooter } from "@/components/main-footer"
import { Calendar } from "@/components/calendar"

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 pt-32 pb-16">
        <h1 className="text-4xl font-bold mb-4 text-center">Participate in Future Events!</h1>
        <p className="text-xl text-gray-400 mb-12 text-center">
          Join us for exciting workshops, seminars, and coding challenges.
        </p>
        <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h2>
        <div className="mt-12">
          <Calendar />
        </div>
      </div>
      <MainFooter />
    </main>
  )
}

