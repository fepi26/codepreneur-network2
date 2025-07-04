"use client"

import { Button } from "@/components/ui/button"
import { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"
import type React from "react"

interface ScheduleButtonProps {
  className?: string
  children: React.ReactNode
}

export function ScheduleButton({ className, children }: ScheduleButtonProps) {
  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi()
      cal("ui", {
        styles: { branding: { brandColor: "#ff0000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      })
    })()
  }, [])

  const handleClick = () => {
    const cal = window.Cal
    if (cal) {
      cal("showModal", { calLink: "visible-ai/30min" })
    }
  }

  return (
    <Button variant="secondary" className={`bg-red-600 text-white hover:bg-red-700 ${className}`} onClick={handleClick}>
      {children}
    </Button>
  )
}

