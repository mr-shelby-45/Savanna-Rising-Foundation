import { NextRequest, NextResponse } from 'next/server'

// Safaricom calls this URL directly (no auth header) once the user has
// either entered their PIN or cancelled/timed out. This does NOT run in
// the browser - it's a server-to-server webhook from Safaricom's side.
//
// IMPORTANT: this endpoint is publicly reachable by design (Safaricom has
// no way to authenticate itself to us here). We are not storing or
// crediting anything based on this data yet, so that's acceptable for now.
// If this later writes donation records, add verification - e.g. check
// the CheckoutRequestID matches one we actually initiated and haven't
// already processed, to guard against replayed/forged callbacks.

type MpesaCallbackItem = {
  Name: string
  Value?: string | number
}

type MpesaCallbackBody = {
  Body: {
    stkCallback: {
      MerchantRequestID: string
      CheckoutRequestID: string
      ResultCode: number
      ResultDesc: string
      CallbackMetadata?: {
        Item: MpesaCallbackItem[]
      }
    }
  }
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as MpesaCallbackBody
  const { stkCallback } = body.Body

  const { CheckoutRequestID, ResultCode, ResultDesc } = stkCallback

  if (ResultCode === 0) {
    // Success - flatten the CallbackMetadata array into a plain object
    // for easier reading. Fields present: Amount, MpesaReceiptNumber,
    // TransactionDate, PhoneNumber.
    const metadata: Record<string, string | number> = {}
    stkCallback.CallbackMetadata?.Item.forEach((item) => {
      if (item.Value !== undefined) metadata[item.Name] = item.Value
    })

    console.log('M-Pesa payment SUCCESS', {
      checkoutRequestId: CheckoutRequestID,
      ...metadata,
    })
    // TODO: once we decide to persist donations, this is where we'd
    // write a record (e.g. to Sanity) using metadata.MpesaReceiptNumber,
    // metadata.Amount, metadata.PhoneNumber.
  } else {
    // Failure - common ResultCodes: 1032 (user cancelled), 1037 (timeout)
    console.log('M-Pesa payment FAILED', {
      checkoutRequestId: CheckoutRequestID,
      resultCode: ResultCode,
      resultDesc: ResultDesc,
    })
  }

  // Safaricom expects a 200 response acknowledging receipt - if we don't
  // send one (or take too long), it will retry the callback.
  return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' })
}
