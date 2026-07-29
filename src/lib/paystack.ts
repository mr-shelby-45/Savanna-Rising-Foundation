import crypto from 'crypto'

const PAYSTACK_BASE_URL = 'https://api.paystack.co'

function getSecretKey(): string {
  const key = process.env.PAYSTACK_SECRET_KEY
  if (!key) {
    throw new Error('PAYSTACK_SECRET_KEY is not set')
  }
  return key
}

export type DonationCurrency = 'KES' | 'USD'

interface InitializeTransactionParams {
  email: string
  amount: number // major unit (e.g. KES 500, USD 20) - converted to subunit below
  currency: DonationCurrency
  reference?: string
}

interface InitializeTransactionResponse {
  status: boolean
  message: string
  data: {
    authorization_url: string
    access_code: string
    reference: string
  }
}

/**
 * Starts a Paystack transaction and returns a hosted checkout URL.
 * Paystack decides available channels (card, M-Pesa, etc.) based on the
 * currency passed here - KES unlocks M-Pesa, USD is card-only.
 */
export async function initializeTransaction({
  email,
  amount,
  currency,
  reference,
}: InitializeTransactionParams): Promise<InitializeTransactionResponse['data']> {
  // Paystack expects the smallest currency subunit (e.g. cents, or for KES
  // it's still whole-number "cents" i.e. amount * 100).
  const amountInSubunit = Math.round(amount * 100)

  const res = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getSecretKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      amount: amountInSubunit,
      currency,
      reference,
      callback_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/get-involved?donation=success`,
    }),
  })

  const json = (await res.json()) as InitializeTransactionResponse

  if (!res.ok || !json.status) {
    throw new Error(json.message || 'Failed to initialize Paystack transaction')
  }

  return json.data
}

interface VerifyTransactionResponse {
  status: boolean
  message: string
  data: {
    status: 'success' | 'failed' | 'abandoned'
    reference: string
    amount: number
    currency: string
    customer: { email: string }
  }
}

/**
 * Confirms a transaction's true status directly with Paystack rather than
 * trusting the client redirect alone (the redirect can be spoofed/interrupted -
 * this is the source of truth).
 */
export async function verifyTransaction(
  reference: string
): Promise<VerifyTransactionResponse['data']> {
  const res = await fetch(
    `${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: { Authorization: `Bearer ${getSecretKey()}` },
    }
  )

  const json = (await res.json()) as VerifyTransactionResponse

  if (!res.ok || !json.status) {
    throw new Error(json.message || 'Failed to verify Paystack transaction')
  }

  return json.data
}

/**
 * Paystack doesn't issue a separate webhook signing secret like Stripe does -
 * it signs the raw request body with your PAYSTACK_SECRET_KEY (HMAC SHA512).
 * Verify against that same key, using timing-safe comparison.
 */
export function verifyWebhookSignature(rawBody: string, signatureHeader: string | null): boolean {
  if (!signatureHeader) return false

  const expected = crypto.createHmac('sha512', getSecretKey()).update(rawBody).digest('hex')

  const expectedBuf = Buffer.from(expected, 'utf8')
  const receivedBuf = Buffer.from(signatureHeader, 'utf8')

  if (expectedBuf.length !== receivedBuf.length) return false

  return crypto.timingSafeEqual(expectedBuf, receivedBuf)
}
