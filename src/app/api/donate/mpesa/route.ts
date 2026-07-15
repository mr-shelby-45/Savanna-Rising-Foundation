import { NextRequest, NextResponse } from 'next/server'
import { initiateStkPush, formatPhoneNumber } from '@/lib/mpesa'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { phoneNumber, amount } = body

    if (!phoneNumber || !amount) {
      return NextResponse.json(
        { ok: false, error: 'phoneNumber and amount are required' },
        { status: 400 }
      )
    }

    if (Number(amount) < 1) {
      return NextResponse.json(
        { ok: false, error: 'Amount must be greater than 0' },
        { status: 400 }
      )
    }

    const formattedPhone = formatPhoneNumber(phoneNumber)

    const result = await initiateStkPush({
      phoneNumber: formattedPhone,
      amount: Number(amount),
      accountReference: 'Mwenda Kimathi Foundation',
      transactionDesc: 'Donation',
    })

    return NextResponse.json({
      ok: true,
      checkoutRequestId: result.CheckoutRequestID,
      customerMessage: result.CustomerMessage,
    })
  } catch (err) {
    console.error('M-Pesa STK Push error:', err)
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Something went wrong' },
      { status: 500 }
    )
  }
}
