import { BadgeCheck } from 'lucide-react'
import { useLang } from '../i18n'

export default function APropos() {
  const { t } = useLang()
  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-28">
      <p className="text-xs font-bold tracking-[0.3em] text-[#C8A96A]">{t.about.kicker}</p>
      <h1 className="mt-2 max-w-3xl text-4xl font-black md:text-6xl">{t.about.title}</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <p className="rounded-3xl border border-white/10 bg-[#131316] p-6 leading-relaxed text-white/75">{t.about.p1}</p>
        <p className="rounded-3xl border border-[#C8A96A]/30 bg-[#C8A96A]/10 p-6 leading-relaxed">{t.about.p2}</p>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        {t.about.points.map((x, i) => (
          <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5 font-bold">
            <BadgeCheck size={20} className="mb-2 text-[#C8A96A]" />{x}
          </div>
        ))}
      </div>
    </div>
  )
}
