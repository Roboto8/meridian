import articles from './articles.json'
import { sectionSlug } from './sections.js'

export const ALL = articles

export const bySlug = (slug) => articles.find((a) => a.slug === slug)
export const bySectionKey = (key) =>
  articles.filter((a) => (a.section || '').trim().toLowerCase() === (key || '').trim().toLowerCase())
export const bySectionSlug = (slug) =>
  articles.filter((a) => sectionSlug(a.section) === slug)
export const leads = () => articles.filter((a) => a.isLead)

// Deterministic seeded shuffle (mulberry32) so the "doom-scroll" feed re-orders
// without React re-randomising every render. Each page bumps the seed.
function rng(seed) {
  let t = seed + 0x6d2b79f5
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

export function shuffled(seed = 1, pool = articles) {
  const a = [...pool]
  const rand = rng(seed)
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// An endless page of the feed: reshuffle the whole pool each page (different
// seed) so it never runs dry and the order keeps changing as you scroll.
export function feedPage(page, size = 7, pool = articles) {
  return shuffled(page * 7 + 1, pool).slice(0, size).map((a, i) => ({ ...a, _key: `${page}-${i}-${a.id}` }))
}

export const readWord = (mins) => `${mins || 4} min read`
