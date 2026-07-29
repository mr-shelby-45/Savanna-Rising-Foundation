import { NextRequest, NextResponse } from 'next/server'
import { verifyWebhookSignature, verifyTransaction } from '@/lib/paystack'

export async function POST(req: NextRequest) {
  // Must read the raw text body (not req.json()) since the signature is
  // computed over the exact raw bytes Paystack sent.
  const rawBody = await req.text()
  const signature = req.headers.get('x-paystack-signature')

  if (!verifyWebhookSignature(rawBody, signature)) {
    console.error('Paystack webhook: invalid signature')
    return NextResponse.json({ ok: false, error: 'Invalid signature' }, { status: 401 })
  }

  const event = JSON.parse(rawBody)

  if (event.event === 'charge.success') {
    const { reference } = event.data

    try {
      // Don't trust the webhook payload's amount/status alone - re-verify
      // directly against Paystack's API as the source of truth.
      const verified = await verifyTransaction(reference)

      if (verified.status === 'success') {
        // TODO: persist the donation (amount, currency, donor email, reference)
        // once there's a datastore for this - Sanity or a proper DB.
        console.log('Donation confirmed:', {
          reference: verified.reference,
          amount: verified.amount / 100,
          currency: verified.currency,
          email: verified.customer.email,
        })
      }
    } catch (err) {
      console.error('Paystack webhook verification error:', err)
      return NextResponse.json({ ok: false }, { status: 500 })
    }
  }

  // Always 200 on anything we don't explicitly reject, so Paystack doesn't
  // retry-storm us over event types we don't care about yet.
  return NextResponse.json({ ok: true })
}
