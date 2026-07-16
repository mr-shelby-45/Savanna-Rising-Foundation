// Safaricom Daraja API helpers.
// Sandbox docs: https://developer.safaricom.co.ke/APIs/MpesaExpressSimulate

const MPESA_ENV = process.env.MPESA_ENV === 'production' ? 'production' : 'sandbox'

// Sandbox and production use different base URLs — everything else about
// the API calls is identical.
const BASE_URL =
  MPESA_ENV === 'production'
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke'

/**
 * Fetches a short-lived OAuth access token from Daraja using HTTP Basic Auth
 * (Consumer Key as username, Consumer Secret as password, base64-encoded).
 *
 * This token is required as a Bearer token on every other Daraja API call
 * (like STK Push). It expires after ~1 hour per Safaricom's docs, so we
 * fetch a fresh one per request rather than trying to cache/reuse it —
 * simpler and avoids stale-token bugs, at the cost of one extra API call
 * per donation attempt. Fine for our volume; worth revisiting with caching
 * if donation traffic gets heavy.
 */
export async function getAccessToken(): Promise<string> {
  const consumerKey = process.env.MPESA_CONSUMER_KEY
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET

  if (!consumerKey || !consumerSecret) {
    throw new Error('MPESA_CONSUMER_KEY or MPESA_CONSUMER_SECRET is not set')
  }

  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')

  const res = await fetch(`${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${credentials}`,
    },
    // Never cache an auth token fetch
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Failed to get M-Pesa access token: ${res.status} ${text}`)
  }

  const data = await res.json()
  return data.access_token as string
}

export { BASE_URL as MPESA_BASE_URL }

/**
 * Formats the current time as Safaricom expects: YYYYMMDDHHmmss.
 * Used both in the Password and as the Timestamp field itself — they
 * must match, or Safaricom rejects the request.
 */
function getTimestamp(): string {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    now.getFullYear().toString() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds())
  )
}

/**
 * Converts a phone number to the 2547XXXXXXXX format Safaricom requires.
 * Accepts common variants a user might type: 07XX..., +2547XX..., 2547XX...
 */
export function formatPhoneNumber(raw: string): string {
  const digits = raw.replace(/\D/g, '') // strip spaces, +, dashes etc.

  if (digits.startsWith('254')) return digits
  if (digits.startsWith('0')) return '254' + digits.slice(1)
  if (digits.startsWith('7') || digits.startsWith('1')) return '254' + digits

  throw new Error(`Unrecognized phone number format: ${raw}`)
}

type StkPushParams = {
  phoneNumber: string // already formatted, e.g. 2547XXXXXXXX
  amount: number
  accountReference: string
  transactionDesc: string
}

/**
 * Triggers an STK Push — the PIN prompt sent to the user's phone.
 * This call only confirms Safaricom *accepted* the request; it does not
 * wait for the user to enter their PIN. The actual payment result arrives
 * later via the callback URL we configured.
 */
export async function initiateStkPush({
  phoneNumber,
  amount,
  accountReference,
  transactionDesc,
}: StkPushParams) {
  const shortcode = process.env.MPESA_SHORTCODE
  const passkey = process.env.MPESA_PASSKEY
  const callbackUrl = process.env.MPESA_CALLBACK_URL

  if (!shortcode || !passkey || !callbackUrl) {
    throw new Error('MPESA_SHORTCODE, MPESA_PASSKEY, or MPESA_CALLBACK_URL is not set')
  }

  const timestamp = getTimestamp()
  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64')

  const accessToken = await getAccessToken()

  const res = await fetch(`${BASE_URL}/mpesa/stkpush/v1/processrequest`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.round(amount), // Safaricom expects a whole number
      PartyA: phoneNumber,
      PartyB: shortcode,
      PhoneNumber: phoneNumber,
      CallBackURL: callbackUrl,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc,
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    // Daraja returns errorMessage/errorCode on failure, not a plain HTTP error body
    throw new Error(`STK Push failed: ${data.errorMessage || JSON.stringify(data)}`)
  }

  return data as {
    MerchantRequestID: string
    CheckoutRequestID: string
    ResponseCode: string
    ResponseDescription: string
    CustomerMessage: string
  }
}
