import Stripe from 'stripe'

const secretKey = process.env.STRIPE_SECRET_KEY

if (!secretKey) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

// A single shared Stripe client instance. The SDK handles auth (via the
// secret key), retries, and request signing for us - unlike the M-Pesa
// integration where we had to build all of that by hand.
export const stripe = new Stripe(secretKey, {
  apiVersion: '2026-06-24.dahlia',
})

type CreateCheckoutSessionParams = {
  amount: number // in whole currency units, e.g. 2500 for KES 2,500
  currency?: string
}

/**
 * Creates a Stripe Checkout Session for a one-off donation.
 * Returns a URL - the frontend redirects the browser there, and Stripe
 * hosts the actual payment page. We never see or touch card details.
 */
export async function createCheckoutSession({
  amount,
  currency = 'kes',
}: CreateCheckoutSessionParams) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (!siteUrl) {
    throw new Error('NEXT_PUBLIC_SITE_URL is not set')
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency,
          product_data: {
            name: 'Donation to Mwenda Kimathi Foundation',
          },
          // Stripe expects the smallest currency unit (cents-equivalent).
          // KES doesn't really have subunits in practice, but Stripe still
          // expects amount * 100 for consistency across currencies.
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    success_url: `${siteUrl}/get-involved?donation=success`,
    cancel_url: `${siteUrl}/get-involved?donation=cancelled`,
  })

  return session
}
