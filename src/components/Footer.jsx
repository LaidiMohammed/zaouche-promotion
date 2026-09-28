import { Clapperboard, Share2, Camera } from 'lucide-react'
import { useSiteData } from '../admin/store'
import { useLang } from '../i18n'

export default function Footer() {
  const { t } = useLang()
  const { settings } = useSiteData()
  const TIKTOK_URL = settings.tiktok
  const FACEBOOK_URL = settings.facebook
  return (
    <footer className="border-t border-white/10 bg-[#0A0A0B] pb-24 md:pb-8">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#C8A96A] text-xl font-black text-black">Z</span>
            <span className="text-sm font-bold tracking-[0.25em]">ZAOUCCHE</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-white/55">{t.footer.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={TIKTOK_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold hover:bg-[#C8A96A] hover:text-black transition"><Clapperboard size={16} /> TikTok</a>
          <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold hover:bg-[#C8A96A] hover:text-black transition"><Share2 size={16} /> Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold hover:bg-[#C8A96A] hover:text-black transition"><Camera size={16} /> Insta</a>
        </div>
        <p className="text-xs text-white/40 md:text-right">{t.footer.rights}</p>
      </div>
    </footer>
  )
}
