"use client"

import { useState, useEffect } from "react"

interface YouTubePlayerProps {
  videoId: string
  title?: string
  className?: string
}

export function YouTubePlayer({ videoId, title = "YouTube video player", className = "" }: YouTubePlayerProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    // Return a placeholder during server-side rendering
    return (
      <div
        className={`relative w-full aspect-video bg-gray-200 animate-pulse flex items-center justify-center ${className}`}
        aria-label={`Loading ${title}`}
      >
        <span className="sr-only">Loading video player</span>
      </div>
    )
  }

  return (
    <div className={`relative w-full aspect-video ${className}`}>
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

