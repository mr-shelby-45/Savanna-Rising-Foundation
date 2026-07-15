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
