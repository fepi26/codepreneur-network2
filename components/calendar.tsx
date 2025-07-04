"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const events = [
  { date: "2025-02-15", title: "Coding Workshop", description: "Learn the basics of Python" },
  { date: "2025-02-20", title: "Entrepreneurship Seminar", description: "Turning your ideas into reality" },
  { date: "2025-03-05", title: "Hackathon", description: "24-hour coding challenge" },
  { date: "2025-03-15", title: "Tech Talk", description: "AI and the future of education" },
]

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const renderCalendarDays = () => {
    const days = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-800"></div>)
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dateString = date.toISOString().split("T")[0]
      const dayEvents = events.filter((event) => event.date === dateString)
      days.push(
        <div key={day} className="h-24 border border-gray-800 p-1">
          <div className="font-bold">{day}</div>
          {dayEvents.map((event, index) => (
            <div key={index} className="text-xs bg-orange-500 text-white p-1 mt-1 rounded">
              {event.title}
            </div>
          ))}
        </div>,
      )
    }
    return days
  }

  return (
    <div className="bg-zinc-900 rounded-xl p-4 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={prevMonth} variant="ghost" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-bold">
          {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
        </h2>
        <Button onClick={nextMonth} variant="ghost" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
    </div>
  )
}

