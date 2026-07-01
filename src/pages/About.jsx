import React from 'react'

const team = [
  { name: 'Shaury Patil', role: 'Founder & CEO', emoji: '👨‍💼' },
  {name: 'Aarya Patil', role: 'Founder & CEO', emoji: '👨‍💼' },
]

export default function About() {
  return (
    <main className="page-wrap">
      <div className="container" style={{ maxWidth: 1200 }}>
        <div className="hero-card glass" style={{ marginBottom: 36, maxWidth: 'none' }}>
          <span className="section-tag">Our story</span>
          <h1 style={{ fontSize: 'clamp(26px,4vw,38px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', marginBottom: 12 }}>
            Built for those who want the best.
          </h1>
          <p style={{ maxWidth: '70ch' }}>
            Volta was founded in 2020 on a simple idea: premium electronics shouldn't come with compromises.
            Too many people were forced to choose between quality and affordability, or between trustworthy
            service and a good deal. We built Volta to close that gap — a marketplace where buyers get
            genuine, carefully vetted electronics at fair prices, and sellers get a platform that actually
            works for them.
          </p>
          <p style={{ maxWidth: '70ch', marginTop: 12 }}>
            From a small idea, Volta has grown into a destination for laptops, smartphones, audio gear,
            wearables, and more, serving tens of thousands of customers who expect more from where they shop.
            Every product on Volta is backed by our commitment to trust, transparency, and service that
            doesn't disappear after checkout.
          </p>
        </div>

        <div className="trust-grid" style={{ marginBottom: 36 }}>
          <div className="trust-item glass"><strong style={{ fontSize: 26 }}>4+</strong><p>Years in Business</p></div>
          <div className="trust-item glass"><strong style={{ fontSize: 26 }}>200+</strong><p>Products</p></div>
          <div className="trust-item glass"><strong style={{ fontSize: 26 }}>50K+</strong><p>Orders Delivered</p></div>
          <div className="trust-item glass"><strong style={{ fontSize: 26 }}>4.9★</strong><p>Avg. Rating</p></div>
        </div>

        <span className="section-tag">The team</span>
        <h2 className="section-title" style={{ marginBottom: 24 }}>Meet the Team</h2>
        <div className="cat-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', maxWidth: 460 }}>
          {team.map(m => (
            <div className="cat-card glass" key={m.name} style={{ padding: '28px 12px' }}>
              <span style={{ fontSize: 32 }}>{m.emoji}</span>
              <p className="cat-name">{m.name}</p>
              <p style={{ fontSize: 11, color: 'var(--muted)' }}>{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
