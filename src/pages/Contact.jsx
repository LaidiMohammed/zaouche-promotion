import { useState } from 'react'
import { MessageCircle, Clapperboard, Share2, Send } from 'lucide-react'
import { useLang } from '../i18n'
import { useSiteData, addMessage } from '../admin/store'

export default function Contact() {
  const { t } = useLang()
  const { settings } = useSiteData()
  const WHATSAPP = settings.whatsapp
  const PHONE_LABEL = settings.phoneLabel
  const PHONE2_LABEL = settings.phone2Label
  const TIKTOK_URL = settings.tiktok
  const FACEBOOK_URL = settings.facebook
  const [f, setF] = useState({ name: '', phone: '', msg: '' })
  const [saved, setSaved] = useState(false)
  const send = (e) => {
    e.preventDefault()
    addMessage(f)
    setSaved(true)
    setF({ name: '', phone: '', msg: '' })
    const text = encodeURIComponent(`Bonjour Zaouche ! Je suis ${f.name} (${f.phone}) — ${f.msg}`)
    window.open(`${WHATSAPP.split('?')[0]}?text=${text}`, '_blank')
  }
  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-28">
      <p className="text-xs font-bold tracking-[0.3em] text-[#C8A96A]">{t.contact.kicker}</p>
      <h1 className="mt-2 text-4xl font-black md:text-6xl">{t.contact.title}</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <form onSubmit={send} className="space-y-3 rounded-3xl border border-white/10 bg-[#131316] p-6">
          <input required placeholder={t.contact.name} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-[#C8A96A]" />
          <input required placeholder={t.contact.phone} value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-[#C8A96A]" />
          <textarea required rows={5} placeholder={t.contact.msg} value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-[#C8A96A]" />
          <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#C8A96A] py-3 font-black text-black"><Send size={18} /> {t.contact.send}</button>
          {saved && <p className="rounded-2xl bg-green-500/15 px-4 py-2 text-center text-xs font-bold text-green-400">✓ Message enregistré — on vous répond sous 24h.</p>}
          <p className="text-center text-xs text-white/50">{t.contact.info}</p>
        </form>
        <div className="space-y-3">
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-3xl bg-[#C8A96A] p-6 font-black text-black"><MessageCircle size={22} /> WhatsApp : {PHONE_LABEL}</a>
          <a href="https://wa.me/213670209099" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-3xl border border-[#C8A96A]/40 bg-[#C8A96A]/10 p-6 font-bold"><MessageCircle size={22} className="text-[#C8A96A]" /> {PHONE2_LABEL}</a>
          <a href={TIKTOK_URL} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 font-bold"><Clapperboard size={22} className="text-[#C8A96A]" /> TikTok : @zaouche_promotion</a>
          <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 font-bold"><Share2 size={22} className="text-[#C8A96A]" /> Facebook : Zaouche Promotion</a>
        </div>
      </div>
    </div>
  )
}
