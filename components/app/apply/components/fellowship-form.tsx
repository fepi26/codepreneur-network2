"use client"

import { useRef, useState } from "react"
import type { ChangeEvent, FormEvent, ReactNode } from "react"
import Link from "next/link"
import { CheckCircle2, FileText, Loader2, Send, Upload, X } from "lucide-react"
import {
  FELLOWSHIP_DAYS,
  FELLOWSHIP_TRACKS,
  MAX_RESUME_BYTES,
  RESUME_EXTENSIONS,
  WORD_LIMITS,
  countWords,
} from "@/lib/fellowship"

type FieldKey =
  | "fullName"
  | "email"
  | "phone"
  | "days"
  | "track"
  | "interest"
  | "experience"
  | "project"
  | "resume"
type Errors = Partial<Record<FieldKey, string>>
type Status = "idle" | "submitting" | "success" | "error"

const baseField =
  "w-full rounded-xl border bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:ring-2"

const chip =
  "flex items-center justify-center rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-center text-sm text-gray-300 transition hover:border-white/30 peer-checked:border-indigo-400/60 peer-checked:bg-indigo-500/15 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-400/60"

function Field({
  id,
  htmlFor,
  label,
  required,
  hint,
  error,
  counter,
  children,
}: {
  id: FieldKey
  htmlFor?: string
  label: string
  required?: boolean
  hint?: string
  error?: string
  counter?: ReactNode
  children: ReactNode
}) {
  const labelContent = (
    <>
      {label}
      {required && <span className="ml-1 text-red-400">*</span>}
    </>
  )
  const labelClass = "text-sm font-medium text-gray-200"

  return (
    <div id={`field-${id}`} className="scroll-mt-32 space-y-2">
      <div className="flex items-baseline justify-between gap-4">
        {htmlFor ? (
          <label htmlFor={htmlFor} id={`${id}-label`} className={labelClass}>
            {labelContent}
          </label>
        ) : (
          <span id={`${id}-label`} className={labelClass}>
            {labelContent}
          </span>
        )}
        {counter}
      </div>
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
      {children}
      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

export function FellowshipForm() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [days, setDays] = useState<string[]>([])
  const [track, setTrack] = useState("")
  const [interest, setInterest] = useState("")
  const [experience, setExperience] = useState("")
  const [project, setProject] = useState("")
  const [resume, setResume] = useState<File | null>(null)
  const [website, setWebsite] = useState("") // honeypot: must stay empty
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>("idle")
  const [serverError, setServerError] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  const clearError = (key: FieldKey) =>
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))

  const fieldClass = (key: FieldKey) =>
    `${baseField} ${
      errors[key]
        ? "border-red-500/60 focus:border-red-400 focus:ring-red-500/30"
        : "border-white/10 focus:border-indigo-400/60 focus:ring-indigo-500/30"
    }`

  const toggleDay = (day: string) => {
    clearError("days")
    setDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
  }

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const lowerName = file.name.toLowerCase()
    if (!RESUME_EXTENSIONS.some((ext) => lowerName.endsWith(ext))) {
      setErrors((prev) => ({ ...prev, resume: "Please upload a PDF or Word document." }))
      event.target.value = ""
      return
    }
    if (file.size > MAX_RESUME_BYTES) {
      setErrors((prev) => ({ ...prev, resume: "That file is larger than 3 MB." }))
      event.target.value = ""
      return
    }
    clearError("resume")
    setResume(file)
  }

  const removeFile = () => {
    setResume(null)
    clearError("resume")
    if (fileRef.current) fileRef.current.value = ""
  }

  const validate = (): Errors => {
    const next: Errors = {}
    if (!fullName.trim()) next.fullName = "Please enter your full name."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Please enter a valid email address."
    if (phone.replace(/\D/g, "").length < 7) next.phone = "Please enter a valid phone number."
    if (days.length === 0) next.days = "Please select at least one day."
    if (!track) next.track = "Please select a track."
    if (!interest.trim()) next.interest = "Please answer this question."
    else if (countWords(interest) > WORD_LIMITS.interest)
      next.interest = `Please keep your answer to ${WORD_LIMITS.interest} words or fewer.`
    if (!experience.trim()) next.experience = "Please answer this question."
    else if (countWords(experience) > WORD_LIMITS.experience)
      next.experience = `Please keep your answer to ${WORD_LIMITS.experience} words or fewer.`
    if (!project.trim()) next.project = "Please answer this question."
    else if (countWords(project) > WORD_LIMITS.project)
      next.project = `Please keep your answer to ${WORD_LIMITS.project} words or fewer.`
    if (errors.resume) next.resume = errors.resume
    return next
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === "submitting") return

    const nextErrors = validate()
    setErrors(nextErrors)
    const firstError = (Object.keys(nextErrors) as FieldKey[]).find((key) => nextErrors[key])
    if (firstError) {
      document.getElementById(`field-${firstError}`)?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }

    setStatus("submitting")
    setServerError("")

    const body = new FormData()
    body.append("fullName", fullName.trim())
    body.append("email", email.trim())
    body.append("phone", phone.trim())
    days.forEach((day) => body.append("days", day))
    body.append("track", track)
    body.append("interest", interest.trim())
    body.append("experience", experience.trim())
    body.append("project", project.trim())
    body.append("website", website)
    if (resume) body.append("resume", resume)

    try {
      const response = await fetch("/api/apply", { method: "POST", body })
      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error ?? "Something went wrong. Please try again.")
      }
      setStatus("success")
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Something went wrong. Please try again.")
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-8 text-center backdrop-blur-xl md:p-12">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-indigo-400" />
        <h2 className="mb-2 text-2xl font-bold text-white">Application received!</h2>
        <p className="mx-auto mb-8 max-w-md text-gray-400">
          Thank you, {fullName.trim().split(/\s+/)[0]}. We&apos;ve got your application and will be in touch at{" "}
          <span className="text-gray-200">{email.trim()}</span>.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
        >
          Back to home
        </Link>
      </div>
    )
  }

  const wordCounter = (value: string, limit: number) => {
    const words = countWords(value)
    return (
      <span className={`shrink-0 text-xs ${words > limit ? "text-red-400" : "text-gray-500"}`}>
        {words} / {limit} words
      </span>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-8 rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl md:p-10"
    >
      <div className="grid gap-8 md:grid-cols-2">
        <div className="md:col-span-2">
          <Field id="fullName" htmlFor="fullName" label="Full Name" required error={errors.fullName}>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value)
                clearError("fullName")
              }}
              placeholder="Your full name"
              aria-invalid={!!errors.fullName}
              className={fieldClass("fullName")}
            />
          </Field>
        </div>

        <Field id="email" htmlFor="email" label="Email Address" required error={errors.email}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              clearError("email")
            }}
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            className={fieldClass("email")}
          />
        </Field>

        <Field id="phone" htmlFor="phone" label="Phone Number" required error={errors.phone}>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value)
              clearError("phone")
            }}
            placeholder="(305) 555-0123"
            aria-invalid={!!errors.phone}
            className={fieldClass("phone")}
          />
        </Field>
      </div>

      <Field
        id="days"
        label="Please select the days of the week you are generally available."
        required
        error={errors.days}
      >
        <div role="group" aria-labelledby="days-label" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {FELLOWSHIP_DAYS.map((day) => (
            <label key={day} className="cursor-pointer">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={days.includes(day)}
                onChange={() => toggleDay(day)}
              />
              <span className={chip}>{day}</span>
            </label>
          ))}
        </div>
      </Field>

      <Field id="track" label="Please select the track you are interested in applying for." required error={errors.track}>
        <div role="radiogroup" aria-labelledby="track-label" className="grid gap-2 sm:grid-cols-3">
          {FELLOWSHIP_TRACKS.map((option) => (
            <label key={option} className="cursor-pointer">
              <input
                type="radio"
                name="track"
                className="peer sr-only"
                checked={track === option}
                onChange={() => {
                  setTrack(option)
                  clearError("track")
                }}
              />
              <span className={chip}>{option}</span>
            </label>
          ))}
        </div>
      </Field>

      <Field
        id="interest"
        htmlFor="interest"
        label="What aspect in particular of Codepreneur Network draws your interest in applying to this fellowship?"
        required
        error={errors.interest}
        counter={wordCounter(interest, WORD_LIMITS.interest)}
      >
        <textarea
          id="interest"
          rows={5}
          value={interest}
          onChange={(e) => {
            setInterest(e.target.value)
            clearError("interest")
          }}
          placeholder="Write your response here..."
          aria-invalid={!!errors.interest}
          className={`${fieldClass("interest")} resize-y`}
        />
      </Field>

      <Field
        id="experience"
        htmlFor="experience"
        label="Please describe any leadership positions, projects, or experiences you have held that are relevant to this fellowship."
        required
        error={errors.experience}
        counter={wordCounter(experience, WORD_LIMITS.experience)}
      >
        <textarea
          id="experience"
          rows={7}
          value={experience}
          onChange={(e) => {
            setExperience(e.target.value)
            clearError("experience")
          }}
          placeholder="Write your response here..."
          aria-invalid={!!errors.experience}
          className={`${fieldClass("experience")} resize-y`}
        />
      </Field>

      <Field
        id="project"
        htmlFor="project"
        label="If selected, what is one project or contribution you would like to pursue during your fellowship?"
        required
        error={errors.project}
        counter={wordCounter(project, WORD_LIMITS.project)}
      >
        <textarea
          id="project"
          rows={7}
          value={project}
          onChange={(e) => {
            setProject(e.target.value)
            clearError("project")
          }}
          placeholder="Write your response here..."
          aria-invalid={!!errors.project}
          className={`${fieldClass("project")} resize-y`}
        />
      </Field>

      <Field
        id="resume"
        htmlFor="resume"
        label="Please upload your resume (Optional)."
        hint="PDF or Word document, up to 3 MB."
        error={errors.resume}
      >
        <input
          ref={fileRef}
          id="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFile}
          className="sr-only"
        />
        {resume ? (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-3">
            <span className="flex min-w-0 items-center gap-2 text-sm text-gray-200">
              <FileText className="h-4 w-4 shrink-0 text-indigo-300" />
              <span className="truncate">{resume.name}</span>
            </span>
            <button
              type="button"
              onClick={removeFile}
              aria-label="Remove file"
              className="rounded-md p-1 text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label
            htmlFor="resume"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-black/30 px-4 py-6 text-sm text-gray-400 transition hover:border-white/40 hover:text-white"
          >
            <Upload className="h-4 w-4" />
            Choose a file
          </label>
        )}
      </Field>

      {/* Honeypot field: hidden from people, bots tend to fill it in. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {status === "error" && (
        <div role="alert" className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {serverError} If the problem continues, email us at codepreneurntwrk@gmail.com.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Submit application
          </>
        )}
      </button>
    </form>
  )
}