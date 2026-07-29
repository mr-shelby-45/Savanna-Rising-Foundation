import { NextRequest, NextResponse } from 'next/server'
import { initializeTransaction, type DonationCurrency } from '@/lib/paystack'

const ALLOWED_CURRENCIES: DonationCurrency[] = ['KES', 'USD']

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, amount, currency } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ ok: false, error: 'A valid email is required' }, { status: 400 })
    }

    if (!amount || Number(amount) < 1) {
      return NextResponse.json(
        { ok: false, error: 'A valid amount is required' },
        { status: 400 }
      )
    }

    if (!ALLOWED_CURRENCIES.includes(currency)) {
      return NextResponse.json(
        { ok: false, error: 'Currency must be KES or USD' },
        { status: 400 }
      )
    }

    const data = await initializeTransaction({
      email,
      amount: Number(amount),
      currency,
    })

    return NextResponse.json({ ok: true, url: data.authorization_url })
  } catch (err) {
    console.error('Paystack initialize error:', err)

    const message = err instanceof Error ? err.message : 'Something went wrong'

    // Paystack returns this exact message when a currency hasn't been
    // enabled on the merchant account (e.g. USD not yet activated
    // alongside the default KES). Surface a stable code so the frontend
    // can disable that currency going forward rather than fragile string
    // matching on our error copy.
    const code = /currency not supported/i.test(message) ? 'currency_not_supported' : undefined

    return NextResponse.json({ ok: false, error: message, code }, { status: 500 })
  }
}
