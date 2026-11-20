import { NextResponse } from "next/server"
import {
  FELLOWSHIP_DAYS,
  FELLOWSHIP_TRACKS,
  MAX_RESUME_BYTES,
  RESUME_EXTENSIONS,
  WORD_LIMITS,
  countWords,
} from "@/lib/fellowship"

export const runtime = "nodejs"

// Where applications are delivered.
const TO_EMAIL = "codepreneurntwrk@gmail.com"

// "onboarding@resend.dev" is Resend's built-in test sender. It can only deliver
// to the email address that owns the Resend account (see setup notes).
// Once you verify your own domain in Resend, change this to e.g.
// "Codepreneur Applications <apply@yourdomain.org>".
const FROM_EMAIL = "Codepreneur Applications <onboarding@resend.dev>"

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

// Read a text field: trim it and cap its length.
function text(value: FormDataEntryValue | null, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : ""
}

// Same, but for one-line fields (removes line breaks).
function line(value: FormDataEntryValue | null, max: number) {
  return text(value, max).replace(/[\r\n]+/g, " ")
}

function bad(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status })
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set")
    return bad("The application form is not configured yet. Please email us directly.", 500)
  }

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return bad("We couldn't read your submission. Please try again.")
  }

  // Hidden "honeypot" field: real people never fill it in, bots usually do.
  // Pretend it worked so bots don't learn anything.
  if (line(form.get("website"), 200)) {
    return NextResponse.json({ ok: true })
  }

  const fullName = line(form.get("fullName"), 120)
  const email = line(form.get("email"), 200)
  const phone = line(form.get("phone"), 40)
  const track = line(form.get("track"), 100)
  const days = form
    .getAll("days")
    .filter((d): d is string => typeof d === "string" && (FELLOWSHIP_DAYS as readonly string[]).includes(d))
  const interest = text(form.get("interest"), 4000)
  const experience = text(form.get("experience"), 8000)
  const project = text(form.get("project"), 8000)

  if (!fullName) return bad("Please enter your full name.")
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad("Please enter a valid email address.")
  if (phone.replace(/\D/g, "").length < 7) return bad("Please enter a valid phone number.")
  if (days.length === 0) return bad("Please select at least one day you are available.")
  if (!(FELLOWSHIP_TRACKS as readonly string[]).includes(track)) return bad("Please select a track.")
  if (!interest || !experience || !project) return bad("Please answer all of the written questions.")
  if (
    countWords(interest) > WORD_LIMITS.interest ||
    countWords(experience) > WORD_LIMITS.experience ||
    countWords(project) > WORD_LIMITS.project
  ) {
    return bad("One of your answers is over the word limit.")
  }

  // Optional resume
  const attachments: { filename: string; content: string }[] = []
  const resume = form.get("resume")
  if (resume instanceof File && resume.size > 0) {
    const lowerName = resume.name.toLowerCase()
    if (!RESUME_EXTENSIONS.some((ext) => lowerName.endsWith(ext))) {
      return bad("Please upload your resume as a PDF or Word document.")
    }
    if (resume.size > MAX_RESUME_BYTES) {
      return bad("Your resume is larger than 3 MB. Please upload a smaller file.")
    }
    const bytes = Buffer.from(await resume.arrayBuffer())
    attachments.push({
      filename: resume.name.replace(/[^\w.\- ]/g, "_"),
      content: bytes.toString("base64"),
    })
  }

  const rows: [string, string][] = [
    ["Full name", fullName],
    ["Email", email],
    ["Phone", phone],
    ["Available days", days.join(", ")],
    ["Track", track],
    ["What draws you to Codepreneur Network?", interest],
    ["Leadership positions, projects, or experiences", experience],
    ["Project you would pursue as a fellow", project],
    ["Resume", attachments.length ? "Attached to this email" : "Not provided"],
  ]

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#111;max-width:680px">
      <h2 style="margin:0 0 16px">New Fellowship Application</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:10px 12px;background:#f4f4f5;font-weight:600;vertical-align:top;width:210px;border-bottom:1px solid #e4e4e7">${escapeHtml(label)}</td>
            <td style="padding:10px 12px;white-space:pre-wrap;border-bottom:1px solid #e4e4e7">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join("")}
      </table>
      <p style="color:#71717a;font-size:12px;margin-top:16px">Reply to this email to respond directly to the applicant.</p>
    </div>`

  const plain = rows.map(([label, value]) => `${label}:\n${value}`).join("\n\n")

  let response: Response
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New Fellowship Application: ${fullName} (${track})`,
        html,
        text: plain,
        ...(attachments.length ? { attachments } : {}),
      }),
    })
  } catch (error) {
    console.error("Could not reach Resend:", error)
    return bad("We couldn't send your application right now. Please try again.", 502)
  }

  if (!response.ok) {
    console.error("Resend rejected the email:", response.status, await response.text())
    return bad("We couldn't send your application right now. Please try again.", 502)
  }

  return NextResponse.json({ ok: true })
}