import { Header } from "@/components/header"
import { MainFooter } from "@/components/main-footer"
import { YouTubePlayer } from "@/components/youtube-player"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, BookOpen } from "lucide-react"

const videoLessons = [
  {
    id: 1,
    title: "Best Programming Languages in 2025",
    description:
      "Learn about the most important programming languages to know in 2025 with ThePrimeagen and Lex Fridman.",
    duration: "2:00:00",
    videoId: "SvAjpxfuYyY",
    thumbnail: "/placeholder.svg?height=400&width=800",
  },
  {
    id: 2,
    title: "Variables and Data Types",
    description: "Understanding how to store and manipulate different types of data in your programs.",
    duration: "12:45",
    videoId: "SvAjpxfuYyY",
    thumbnail: "/placeholder.svg?height=400&width=800",
  },
  {
    id: 3,
    title: "Control Flow: Conditionals",
    description: "Learn how to make decisions in your code using if-else statements.",
    duration: "18:20",
    videoId: "SvAjpxfuYyY",
    thumbnail: "/placeholder.svg?height=400&width=800",
  },
]

export default function VideoLessonsPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-5xl mx-auto">
          {/* Back button */}
          <Button variant="ghost" asChild className="text-gray-400 hover:text-white mb-8">
            <Link href="/courses" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </Link>
          </Button>

          <h1 className="text-3xl font-bold mb-2">Introduction to Programming</h1>
          <div className="flex items-center gap-2 text-gray-400 mb-8">
            <BookOpen className="w-4 h-4" />
            <span>12 video lessons</span>
            <span className="mx-2">•</span>
            <span>4 weeks</span>
          </div>

          {/* Featured video */}
          <div className="mb-12">
            <YouTubePlayer
              videoId={videoLessons[0].videoId}
              title={videoLessons[0].title}
              className="aspect-video mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{videoLessons[0].title}</h2>
            <p className="text-gray-400">{videoLessons[0].description}</p>
          </div>

          {/* Video playlist */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Course Videos</h2>
            <div className="space-y-6">
              {videoLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-zinc-900/50 border border-white/10 hover:border-orange-500/30 transition-colors"
                >
                  <div className="md:w-1/3 aspect-video rounded-lg overflow-hidden">
                    <YouTubePlayer videoId={lesson.videoId} title={lesson.title} />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-lg font-semibold mb-2">{lesson.title}</h3>
                    <p className="text-gray-400 mb-2">{lesson.description}</p>
                    <div className="text-sm text-gray-500">{lesson.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <MainFooter />
    </main>
  )
}

