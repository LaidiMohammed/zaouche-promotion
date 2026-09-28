import { Link, NavLink } from 'react-router-dom'
import { useLang } from '../i18n'

export default function NavbarTop() {
  const { lang, setLang, t } = useLang()
  const link = ({ isActive }) =>
    `px-3 py-2 text-sm font-semibold tracking-wide transition ${isActive ? 'text-[#C8A96A]' : 'text-[#F4F1EA]/70 hover:text-white'}`
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-[#0A0A0B]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#C8A96A] text-xl font-black text-black">Z</span>
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-[0.25em]">ZAOUCCHE</span>
            <span className="block text-[11px] text-white/50">{lang === 'ar' ? 'ترقية عقارية' : 'PROMOTION IMMO'}</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/" className={link}>{t.nav.home}</NavLink>
          <NavLink to="/projets" className={link}>{t.nav.projects}</NavLink>
          <NavLink to="/a-propos" className={link}>{t.nav.about}</NavLink>
          <NavLink to="/contact" className={link}>{t.nav.contact}</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
            className="rounded-full border border-[#C8A96A]/40 px-3 py-1.5 text-xs font-bold text-[#C8A96A] hover:bg-[#C8A96A] hover:text-black transition"
          >
            {lang === 'fr' ? 'عربي' : 'FR'}
          </button>
          <Link to="/admin" className="hidden md:inline-block rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/60 hover:text-white">Admin</Link>
        </div>
      </div>
    </header>
  )
}
