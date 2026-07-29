'use client'

import { useState } from 'react'
import styles from './GetInvolvedDonate.module.css'

type Currency = 'KES' | 'USD'

const PRESETS: Record<Currency, number[]> = {
  KES: [500, 1000, 2500, 5000],
  USD: [10, 25, 50, 100],
}

export default function GetInvolvedDonate() {
  const [currency, setCurrency] = useState<Currency>('KES')
  const [amount, setAmount] = useState<number>(PRESETS.KES[1])
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleCurrencyChange(next: Currency) {
    setCurrency(next)
    setAmount(PRESETS[next][1])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!email) {
      setError('Please enter your email so we can send a receipt.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/donate/paystack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, amount, currency }),
      })
      const data = await res.json()

      if (!data.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setLoading(false)
        return
      }

      window.location.href = data.url
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <section className={styles.section} id="donate">
      <div className={styles.wrapper}>
        <p className={styles.methodLabel}>Donate</p>
        <h2 className={styles.title}>Support our work</h2>
        <p className={styles.desc}>
          Give locally via M-Pesa or from anywhere internationally by card — both are handled
          securely through Paystack.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.currencyToggle}>
            <button
              type="button"
              className={currency === 'KES' ? styles.currencyActive : styles.currencyBtn}
              onClick={() => handleCurrencyChange('KES')}
            >
              Kenya (M-Pesa / Card) · KES
            </button>
            <button
              type="button"
              className={currency === 'USD' ? styles.currencyActive : styles.currencyBtn}
              onClick={() => handleCurrencyChange('USD')}
            >
              International (Card) · USD
            </button>
          </div>

          <div className={styles.presets}>
            {PRESETS[currency].map((preset) => (
              <button
                type="button"
                key={preset}
                className={amount === preset ? styles.presetActive : styles.presetBtn}
                onClick={() => setAmount(preset)}
              >
                {currency} {preset.toLocaleString()}
              </button>
            ))}
          </div>

          <label className={styles.fieldLabel} htmlFor="donate-amount">
            Amount ({currency})
          </label>
          <input
            id="donate-amount"
            className={styles.input}
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />

          <label className={styles.fieldLabel} htmlFor="donate-email">
            Email (for your receipt)
          </label>
          <input
            id="donate-email"
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Redirecting…' : `Donate ${currency} ${amount.toLocaleString()}`}
          </button>
        </form>

        <p className={styles.smallPrint}>
          Payments are processed securely by Paystack. We don't store your card or M-Pesa
          details.
        </p>
      </div>
    </section>
  )
}
