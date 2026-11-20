// Shared settings for the fellowship application form.
// Both the form (browser) and the email route (server) read from here,
// so changing a track, a day or a word limit in one place updates both.

export const FELLOWSHIP_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const

export const FELLOWSHIP_TRACKS = [
  "Program Development",
  "Partnerships & Growth",
  "Marketing & Communications",
] as const

// Maximum words allowed in each long answer.
export const WORD_LIMITS = {
  interest: 100,
  experience: 250,
  project: 250,
} as const

// Resume upload rules. Keep the size at or below ~3 MB because
// Vercel rejects requests larger than about 4.5 MB.
export const MAX_RESUME_BYTES = 3 * 1024 * 1024
export const RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"] as const

export function countWords(text: string): number {
  const trimmed = text.trim()
  return trimmed ? trimmed.split(/\s+/).length : 0
}