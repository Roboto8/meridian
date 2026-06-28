import { useEffect, useRef, useState, useCallback } from 'react'
import { feedPage } from '../data/store.js'
import ArticleCard from './ArticleCard.jsx'

// The endless "doom-scroll" feed: an IntersectionObserver watches a sentinel and
// keeps appending freshly-reshuffled pages, so the feed never runs dry on phones.
export default function InfiniteFeed({ pool, title = 'More from The Meridian' }) {
  const [items, setItems] = useState(() => feedPage(0, 9, pool))
  const pageRef = useRef(1)
  const sentinel = useRef(null)

  const loadMore = useCallback(() => {
    const p = pageRef.current
    setItems((prev) => [...prev, ...feedPage(p, 9, pool)])
    pageRef.current = p + 1
  }, [pool])

  useEffect(() => {
    const el = sentinel.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && loadMore(),
      { rootMargin: '700px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [loadMore])

  return (
    <section>
      <h2 className="feed-head">{title}</h2>
      <div className="feed">
        <div className="feed-grid">
          {items.map((a) => (
            <ArticleCard key={a._key} a={a} standfirst={false} />
          ))}
        </div>
      </div>
      <div className="sentinel" ref={sentinel}><div className="spinner" /></div>
    </section>
  )
}
