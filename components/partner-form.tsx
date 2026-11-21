"use client"

import { useState } from "react"
import type { FormEvent, ReactNode } from "react"
import Link from "next/link"
import { CheckCircle2, Loader2, Send } from "lucide-react"
import {
  ORG_TYPES,
  PARTNERSHIP_TYPES,
  PARTNER_WORD_LIMITS,
  STUDENT_COUNTS,
  STUDENT_GROUPS,
  TIMELINES,
  countWords,
} from "@/lib/partnership"

type FieldKey =
  | "orgName"
  | "orgType"
  | "contactName"
  | "email"
  | "phone"
  | "groups"
  | "studentCount"
  | "students"
  | "goals"
  | "partnershipTypes"
  | "timeline"
  | "other"
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
  id: string
  htmlFor?: string
  label: string
  required?: boolean
  hint?: string
  error?: string
  counter?: ReactNode
  children: ReactNode
}) {
  const content = (
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
            {content}
          </label>
        ) : (
          <span id={`${id}-label`} className={labelClass}>
            {content}
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

export function PartnerForm() {
  const [orgName, setOrgName] = useState("")
  const [orgType, setOrgType] = useState("")
  const [orgWebsite, setOrgWebsite] = useState("")
  const [location, setLocation] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactRole, setContactRole] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [groups, setGroups] = useState<string[]>([])
  const [studentCount, setStudentCount] = useState("")
  const [students, setStudents] = useState("")
  const [goals, setGoals] = useState("")
  const [partnershipTypes, setPartnershipTypes] = useState<string[]>([])
  const [timeline, setTimeline] = useState("")
  const [other, setOther] = useState("")
  const [trap, setTrap] = useState("") // honeypot: must stay empty
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>("idle")
  const [serverError, setServerError] = useState("")

  const clearError = (key: FieldKey) => setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))

  const fieldClass = (key: FieldKey) =>
    `${baseField} ${
      errors[key]
        ? "border-red-500/60 focus:border-red-400 focus:ring-red-500/30"
        : "border-white/10 focus:border-indigo-400/60 focus:ring-indigo-500/30"
    }`

  const toggle = (list: string[], setList: (v: string[]) => void, value: string, key: FieldKey) => {
    clearError(key)
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  const validate = (): Errors => {
    const next: Errors = {}
    if (!orgName.trim()) next.orgName = "Please enter the name of your organization."
    if (!orgType) next.orgType = "Please select an organization type."
    if (!contactName.trim()) next.contactName = "Please enter a contact name."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Please enter a valid email address."
    if (phone.replace(/\D/g, "").length < 7) next.phone = "Please enter a valid phone number."
    if (groups.length === 0) next.groups = "Please select at least one group."
    if (!studentCount) next.studentCount = "Please select an option."
    if (!students.trim()) next.students = "Please answer this question."
    else if (countWords(students) > PARTNER_WORD_LIMITS.students)
      next.students = `Please keep your answer to ${PARTNER_WORD_LIMITS.students} words or fewer.`
    if (!goals.trim()) next.goals = "Please answer this question."
    else if (countWords(goals) > PARTNER_WORD_LIMITS.goals)
      next.goals = `Please keep your answer to ${PARTNER_WORD_LIMITS.goals} words or fewer.`
    if (partnershipTypes.length === 0) next.partnershipTypes = "Please select at least one option."
    if (!timeline) next.timeline = "Please select a timeline."
    if (countWords(other) > PARTNER_WORD_LIMITS.other)
      next.other = `Please keep your answer to ${PARTNER_WORD_LIMITS.other} words or fewer.`
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
    body.append("orgName", orgName.trim())
    body.append("orgType", orgType)
    body.append("orgWebsite", orgWebsite.trim())
    body.append("location", location.trim())
    body.append("contactName", contactName.trim())
    body.append("contactRole", contactRole.trim())
    body.append("email", email.trim())
    body.append("phone", phone.trim())
    groups.forEach((g) => body.append("groups", g))
    body.append("studentCount", studentCount)
    body.append("students", students.trim())
    body.append("goals", goals.trim())
    partnershipTypes.forEach((t) => body.append("partnershipTypes", t))
    body.append("timeline", timeline)
    body.append("other", other.trim())
    body.append("company_url", trap)

    try {
      const response = await fetch("/api/partner", { method: "POST", body })
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
          Thank you, {orgName.trim()}. We&apos;ve got your partnership application and will be in touch at{" "}
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

  const chips = (
    name: string,
    options: readonly string[],
    selected: string[],
    onToggle: (v: string) => void,
    cols: string,
    type: "checkbox" | "radio" = "checkbox",
  ) => (
    <div role={type === "radio" ? "radiogroup" : "group"} aria-labelledby={`${name}-label`} className={`grid gap-2 ${cols}`}>
      {options.map((option) => (
        <label key={option} className="cursor-pointer">
          <input
            type={type}
            name={name}
            className="peer sr-only"
            checked={selected.includes(option)}
            onChange={() => onToggle(option)}
          />
          <span className={chip}>{option}</span>
        </label>
      ))}
    </div>
  )

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-8 rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl md:p-10"
    >
      <div className="grid gap-8 md:grid-cols-2">
        <div className="md:col-span-2">
          <Field id="orgName" htmlFor="orgName" label="Name of Organization" required error={errors.orgName}>
            <input
              id="orgName"
              type="text"
              autoComplete="organization"
              value={orgName}
              onChange={(e) => {
                setOrgName(e.target.value)
                clearError("orgName")
              }}
              placeholder="Your organization's name"
              aria-invalid={!!errors.orgName}
              className={fieldClass("orgName")}
            />
          </Field>
        </div>

        <div className="md:col-span-2">
          <Field id="orgType" label="Type of Organization" required error={errors.orgType}>
            {chips(
              "orgType",
              ORG_TYPES,
              orgType ? [orgType] : [],
              (v) => {
                setOrgType(v)
                clearError("orgType")
              },
              "sm:grid-cols-2 md:grid-cols-3",
              "radio",
            )}
          </Field>
        </div>

        <Field id="orgWebsite" htmlFor="orgWebsite" label="Website (optional)">
          <input
            id="orgWebsite"
            type="url"
            inputMode="url"
            autoComplete="url"
            value={orgWebsite}
            onChange={(e) => setOrgWebsite(e.target.value)}
            placeholder="https://yourorganization.org"
            className={`${baseField} border-white/10 focus:border-indigo-400/60 focus:ring-indigo-500/30`}
          />
        </Field>

        <Field id="location" htmlFor="location" label="City / Country (optional)">
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Miami, FL, USA"
            className={`${baseField} border-white/10 focus:border-indigo-400/60 focus:ring-indigo-500/30`}
          />
        </Field>

        <Field id="contactName" htmlFor="contactName" label="Contact Person" required error={errors.contactName}>
          <input
            id="contactName"
            type="text"
            autoComplete="name"
            value={contactName}
            onChange={(e) => {
              setContactName(e.target.value)
              clearError("contactName")
            }}
            placeholder="Full name"
            aria-invalid={!!errors.contactName}
            className={fieldClass("contactName")}
          />
        </Field>

        <Field id="contactRole" htmlFor="contactRole" label="Role / Title (optional)">
          <input
            id="contactRole"
            type="text"
            autoComplete="organization-title"
            value={contactRole}
            onChange={(e) => setContactRole(e.target.value)}
            placeholder="Program Director"
            className={`${baseField} border-white/10 focus:border-indigo-400/60 focus:ring-indigo-500/30`}
          />
        </Field>

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
            placeholder="you@organization.org"
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

      <Field id="groups" label="What type of students does your organization work with?" required error={errors.groups}>
        {chips(
          "groups",
          STUDENT_GROUPS,
          groups,
          (v) => toggle(groups, setGroups, v, "groups"),
          "sm:grid-cols-2 md:grid-cols-3",
        )}
      </Field>

      <Field id="studentCount" label="About how many students does your organization serve?" required error={errors.studentCount}>
        {chips(
          "studentCount",
          STUDENT_COUNTS,
          studentCount ? [studentCount] : [],
          (v) => {
            setStudentCount(v)
            clearError("studentCount")
          },
          "grid-cols-2 sm:grid-cols-4",
          "radio",
        )}
      </Field>

      <Field
        id="students"
        htmlFor="students"
        label="Tell us about the students you work with (backgrounds, needs, communities served)."
        required
        error={errors.students}
        counter={wordCounter(students, PARTNER_WORD_LIMITS.students)}
      >
        <textarea
          id="students"
          rows={5}
          value={students}
          onChange={(e) => {
            setStudents(e.target.value)
            clearError("students")
          }}
          placeholder="Write your response here..."
          aria-invalid={!!errors.students}
          className={`${fieldClass("students")} resize-y`}
        />
      </Field>

      <Field
        id="goals"
        htmlFor="goals"
        label="What are your main goals in integrating our education into your programs?"
        required
        error={errors.goals}
        counter={wordCounter(goals, PARTNER_WORD_LIMITS.goals)}
      >
        <textarea
          id="goals"
          rows={7}
          value={goals}
          onChange={(e) => {
            setGoals(e.target.value)
            clearError("goals")
          }}
          placeholder="Write your response here..."
          aria-invalid={!!errors.goals}
          className={`${fieldClass("goals")} resize-y`}
        />
      </Field>

      <Field id="partnershipTypes" label="How would you like to partner with us?" required error={errors.partnershipTypes}>
        {chips(
          "partnershipTypes",
          PARTNERSHIP_TYPES,
          partnershipTypes,
          (v) => toggle(partnershipTypes, setPartnershipTypes, v, "partnershipTypes"),
          "sm:grid-cols-2 md:grid-cols-3",
        )}
      </Field>

      <Field id="timeline" label="When would you like to get started?" required error={errors.timeline}>
        {chips(
          "timeline",
          TIMELINES,
          timeline ? [timeline] : [],
          (v) => {
            setTimeline(v)
            clearError("timeline")
          },
          "grid-cols-2 sm:grid-cols-4",
          "radio",
        )}
      </Field>

      <Field
        id="other"
        htmlFor="other"
        label="Is there anything else you'd like us to know, or any questions for us? (optional)"
        error={errors.other}
        counter={wordCounter(other, PARTNER_WORD_LIMITS.other)}
      >
        <textarea
          id="other"
          rows={4}
          value={other}
          onChange={(e) => {
            setOther(e.target.value)
            clearError("other")
          }}
          placeholder="Write your response here..."
          aria-invalid={!!errors.other}
          className={`${fieldClass("other")} resize-y`}
        />
      </Field>

      {/* Honeypot field: hidden from people, bots tend to fill it in. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_url">Company URL</label>
        <input
          id="company_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
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
            Submit partnership application
          </>
        )}
      </button>
    </form>
  )
}