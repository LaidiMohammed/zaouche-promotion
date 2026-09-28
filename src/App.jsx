import { HashRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './i18n'
import NavbarTop from './components/NavbarTop'
import NavbarBottom from './components/NavbarBottom'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projets from './pages/Projets'
import ProjetDetail from './pages/ProjetDetail'
import APropos from './pages/APropos'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

export default function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <div className="grain min-h-screen bg-[#0A0A0B] text-[#F4F1EA]">
          <NavbarTop />
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projets" element={<Projets />} />
              <Route path="/projet/:slug" element={<ProjetDetail />} />
              <Route path="/a-propos" element={<APropos />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
          <NavbarBottom />
        </div>
      </HashRouter>
    </LanguageProvider>
  )
}
