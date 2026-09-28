import { useState } from 'react'
import { useLang } from '../i18n'
import { WHATSAPP, PHONE_LABEL, TIKTOK_URL, FACEBOOK_URL } from '../data/projects'

export default function Contact() {
  const { t } = useLang()
  const [f, setF] = useState({ name: '', phone: '', msg: '' })
  const send = (e) => {
    e.preventDefault()
    const text = encodeURIComponent(`Bonjour Zaouche ! Je suis ${f.name} (${f.phone}) — ${f.msg}`)
    window.open(`https://wa.me/213560000000?text=${text}`, '_blank')
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
          <button className="w-full rounded-full bg-[#C8A96A] py-3 font-black text-black">{t.contact.send}</button>
          <p className="text-center text-xs text-white/50">{t.contact.info}</p>
        </form>
        <div className="space-y-3">
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="block rounded-3xl bg-[#C8A96A] p-6 font-black text-black">WhatsApp : {PHONE_LABEL}</a>
          <a href={TIKTOK_URL} target="_blank" rel="noreferrer" className="block rounded-3xl border border-white/10 bg-white/5 p-6 font-bold">♪ TikTok : @zaouche_promotion</a>
          <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="block rounded-3xl border border-white/10 bg-white/5 p-6 font-bold">f Facebook : Zaouche Promotion</a>
        </div>
      </div>
    </div>
  )
}
