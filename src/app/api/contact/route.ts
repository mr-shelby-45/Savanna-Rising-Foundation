import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, name, contactName, orgName, email, interest, message } = body

    const subject =
      type === 'volunteer'
        ? `Volunteer enquiry — ${name}`
        : type === 'partner'
          ? `Partnership enquiry — ${orgName}`
          : `General enquiry — ${name}`

    const html =
      type === 'volunteer'
        ? `
        <h2>Volunteer Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Interest:</strong> ${interest || 'Not specified'}</p>
        <p><strong>Message:</strong> ${message || 'None'}</p>
      `
        : type === 'partner'
          ? `
        <h2>Partnership Enquiry</h2>
        <p><strong>Organisation:</strong> ${orgName}</p>
        <p><strong>Contact:</strong> ${contactName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Message:</strong> ${message || 'None'}</p>
      `
          : `
        <h2>General Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message || 'None'}</p>
      `

    const { data, error } = await resend.emails.send({
      // Using Resend's shared testing sender for now since we don't have
      // a verified custom domain yet. Once a real domain is set up and
      // verified in Resend, swap this for e.g.
      // 'Mwenda Kimathi Foundation <noreply@yourdomain.org>'.
      from: 'Mwenda Kimathi Foundation <onboarding@resend.dev>',
      // NOTE: Resend's testing sender can only send to the email address
      // the Resend account was signed up with, until a custom domain is
      // verified. Swap this once that happens.
      to: 'kyrexy6068@gmail.com',
      replyTo: email,
      subject,
      html,
    })

    if (error) {
      // The Resend SDK does NOT throw on failure - it always resolves,
      // returning { data, error }. A previous version of this route never
      // checked `error`, so failed sends (e.g. a 403 from Resend) were
      // silently reported back to the frontend as a success. Always check
      // this explicitly - don't assume "no exception" means "it worked."
      console.error('Resend API error:', error)
      return NextResponse.json({ error: error.message || 'Failed to send' }, { status: 500 })
    }

    console.log('Email sent successfully', { id: data?.id, subject })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}