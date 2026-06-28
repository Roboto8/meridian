import { Routes, Route } from 'react-router-dom'
import Masthead from './components/Masthead.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Section from './pages/Section.jsx'
import Article from './pages/Article.jsx'

export default function App() {
  return (
    <>
      <Masthead />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/section/:slug" element={<Section />} />
        <Route path="/article/:slug" element={<Article />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}
