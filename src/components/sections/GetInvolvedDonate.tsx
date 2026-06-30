'use client'

import { useState } from 'react'
import styles from './GetInvolvedDonate.module.css'

const amounts = [500, 1000, 2500, 5000]

export default function GetInvolvedDonate() {
  const [selected, setSelected] = useState<number | null>(1000)
  const [custom, setCustom] = useState('')

  return (
    <section className={styles.section} id="donate">
      <div className={styles.inner}>
        <div className={styles.mpesa}>
          <p className={styles.methodLabel}>M-Pesa</p>
          <p className={styles.methodTitle}>Give via Paybill</p>
          <p className={styles.methodDesc}>
            Send any amount directly to our M-Pesa Paybill. Your contribution goes
            straight to programme delivery on the ground.
          </p>
          <div className={styles.paybillBlock}>
            <div className={styles.paybillItem}>
              <p className={styles.paybillLabel}>Paybill number</p>
              <p className={styles.paybillValue}>247247</p>
            </div>
            <div className={styles.paybillDivider} />
            <div className={styles.paybillItem}>
              <p className={styles.paybillLabel}>Account number</p>
              <p className={styles.paybillValue}>Savanna Rising</p>
            </div>
          </div>
          <div className={styles.steps}>
            <p className={styles.stepsLabel}>How to pay</p>
            <ol className={styles.stepsList}>
              <li>Go to M-Pesa on your phone</li>
              <li>Select Lipa na M-Pesa, then Paybill</li>
              <li>Enter business number: <strong>247247</strong></li>
              <li>Account number: <strong>Savanna Rising</strong></li>
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
          <button className={styles.donateBtn}>
            Donate {custom ? `KES ${Number(custom).toLocaleString()}` : selected ? `KES ${selected.toLocaleString()}` : ''} →
          </button>
          <p className={styles.stripeNote}>Secured by Stripe. No card details stored.</p>
        </div>
      </div>
    </section>
  )
}