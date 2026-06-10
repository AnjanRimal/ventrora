import React, { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const up = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handle = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="contact">

      {/* HERO */}
      <section className="contact__hero">
        <span className="eyebrow" style={{ color: '#C4A882' }}>Get in Touch</span>
        <h1 className="section-title light">Contact <em>Us</em></h1>
        <p>We'd love to hear from you. Reach out for any inquiries, wholesale, or partnerships.</p>
      </section>

      <div className="contact__body">
        <div className="container">
          <div className="contact__grid">

            {/* LEFT — Info */}
            <div className="contact__info">
              <div className="contact__info-block">
                <span className="contact__info-icon">✉</span>
                <h3 className="contact__info-title">Email Us</h3>
                <p>hello@ventrora.com</p>
                <p>support@ventrora.com</p>
              </div>
              <div className="contact__info-block">
                <span className="contact__info-icon">◎</span>
                <h3 className="contact__info-title">Follow Us</h3>
                <div className="contact__socials">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
                  <a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
                </div>
              </div>
              <div className="contact__info-block">
                <span className="contact__info-icon">◈</span>
                <h3 className="contact__info-title">Business Inquiries</h3>
                <p>For wholesale, partnerships, or press inquiries please email us at hello@ventrora.com and we'll get back to you within 24 hours.</p>
              </div>
              <div className="contact__info-block">
                <span className="contact__info-icon">◇</span>
                <h3 className="contact__info-title">Response Time</h3>
                <p>We respond to all inquiries within 24–48 hours Monday through Friday.</p>
              </div>
            </div>

            {/* RIGHT — Form */}
            <div className="contact__form-wrap">
              <h2 className="contact__form-title">Send a Message</h2>

              {sent ? (
                <div className="contact__success">
                  <span className="contact__success-icon">✓</span>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button className="btn btn-dark" onClick={() => setSent(false)}>Send Another</button>
                </div>
              ) : (
                <form className="contact__form" onSubmit={handle}>
                  <div className="contact__row">
                    <div className="form-field">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text" required className="form-input"
                        placeholder="Your name"
                        value={form.name} onChange={e => up('name', e.target.value)}
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email" required className="form-input"
                        placeholder="you@example.com"
                        value={form.email} onChange={e => up('email', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-field">
                    <label className="form-label">Subject</label>
                    <select
                      className="form-input"
                      value={form.subject} onChange={e => up('subject', e.target.value)}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Order Support">Order Support</option>
                      <option value="Wholesale">Wholesale & Bulk Orders</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Press">Press & Media</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label className="form-label">Message</label>
                    <textarea
                      required className="form-input contact__textarea"
                      placeholder="Tell us how we can help..."
                      rows={6}
                      value={form.message} onChange={e => up('message', e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-dark contact__submit">
                    Send Message →
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}
