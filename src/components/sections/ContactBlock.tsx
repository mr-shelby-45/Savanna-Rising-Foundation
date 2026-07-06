'use client'

import { useState } from 'react'
import styles from './ContactBlock.module.css'

const details = [
  { label: 'Email', value: 'hello@savannarising.org', href: 'mailto:hello@savannarising.org' },
  { label: 'Phone', value: '+254 700 000 000', href: 'tel:+254700000000' },
  { label: 'Address', value: 'Nakuru, Kenya', href: null },
]

const social = [
  { label: 'Instagram', href: 'https://www.instagram.com/mwendakimathifoundation?igsh=MTJnamliNDB1ZXhkdA==' },
  { label: 'Twitter / X', href: 'https://twitter.com/savannarising' },
  { label: 'Facebook', href: 'https://facebook.com/savannarising' },
]

export default function ContactBlock() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'general' }),
      })
      if (res.ok) setStatus('sent')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.details}>
          <div className={styles.detailsGroup}>
            {details.map((d, i) => (
              <div key={i} className={styles.detail}>
                <p className={styles.detailLabel}>{d.label}</p>
                {d.href ? (
                  <a href={d.href} className={styles.detailValue}>{d.value}</a>
                ) : (
                  <p className={styles.detailValue}>{d.value}</p>
                )}
              </div>
            ))}
          </div>

          <div className={styles.socialGroup}>
            <p className={styles.detailLabel}>Follow the work</p>
            <div className={styles.socialLinks}>
              {social.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label} →
                </a>
              ))}
            </div>
          </div>

          <div className={styles.note}>
            <p className={styles.noteText}>
              For volunteer and partnership enquiries, please use the dedicated forms on the
              <a href="/get-involved"> Get Involved</a> page. We respond to all general
              enquiries within three working days.
            </p>
          </div>
        </div>

        <div className={styles.form}>
          {status === 'sent' ? (
            <div className={styles.confirmation}>
              <p className={styles.confirmLabel}>Sent</p>
              <p className={styles.confirmTitle}>Thank you, {form.name}.</p>
              <p className={styles.confirmBody}>
                We have received your message and will be in touch within three working days.
              </p>
            </div>
          ) : (
            <>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Your name</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Full name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Email address</label>
                <input
                  className={styles.input}
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Message</label>
                <textarea
                  className={styles.textarea}
                  placeholder="What would you like to say?"
                  rows={6}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <button
                className={styles.submitBtn}
                onClick={handleSubmit}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending...' : 'Send message →'}
              </button>
              {status === 'error' && (
                <p className={styles.errorMsg}>
                  Something went wrong. Please email us directly at hello@savannarising.org
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}