import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, name, contactName, orgName, email, interest, message } = body

    const isVolunteer = type === 'volunteer'
    const subject = isVolunteer
      ? `Volunteer enquiry — ${name}`
      : `Partnership enquiry — ${orgName}`

    const html = isVolunteer
      ? `
        <h2>Volunteer Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Interest:</strong> ${interest || 'Not specified'}</p>
        <p><strong>Message:</strong> ${message || 'None'}</p>
      `
      : `
        <h2>Partnership Enquiry</h2>
        <p><strong>Organisation:</strong> ${orgName}</p>
        <p><strong>Contact:</strong> ${contactName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Message:</strong> ${message || 'None'}</p>
      `

    await resend.emails.send({
      from: 'Savanna Rising Website <noreply@savannarising.org>',
      to: 'hello@savannarising.org',
      replyTo: email,
      subject,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}