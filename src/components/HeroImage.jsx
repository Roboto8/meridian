import { useState } from 'react'
import { sectionColor } from '../data/sections.js'

function shade(hex, p) {
  const n = parseInt(hex.slice(1), 16)
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  const t = p < 0 ? 0 : 255, a = Math.abs(p)
  r = Math.round((t - r) * a + r); g = Math.round((t - g) * a + g); b = Math.round((t - b) * a + b)
  return `rgb(${r},${g},${b})`
}

// Real hero image if one has been generated into /img/<id>.jpg, otherwise a
// tasteful section-coloured gradient placeholder (so the grid always looks
// finished and degrades gracefully).
export default function HeroImage({ article, tall = false, label = true }) {
  const [err, setErr] = useState(false)
  const c = sectionColor(article.section)
  const id = article.id || 1
  const angle = (id * 53) % 360
  return (
    <div className={'media' + (tall ? ' media--tall' : '')}>
      {!err ? (
        <img src={`${import.meta.env.BASE_URL}img/${id}.jpg`} alt="" loading="lazy" onError={() => setErr(true)} />
      ) : (
        <div
          className="media__ph"
          style={{ background: `linear-gradient(${angle}deg, ${shade(c, -0.45)}, ${c} 55%, ${shade(c, 0.22)})` }}
        >
          {label && <span>{article.kicker || article.section}</span>}
        </div>
      )}
    </div>
  )
}
