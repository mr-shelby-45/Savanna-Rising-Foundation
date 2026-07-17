'use client'

import { useState } from 'react'
import styles from './GetInvolvedDonate.module.css'

const amounts = [500, 1000, 2500, 5000]

type MpesaStatus = 'idle' | 'loading' | 'success' | 'error'

export default function GetInvolvedDonate() {
  const [selected, setSelected] = useState<number | null>(1000)
  const [custom, setCustom] = useState('')

  const [mpesaSelected, setMpesaSelected] = useState<number | null>(500)
  const [mpesaCustom, setMpesaCustom] = useState('')
  const [phone, setPhone] = useState('')
  const [mpesaStatus, setMpesaStatus] = useState<MpesaStatus>('idle')
  const [mpesaMessage, setMpesaMessage] = useState('')

  const [stripeStatus, setStripeStatus] = useState<MpesaStatus>('idle')
  const [stripeMessage, setStripeMessage] = useState('')

  const mpesaAmount = mpesaCustom ? Number(mpesaCustom) : mpesaSelected
  const stripeAmount = custom ? Number(custom) : selected

  async function handleStripePay() {
    if (!stripeAmount) return

    setStripeStatus('loading')
    setStripeMessage('')

    try {
      const res = await fetch('/api/donate/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: stripeAmount }),
      })
      const data = await res.json()

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      // Redirect the browser to Stripe's hosted checkout page
      window.location.href = data.url
    } catch (err) {
      setStripeStatus('error')
      setStripeMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  async function handleMpesaPay() {
    if (!phone || !mpesaAmount) return

    setMpesaStatus('loading')
    setMpesaMessage('')

    try {
      const res = await fetch('/api/donate/mpesa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: phone, amount: mpesaAmount }),
      })
      const data = await res.json()

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      setMpesaStatus('success')
      setMpesaMessage(data.customerMessage || 'Check your phone to complete the payment.')
    } catch (err) {
      setMpesaStatus('error')
      setMpesaMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <section className={styles.section} id="donate">
      <div className={styles.inner}>
        <div className={styles.mpesa}>
          <p className={styles.methodLabel}>M-Pesa</p>
          <p className={styles.methodTitle}>Give via M-Pesa</p>
          <p className={styles.methodDesc}>
            Enter your number and amount below — we'll send a payment prompt straight to
            your phone. Or use the Paybill manually if you prefer.
          </p>

          <div className={styles.amounts}>
            {amounts.map(a => (
              <button
                key={a}
                className={`${styles.amountBtn} ${mpesaSelected === a && !mpesaCustom ? styles.amountActive : ''}`}
                onClick={() => { setMpesaSelected(a); setMpesaCustom('') }}
              >
                KES {a.toLocaleString()}
              </button>
            ))}
          </div>
          <div className={styles.customRow}>
            <label className={styles.customLabel}>Or enter amount (KES)</label>
            <input
              type="number"
              className={styles.customInput}
              placeholder="e.g. 3000"
              value={mpesaCustom}
              onChange={e => { setMpesaCustom(e.target.value); setMpesaSelected(null) }}
              min={1}
            />
          </div>
          <div className={styles.customRow}>
            <label className={styles.customLabel}>M-Pesa phone number</label>
            <input
              type="tel"
              className={styles.customInput}
              placeholder="e.g. 0712345678"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>

          <button
            className={styles.donateBtn}
            onClick={handleMpesaPay}
            disabled={!phone || !mpesaAmount || mpesaStatus === 'loading'}
          >
            {mpesaStatus === 'loading'
              ? 'Sending prompt…'
              : `Pay ${mpesaAmount ? `KES ${mpesaAmount.toLocaleString()}` : ''} with M-Pesa →`}
          </button>

          {mpesaMessage && (
            <p
              className={
                mpesaStatus === 'error' ? styles.mpesaStatusError : styles.mpesaStatusSuccess
              }
            >
              {mpesaMessage}
            </p>
          )}

          <div className={styles.paybillBlock}>
            <div className={styles.paybillItem}>
              <p className={styles.paybillLabel}>Paybill number</p>
              <p className={styles.paybillValue}>247247</p>
            </div>
            <div className={styles.paybillDivider} />
            <div className={styles.paybillItem}>
              <p className={styles.paybillLabel}>Account number</p>
              <p className={styles.paybillValue}>Mwenda Kimathi Foundation</p>
            </div>
          </div>
          <div className={styles.steps}>
            <p className={styles.stepsLabel}>Prefer to pay manually?</p>
            <ol className={styles.stepsList}>
              <li>Go to M-Pesa on your phone</li>
              <li>Select Lipa na M-Pesa, then Paybill</li>
              <li>Enter business number: <strong>247247</strong></li>
              <li>Account number: <strong>Mwenda Kimathi Foundation</strong></li>
              <li>Enter amount and your M-Pesa PIN</li>
            </ol>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.stripe}>
          <p className={styles.methodLabel}>International</p>
          <p className={styles.methodTitle}>Give by card</p>
          <p className={styles.methodDesc}>
            Donate securely by card. All major cards accepted. Receipts sent automatically
            to your email.
          </p>
          <div className={styles.amounts}>
            {amounts.map(a => (
              <button
                key={a}
                className={`${styles.amountBtn} ${selected === a && !custom ? styles.amountActive : ''}`}
                onClick={() => { setSelected(a); setCustom('') }}
              >
                KES {a.toLocaleString()}
              </button>
            ))}
          </div>
          <div className={styles.customRow}>
            <label className={styles.customLabel}>Or enter amount (KES)</label>
            <input
              type="number"
              className={styles.customInput}
              placeholder="e.g. 3000"
              value={custom}
              onChange={e => { setCustom(e.target.value); setSelected(null) }}
              min={100}
            />
          </div>
          <button
            className={styles.donateBtn}
            onClick={handleStripePay}
            disabled={!stripeAmount || stripeStatus === 'loading'}
          >
            {stripeStatus === 'loading'
              ? 'Redirecting…'
              : `Donate ${stripeAmount ? `KES ${stripeAmount.toLocaleString()}` : ''} →`}
          </button>
          {stripeMessage && <p className={styles.mpesaStatusError}>{stripeMessage}</p>}
          <p className={styles.stripeNote}>Secured by Stripe. No card details stored.</p>
        </div>
      </div>
    </section>
  )
}