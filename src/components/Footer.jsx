import { Link } from 'react-router-dom'
import { SECTIONS, sectionSlug } from '../data/sections.js'

const COLS = [
  { h: 'News', items: ['World', 'US Politics', 'Environment', 'Business', 'Science'] },
  { h: 'Culture', items: ['Film', 'Music', 'Books', 'Television', 'Art'] },
  { h: 'The Meridian', items: ['About us', 'Contact', 'Careers', 'Editorial code', 'Complaints'] },
  { h: 'Support us', items: ['Subscribe', 'Newsletters', 'Apps', 'Advertise', 'Donate'] },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__cols">
          {COLS.map((c) => (
            <div key={c.h}>
              <h4>{c.h}</h4>
              <ul>
                {c.items.map((it) => {
                  const sec = SECTIONS.find((s) => s.key === it)
                  return (
                    <li key={it}>
                      {sec ? <Link to={`/section/${sectionSlug(it)}`}>{it}</Link> : <span>{it}</span>}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer__brand">The <span>Meridian</span></div>
        <div className="footer__legal">
          © {new Date().getFullYear()} The Meridian. Independent journalism, supported by readers. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
