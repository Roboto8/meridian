// Section identity — Guardian-style accent colours per section.
export const SECTIONS = [
  { key: 'World', color: '#c70000' },
  { key: 'US Politics', color: '#c70000' },
  { key: 'Environment', color: '#1d7d3f' },
  { key: 'Business', color: '#1c5e8a' },
  { key: 'Science', color: '#6b3fa0' },
  { key: 'Sport', color: '#0084c6' },
  { key: 'Culture', color: '#bb3b80' },
  { key: 'Opinion', color: '#e05e00' },
]

const norm = (s) => (s || '').trim().toLowerCase()

export const sectionColor = (s) =>
  (SECTIONS.find((x) => norm(x.key) === norm(s)) || { color: '#052962' }).color

export const sectionSlug = (s) => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

export const sectionBySlug = (slug) =>
  SECTIONS.find((x) => sectionSlug(x.key) === slug)?.key || null
