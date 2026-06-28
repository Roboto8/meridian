import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ALL, bySectionSlug } from '../data/store.js'
import { sectionBySlug, sectionColor } from '../data/sections.js'
import ArticleCard from '../components/ArticleCard.jsx'
import InfiniteFeed from '../components/InfiniteFeed.jsx'

export default function Section() {
  const { slug } = useParams()
  const name = sectionBySlug(slug) || 'Section'
  const arts = bySectionSlug(slug)
  const color = sectionColor(name)

  useEffect(() => { document.title = `${name} — The Meridian`; window.scrollTo(0, 0) }, [slug, name])

  const lead = arts.find((a) => a.isLead) || arts[0]
  const rest = arts.filter((a) => a !== lead)

  return (
    <div className="pagewrap">
      <div className="container">
        <section className="section-strip" style={{ borderTopColor: color, marginTop: 0 }}>
          <div className="section-strip__head"><h2 style={{ color }}>{name}</h2></div>
        </section>

        {lead && (
          <div className="grid-top">
            <ArticleCard a={lead} variant="card--hero" />
            <div className="rail">
              {rest.slice(0, 2).map((a) => <ArticleCard key={a.id} a={a} variant="card--feature" />)}
            </div>
            <div className="rail">
              {rest.slice(2, 6).map((a) => <ArticleCard key={a.id} a={a} variant="card--list" />)}
            </div>
          </div>
        )}

        {/* feed pulls from everything so the doom-scroll stays varied (a 4-story
            section would otherwise loop) */}
        <InfiniteFeed pool={ALL} title="More from The Meridian" />
      </div>
    </div>
  )
}
