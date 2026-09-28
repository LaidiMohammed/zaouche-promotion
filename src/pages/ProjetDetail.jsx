import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, Ruler, BedDouble, MessageCircle, Clapperboard } from 'lucide-react'
import { useLang } from '../i18n'
import { projects, TIKTOK_URL, WHATSAPP } from '../data/projects'

export default function ProjetDetail() {
  const { slug } = useParams()
  const { lang, t } = useLang()
  const p = projects.find((x) => x.slug === slug) || projects[0]
  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-28">
      <Link to="/projets" className="inline-flex items-center gap-1 text-sm font-bold text-[#C8A96A]"><ArrowLeft size={16} /> {t.detail.back}</Link>
      <div className="relative mt-4 overflow-hidden rounded-3xl border border-white/10">
        <img src={p.images[0]} alt="" className="h-[55vh] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-0 p-6">
          <span className="rounded-full bg-[#C8A96A] px-3 py-1 text-xs font-black text-black">
            {p.status === 'ongoing' ? t.detail.status_ongoing : t.detail.status_delivered}
          </span>
          <h1 className="mt-2 text-4xl font-black md:text-6xl">{lang === 'ar' ? p.title_ar : p.title_fr}</h1>
        </div>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <p className="text-white/75 leading-relaxed">{lang === 'ar' ? p.desc_ar : p.desc_fr}</p>
          <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto">
            {p.images.map((im, i) => <img key={i} src={im} alt="" className="h-44 w-64 shrink-0 rounded-2xl border border-white/10 object-cover" />)}
          </div>
        </div>
        <aside className="h-fit rounded-3xl border border-[#C8A96A]/30 bg-[#131316] p-6">
          <p className="text-sm text-white/55">{t.detail.from}</p>
          <p className="text-3xl font-black text-[#C8A96A]">{p.price}</p>
          <div className="mt-4 space-y-2 text-sm">
            <p className="flex items-center gap-2"><MapPin size={16} className="text-[#C8A96A]" /> {t.detail.wilaya} : {lang === 'ar' ? p.wilaya_ar : p.wilaya_fr}</p>
            <p className="flex items-center gap-2"><Ruler size={16} className="text-[#C8A96A]" /> {t.detail.surface} : {p.surface}</p>
            <p className="flex items-center gap-2"><BedDouble size={16} className="text-[#C8A96A]" /> {t.detail.rooms} : {p.rooms}</p>
          </div>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#C8A96A] py-3 text-center font-black text-black"><MessageCircle size={18} /> {t.detail.reserve}</a>
          <a href={TIKTOK_URL} target="_blank" rel="noreferrer" className="mt-2 flex items-center justify-center gap-2 rounded-full border border-white/20 py-3 text-center font-bold"><Clapperboard size={18} /> {t.detail.tiktok}</a>
        </aside>
      </div>
    </div>
  )
}
