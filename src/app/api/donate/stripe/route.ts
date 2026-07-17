import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { amount } = body

    if (!amount || Number(amount) < 1) {
      return NextResponse.json(
        { ok: false, error: 'A valid amount is required' },
        { status: 400 }
      )
    }

    const session = await createCheckoutSession({ amount: Number(amount) })

    return NextResponse.json({ ok: true, url: session.url })
  } catch (err) {
    console.error('Stripe Checkout Session error:', err)
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Something went wrong' },
      { status: 500 }
    )
  }
}
