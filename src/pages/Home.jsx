import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ALL, leads, bySectionKey } from '../data/store.js'
import { SECTIONS, sectionSlug } from '../data/sections.js'
import ArticleCard from '../components/ArticleCard.jsx'
import InfiniteFeed from '../components/InfiniteFeed.jsx'

export default function Home() {
  useEffect(() => { document.title = 'The Meridian — News, sport and opinion' }, [])

  const lead = leads()[0] || ALL[0]
  const used = new Set([lead.id])
  const take = (n) => ALL.filter((a) => !used.has(a.id)).slice(0, n).map((a) => (used.add(a.id), a))
  const feats = take(2)
  const rail = take(4)

  return (
    <div className="pagewrap">
      <div className="container">
        <div className="grid-top">
          <ArticleCard a={lead} variant="card--hero" />
          <div className="rail">
            {feats.map((a) => <ArticleCard key={a.id} a={a} variant="card--feature" />)}
          </div>
          <div className="rail">
            {rail.map((a) => <ArticleCard key={a.id} a={a} variant="card--list" />)}
          </div>
        </div>

        {SECTIONS.map((s) => {
          const arts = bySectionKey(s.key)
          if (!arts.length) return null
          return (
            <section key={s.key} className="section-strip" style={{ borderTopColor: s.color }}>
              <div className="section-strip__head">
                <h2 style={{ color: s.color }}>{s.key}</h2>
                <Link to={`/section/${sectionSlug(s.key)}`}>See all →</Link>
              </div>
              <div className="strip-grid">
                {arts.slice(0, 4).map((a) => <ArticleCard key={a.id} a={a} />)}
              </div>
            </section>
          )
        })}

        <InfiniteFeed pool={ALL} />
      </div>
    </div>
  )
}
