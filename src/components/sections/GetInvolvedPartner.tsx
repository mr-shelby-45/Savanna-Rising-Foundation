'use client'

import { useState } from 'react'
import styles from './GetInvolvedPartner.module.css'

const partnerTypes = [
  'Corporate sponsor',
  'County government',
  'NGO / development organisation',
  'School or university',
  'Sports federation',
  'Media partner',
  'Other',
]

export default function GetInvolvedPartner() {
  const [form, setForm] = useState({
    orgName: '', contactName: '', email: '', type: '', message: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async () => {
    if (!form.orgName || !form.email || !form.contactName) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'partner' }),
      })
      if (res.ok) setStatus('sent')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <section className={styles.section} id="partner">
        <div className={styles.confirmation}>
          <p className={styles.confirmLabel}>Received</p>
          <p className={styles.confirmTitle}>Thank you, {form.contactName}.</p>
          <p className={styles.confirmBody}>
            Someone from our team will be in touch within five working days to explore
            what a partnership with {form.orgName} could look like.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.section} id="partner">
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.label}>Partner with us</p>
          <h2 className={styles.title}>Build something that lasts.</h2>
          <p className={styles.desc}>
            We work with organisations that are serious about community impact — corporates,
            county governments, NGOs, schools, and sports federations. If you see your work
            in ours, we want to hear from you.
          </p>
          <div className={styles.whatWeOffer}>
            <p className={styles.offerLabel}>What partnership looks like</p>
            <ul className={styles.offerList}>
              <li>Co-branded programmes and events</li>
              <li>Grant co-application and joint funding</li>
              <li>Staff volunteering and engagement days</li>
              <li>Impact reporting and documentation</li>
              <li>Named conservation or cultural projects</li>
            </ul>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Organisation name</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Your organisation"
              value={form.orgName}
              onChange={e => setForm({ ...form, orgName: e.target.value })}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Your name</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Contact person"
              value={form.contactName}
              onChange={e => setForm({ ...form, contactName: e.target.value })}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Email address</label>
            <input
              className={styles.input}
              type="email"
              placeholder="you@organisation.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Organisation type</label>
            <select
              className={styles.select}
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
            >
              <option value="">Select one</option>
              {partnerTypes.map((t, i) => (
                <option key={i} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Tell us about the partnership you have in mind</label>
            <textarea
              className={styles.textarea}
              placeholder="What are you hoping to build together?"
              rows={5}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Send enquiry →'}
          </button>
          {status === 'error' && (
            <p className={styles.errorMsg}>Something went wrong. Please try again or email us directly.</p>
          )}
        </div>
      </div>
    </section>
  )
}