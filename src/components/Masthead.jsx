import { Link, NavLink } from 'react-router-dom'
import { SECTIONS, sectionSlug } from '../data/sections.js'

export default function Masthead() {
  const date = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }).format(new Date())

  return (
    <header>
      <div className="masthead">
        <div className="masthead__inner">
          <div className="masthead__date">{date}</div>
          <Link to="/" className="masthead__brand">The <span>Meridian</span></Link>
          <div className="masthead__cta"><button className="btn-pill">Subscribe</button></div>
        </div>
      </div>
      <nav className="subnav">
        <div className="subnav__inner">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>News</NavLink>
          {SECTIONS.map((s) => (
            <NavLink
              key={s.key}
              to={`/section/${sectionSlug(s.key)}`}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {s.key}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}
