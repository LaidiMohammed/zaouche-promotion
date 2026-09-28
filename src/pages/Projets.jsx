import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import { projects } from '../data/projects'

export default function Projets() {
  const { lang, t } = useLang()
  const [f, setF] = useState('all')
  const list = projects.filter((p) => f === 'all' || (f === 'ongoing' ? p.status === 'ongoing' : p.status === 'delivered'))
  const btn = (k, label) => (
    <button key={k} onClick={() => setF(k)} className={`rounded-full px-5 py-2 text-sm font-bold transition ${f === k ? 'bg-[#C8A96A] text-black' : 'bg-white/10 text-white/70'}`}>{label}</button>
  )
  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-28">
      <p className="text-xs font-bold tracking-[0.3em] text-[#C8A96A]">{t.projects.kicker}</p>
      <h1 className="mt-2 text-4xl font-black md:text-6xl">{t.projects.title}</h1>
      <div className="mt-6 flex gap-2">{[btn('all', t.projects.all), btn('ongoing', t.projects.ongoing), btn('delivered', t.projects.delivered)]}</div>
      <div className="mt-8 space-y-6">
        {list.map((p, i) => (
          <Link key={p.slug} to={`/projet/${p.slug}`}
            className={`group grid overflow-hidden rounded-3xl border border-white/10 bg-[#131316] md:grid-cols-2 ${i % 2 ? 'md:[direction:rtl]' : ''}`}>
            <div className="relative h-64 overflow-hidden md:h-80">
              <img src={p.images[0]} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[11px] font-bold text-[#C8A96A]">
                {p.status === 'ongoing' ? t.projects.ongoing : t.projects.delivered}
              </span>
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10 [direction:ltr]">
              <h2 className="text-2xl font-black md:text-4xl">{lang === 'ar' ? p.title_ar : p.title_fr}</h2>
              <p className="mt-1 text-sm text-white/55">{lang === 'ar' ? p.wilaya_ar : p.wilaya_fr} • {p.surface} • {p.rooms}</p>
              <p className="mt-3 line-clamp-2 text-white/70">{lang === 'ar' ? p.desc_ar : p.desc_fr}</p>
              <p className="mt-4 text-xl font-black text-[#C8A96A]">{t.detail.from} {p.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
