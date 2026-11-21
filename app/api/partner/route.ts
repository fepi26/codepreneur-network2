// Shared settings for the partnership application form.
// The form (browser) and the email route (server) both read from here.

export const ORG_TYPES = [
  "School / District",
  "Nonprofit / Community Organization",
  "University / College",
  "Company / Corporate",
  "Government Agency",
  "Other",
] as const

export const STUDENT_GROUPS = [
  "Elementary (K-5)",
  "Middle School (6-8)",
  "High School (9-12)",
  "College / University",
  "Out-of-school / Adult learners",
] as const

export const PARTNERSHIP_TYPES = [
  "Offer your curriculum to our students",
  "Workshops or guest sessions",
  "Mentorship",
  "Co-host events or programs",
  "Funding or sponsorship",
  "Other",
] as const

export const TIMELINES = ["As soon as possible", "Within 3 months", "Within 6 months", "Just exploring"] as const

export const STUDENT_COUNTS = ["Under 25", "25-100", "100-500", "500+"] as const

// Maximum words allowed in each long answer.
export const PARTNER_WORD_LIMITS = {
  students: 150,
  goals: 250,
  other: 200,
} as const

export function countWords(text: string): number {
  const trimmed = text.trim()
  return trimmed ? trimmed.split(/\s+/).length : 0
}