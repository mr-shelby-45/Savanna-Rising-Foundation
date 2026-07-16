import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import type Stripe from 'stripe'

// Stripe calls this URL directly (server-to-server), same idea as the
// M-Pesa callback. Unlike M-Pesa, Stripe cryptographically signs each
// webhook request, so we can verify it genuinely came from Stripe rather
// than trusting the URL alone.
//
// IMPORTANT: this requires the raw request body (not JSON-parsed) for
// signature verification to work - see req.text() below instead of
// req.json().

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  const rawBody = await req.text()
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
      amountTotal: session.amount_total, // in smallest currency unit
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
