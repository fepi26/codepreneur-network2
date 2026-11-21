"use client"

import { useEffect } from "react"
import { Instagram } from "lucide-react"

// ---------------------------------------------------------------------------
// HOW TO ADD POSTS
// On Instagram, open a post, tap the three dots (...), choose "Copy link",
// then paste it below inside quotation marks, followed by a comma.
// Example:  "https://www.instagram.com/p/AbCdEfGhIjK/",
// Posts appear in the grid in the order listed. Delete or add lines freely.
// ---------------------------------------------------------------------------
const INSTAGRAM_POST_URLS: string[] = [
  // "https://www.instagram.com/p/XXXXXXXXXXX/",
]

const PROFILE_URL = "https://www.instagram.com/codepreneur.network/"
const SCRIPT_ID = "instagram-embed-script"

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } }
  }
}

export function InstagramFeed() {
  useEffect(() => {
    if (INSTAGRAM_POST_URLS.length === 0) return

    // If Instagram's script is already on the page, just re-scan for posts.
    if (window.instgrm) {
      window.instgrm.Embeds.process()
      return
    }
    // If it is still loading, it will scan the page by itself when it finishes.
    if (document.getElementById(SCRIPT_ID)) return

    const script = document.createElement("script")
    script.id = SCRIPT_ID
    script.src = "https://www.instagram.com/embed.js"
    script.async = true
    script.onload = () => window.instgrm?.Embeds.process()
    document.body.appendChild(script)
  }, [])

  return (
    <section className="mt-28">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Follow Us on Instagram</h2>
        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <Instagram className="w-5 h-5" />
          @codepreneur.network
        </a>
      </div>

      {INSTAGRAM_POST_URLS.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INSTAGRAM_POST_URLS.map((url) => (
            <div
              key={url}
              className="overflow-hidden rounded-2xl bg-zinc-900/50 border border-white/10 backdrop-blur-sm p-3"
            >
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{
                  background: "#FFF",
                  border: 0,
                  borderRadius: 12,
                  margin: 0,
                  maxWidth: "100%",
                  minWidth: 0,
                  padding: 0,
                  width: "100%",
                }}
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 text-sm text-gray-700"
                >
                  View this post on Instagram
                </a>
              </blockquote>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-md mx-auto rounded-2xl bg-zinc-900/50 border border-white/10 backdrop-blur-sm p-8 text-center">
          <Instagram className="w-10 h-10 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-400 mb-6">See our latest posts and updates on Instagram.</p>
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
          >
            Follow on Instagram
          </a>
        </div>
      )}
    </section>
  )
}
