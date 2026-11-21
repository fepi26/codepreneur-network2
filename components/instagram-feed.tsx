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
"https://www.instagram.com/p/DNy2_VlXq9i/?utm_source=ig_web_copy_link&gwpx=MzRlODBiNWFlZA==&avpt=MzRlODBiNWFlZA==", "https://www.instagram.com/p/Dd9-4siD4Yv/?utm_source=ig_web_copy_link&knvt=MzRlODBiNWFlZA==&avpt=MzRlODBiNWFlZA==", "https://www.instagram.com/p/DSban2Cjcmt/?utm_source=ig_web_copy_link&evlk=MzRlODBiNWFlZA==&avpt=MzRlODBiNWFlZA=="
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
        <div className="mx-auto max-w-lg">
          {/* Shows our latest public posts straight from Instagram (no links needed). */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white">
            <iframe
              src="https://www.instagram.com/codepreneur.network/embed"
              title="Codepreneur Network on Instagram"
              className="h-[640px] w-full border-0"
              loading="lazy"
              scrolling="yes"
            />
          </div>
          <div className="mt-6 text-center">
            <a
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
            >
              <Instagram className="h-4 w-4" />
              Follow on Instagram
            </a>
          </div>
        </div>
      )}
    </section>
  )
}