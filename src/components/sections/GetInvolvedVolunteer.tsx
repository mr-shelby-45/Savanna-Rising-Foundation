'use client'

import { useState } from 'react'
import styles from './GetInvolvedVolunteer.module.css'

const interests = [
  'Coaching & sport delivery',
  'Environmental conservation',
  'Cultural programmes',
  'Administration & operations',
  'Photography & documentation',
  'Fundraising & partnerships',
]

export default function GetInvolvedVolunteer() {
  const [form, setForm] = useState({ name: '', email: '', interest: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async () => {
    if (!form.name || !form.email) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'volunteer' }),
      })
      if (res.ok) setStatus('sent')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <section className={styles.section} id="volunteer">
        <div className={styles.confirmation}>
          <p className={styles.confirmLabel}>Received</p>
          <p className={styles.confirmTitle}>Thank you, {form.name}.</p>
          <p className={styles.confirmBody}>
            We will be in touch within a few days. In the meantime, follow our work on
            the news page — there may already be something you can join this season.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.section} id="volunteer">
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.label}>Volunteer</p>
          <h2 className={styles.title}>Show up for the game.</h2>
          <p className={styles.desc}>
            We run on people who care. Whether you coach, document, organise, or simply
            show up on match day — there is a role for you. Tell us a little about yourself
            and what you are interested in. We will take it from there.
          </p>
          <div className={styles.tags}>
            {interests.map((item, i) => (
              <span key={i} className={styles.tag}>{item}</span>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Full name</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Your name"
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
            <label className={styles.fieldLabel}>Area of interest</label>
            <select
              className={styles.select}
              value={form.interest}
              onChange={e => setForm({ ...form, interest: e.target.value })}
            >
              <option value="">Select one</option>
              {interests.map((item, i) => (
                <option key={i} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Anything else you want us to know</label>
            <textarea
              className={styles.textarea}
              placeholder="Optional"
              rows={4}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Submit →'}
          </button>
          {status === 'error' && (
            <p className={styles.errorMsg}>Something went wrong. Please try again or email us directly.</p>
          )}
        </div>
      </div>
    </section>
  )
}