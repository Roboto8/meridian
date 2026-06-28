import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ALL, bySlug } from '../data/store.js'
import { sectionColor, sectionSlug } from '../data/sections.js'
import HeroImage from '../components/HeroImage.jsx'
import ArticleCard from '../components/ArticleCard.jsx'

export default function Article() {
  const { slug } = useParams()
  const a = bySlug(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (a) document.title = `${a.headline} — The Meridian`
  }, [slug, a])

  if (!a) {
    return (
      <div className="container" style={{ padding: '50px 16px' }}>
        <h2 style={{ fontFamily: 'var(--slab)' }}>Story not found</h2>
        <Link to="/" className="back-link">← Back to The Meridian</Link>
      </div>
    )
  }

  const color = sectionColor(a.section)
  const related = ALL.filter((x) => x.section === a.section && x.id !== a.id).slice(0, 4)
  const mid = Math.max(2, Math.ceil(a.body.length / 2))

  return (
    <div className="pagewrap">
      <article className="article">
        <div className="article__inner">
          <Link to={`/section/${sectionSlug(a.section)}`} className="article__kicker" style={{ color }}>
            {a.section}
          </Link>
          <h1 className="article__title">{a.headline}</h1>
          <p className="article__standfirst">{a.standfirst}</p>
          <div className="article__byline">
            <span><b>{a.byline}</b></span>
            {a.location && <span className="muted">{a.location}</span>}
            <span className="muted">{a.readMins} min read</span>
          </div>
          <div className="article__hero"><HeroImage article={a} label={false} /></div>
          <div className="article__body">
            {a.body.slice(0, mid).map((p, i) => <p key={i}>{p}</p>)}
            {a.pullQuote && (
              <blockquote className="pullquote" style={{ borderColor: color, color }}>
                “{a.pullQuote}”
              </blockquote>
            )}
            {a.body.slice(mid).map((p, i) => <p key={`b${i}`}>{p}</p>)}
          </div>
          <Link to="/" className="back-link">← Back to The Meridian</Link>
        </div>
      </article>

      {related.length > 0 && (
        <div className="container">
          <section className="section-strip" style={{ borderTopColor: color }}>
            <div className="section-strip__head"><h2 style={{ color }}>More {a.section}</h2></div>
            <div className="strip-grid">
              {related.map((r) => <ArticleCard key={r.id} a={r} />)}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
