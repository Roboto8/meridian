import { Link } from 'react-router-dom'
import { sectionColor } from '../data/sections.js'
import { readWord } from '../data/store.js'
import HeroImage from './HeroImage.jsx'

// variant: '' | 'card--hero' | 'card--feature' | 'card--list'
export default function ArticleCard({ a, variant = '', image = true, standfirst }) {
  const color = sectionColor(a.section)
  const opinion = (a.section || '').trim().toLowerCase() === 'opinion'
  const to = `/article/${a.slug}`

  if (variant === 'card--list') {
    return (
      <Link to={to} className={`card card--list${opinion ? ' card--opinion' : ''}`}>
        <HeroImage article={a} label={false} />
        <div>
          <p className="kicker" style={{ color }}>{a.kicker || a.section}</p>
          <h3 className="headline">{a.headline}</h3>
          <p className="meta"><span>{a.byline}</span></p>
        </div>
      </Link>
    )
  }

  const showStandfirst = standfirst ?? (variant === 'card--hero' || variant === 'card--feature')
  return (
    <Link to={to} className={`card ${variant}${opinion ? ' card--opinion' : ''}`}>
      {image && <HeroImage article={a} tall={variant === 'card--hero'} />}
      <p className="kicker" style={{ color }}>{a.kicker || a.section}</p>
      <h3 className="headline">{a.headline}</h3>
      {showStandfirst && a.standfirst && <p className="standfirst">{a.standfirst}</p>}
      <p className="meta">
        <span>{a.byline}</span>
        <span className="dot">{readWord(a.readMins)}</span>
      </p>
    </Link>
  )
}
