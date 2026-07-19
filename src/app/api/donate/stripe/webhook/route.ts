import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import type Stripe from 'stripe'

// Force the Node.js runtime (not Edge) - Stripe's SDK needs Node's Buffer
// and crypto APIs for signature verification.
export const runtime = 'nodejs'

// Stripe calls this URL directly (server-to-server), same idea as the
// M-Pesa callback. Unlike M-Pesa, Stripe cryptographically signs each
// webhook request, so we can verify it genuinely came from Stripe rather
// than trusting the URL alone.
//
// IMPORTANT: this needs the *exact raw bytes* of the request body for
// signature verification to work. We read it via arrayBuffer() -> Buffer
// rather than req.text() - reading as a string first can introduce
// encoding/normalization differences (this was observed under Next.js's
// Turbopack dev server specifically) that silently break the byte-for-byte
// signature match, even though the content looks identical when logged.

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  const rawBody = Buffer.from(await req.arrayBuffer())
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    // This throws if the signature doesn't match - i.e. the request
    // wasn't actually from Stripe, or the body was tampered with.
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    console.log('Stripe payment SUCCESS', {
      sessionId: session.id,
      // Stripe reports amounts in the smallest currency subunit (e.g.
      // 500000 = KES 5,000). Logging both so this doesn't misread as an
      // actual amount discrepancy.
      amountTotalSubunits: session.amount_total,
      amount: session.amount_total != null ? session.amount_total / 100 : null,
      currency: session.currency,
      customerEmail: session.customer_details?.email,
    })
    // TODO: once we decide to persist donations, this is where we'd
    // write a record (e.g. to Sanity) using the fields above.
  } else {
    // Other event types exist (e.g. payment_intent.payment_failed) - we're
    // only listening for the one we need right now.
    console.log('Stripe webhook received (unhandled type):', event.type)
  }

  // Stripe expects a 200 to acknowledge receipt - same as M-Pesa, it will
  // retry if we don't respond, or respond with an error/timeout.
  return NextResponse.json({ received: true })
}
