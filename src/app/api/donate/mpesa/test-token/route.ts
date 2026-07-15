// TEMPORARY — delete this route once we've confirmed getAccessToken() works.
// Not meant to ship; it's just a way to hit our own auth helper from a browser
// or curl without building the full STK Push flow first.

import { NextResponse } from 'next/server'
import { getAccessToken } from '@/lib/mpesa'

export async function GET() {
  try {
    const token = await getAccessToken()
    return NextResponse.json({
      ok: true,
      // Only show the first few characters — no reason to expose the full
      // token in a response body, even on a route we're about to delete.
      tokenPreview: token.slice(0, 12) + '...',
    })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    )
  }
}
