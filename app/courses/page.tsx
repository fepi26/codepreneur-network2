import { Header } from "@/components/header"
import { MainFooter } from "@/components/main-footer"
import { CourseModule } from "@/components/course-module"

const courses = [
  {
    title: "Introduction to Programming",
    description:
      "Learn the fundamentals of programming with Python. Featuring a special video with ThePrimeagen and Lex Fridman on the best programming languages in 2025.",
    duration: "4 weeks",
    lessons: 12,
    students: 1234,
    href: "/courses/intro-to-programming",
    hasVideos: true,
    featured: true,
  },
  {
    title: "Web Development Fundamentals",
    description:
      "Master HTML, CSS, and JavaScript. Build responsive websites and understand modern web development practices.",
    duration: "6 weeks",
    lessons: 18,
    students: 892,
    href: "/courses/web-development",
  },
  {
    title: "Entrepreneurship Basics",
    description: "Understand the fundamentals of starting and running a successful business in the digital age.",
    duration: "4 weeks",
    lessons: 10,
    students: 756,
    href: "/courses/entrepreneurship-basics",
  },
  {
    title: "Mobile App Development",
    description: "Create mobile applications using React Native. Learn to build cross-platform apps efficiently.",
    duration: "8 weeks",
    lessons: 24,
    students: 645,
    href: "/courses/mobile-development",
  },
  {
    title: "Digital Marketing for Startups",
    description:
      "Learn essential digital marketing strategies to promote your tech startup and reach your target audience.",
    duration: "5 weeks",
    lessons: 15,
    students: 534,
    href: "/courses/digital-marketing",
  },
  {
    title: "Advanced Programming Concepts",
    description:
      "Dive deep into advanced programming concepts including data structures, algorithms, and software architecture.",
    duration: "10 weeks",
    lessons: 30,
    students: 423,
    href: "/courses/advanced-programming",
  },
]

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Our Courses</h1>
          <p className="text-xl text-gray-400">
            Comprehensive learning paths designed to help you master coding and entrepreneurship skills.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {courses.map((course, index) => (
            <CourseModule
              key={index}
              index={index}
              title={course.title}
              description={course.description}
              duration={course.duration}
              lessons={course.lessons}
              students={course.students}
              href={course.href}
              hasVideos={course.hasVideos}
              featured={course.featured}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 max-w-2xl mx-auto">
            Can&apos;t find what you&apos;re looking for? We&apos;re constantly adding new courses and updating our
            curriculum. Check back soon for more learning opportunities!
          </p>
        </div>
      </div>
      <MainFooter />
    </main>
  )
}

