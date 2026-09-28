import { NavLink } from 'react-router-dom'
import { Home, Building2, Info, Mail } from 'lucide-react'
import { useLang } from '../i18n'

export default function NavbarBottom() {
  const { t } = useLang()
  const item = ({ isActive }) =>
    `flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-bold transition ${isActive ? 'text-[#C8A96A]' : 'text-white/50'}`
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 border-t border-white/10 bg-[#0A0A0B]/92 backdrop-blur-xl md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex">
        <NavLink to="/" className={item}>
          <Home size={20} strokeWidth={2.2} /><span>{t.nav.home}</span>
        </NavLink>
        <NavLink to="/projets" className={item}>
          <Building2 size={20} strokeWidth={2.2} /><span>{t.nav.projects}</span>
        </NavLink>
        <NavLink to="/a-propos" className={item}>
          <Info size={20} strokeWidth={2.2} /><span>{t.nav.about}</span>
        </NavLink>
        <NavLink to="/contact" className={item}>
          <Mail size={20} strokeWidth={2.2} /><span>{t.nav.contact}</span>
        </NavLink>
      </div>
    </nav>
  )
}
