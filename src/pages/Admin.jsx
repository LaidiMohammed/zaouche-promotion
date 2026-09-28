import { Lock } from 'lucide-react'
import { useLang } from '../i18n'

export default function Admin() {
  const { t } = useLang()
  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-32 text-center">
      <p className="text-xs font-bold tracking-[0.3em] text-[#C8A96A]">{t.admin.kicker}</p>
      <h1 className="mt-2 text-4xl font-black">{t.admin.title}</h1>
      <p className="mx-auto mt-4 max-w-xl text-white/65">{t.admin.desc}</p>
      <div className="mx-auto mt-8 grid gap-3 text-left">
        {['CRUD Projets FR/AR + images + vidéo + prix + statut', 'Vidéo home + hero + réseaux TikTok/FB/Insta', 'Messages contact + stats + login sécurisé'].map((x, i) => (
          <div key={i} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#131316] p-4 text-sm text-white/70"><Lock size={18} className="shrink-0 text-[#C8A96A]" /> {x}</div>
        ))}
      </div>
    </div>
  )
}
