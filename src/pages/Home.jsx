import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLang } from '../i18n'
import { projects, TIKTOK_URL, WHATSAPP, VIDEO_HOME, VIDEO_POSTER } from '../data/projects'
import Marquee from '../components/Marquee'
import BeforeAfter from '../components/BeforeAfter'

export default function Home() {
  const { lang, t } = useLang()
  const feat = projects[1]
  return (
    <div>
      {/* HERO VIDEO */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={VIDEO_HOME} poster={VIDEO_POSTER}
          autoPlay muted loop playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/40 to-[#0A0A0B]/30" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#C8A96A]/40 bg-black/50 px-4 py-1.5 text-xs font-bold text-[#C8A96A]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" /> {t.hero.live} • {t.hero.kicker}
          </span>
          <h1 className="mt-4 text-6xl font-black leading-[0.95] md:text-8xl">
            {t.hero.titleA}<br />
            <span className="text-stroke">{t.hero.titleB}</span>
          </h1>
          <p className="mt-4 max-w-xl text-white/70">{t.hero.sub}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/projets" className="rounded-full bg-[#C8A96A] px-6 py-3 font-bold text-black hover:bg-[#E8D5A3] transition">{t.hero.cta1}</Link>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="rounded-full border border-white/25 bg-white/10 px-6 py-3 font-bold backdrop-blur hover:bg-white/20 transition">{t.hero.cta2}</a>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {t.stats.map((s, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="text-3xl font-black text-[#C8A96A]">{s.n}</div>
                <div className="text-xs text-white/60">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="animate-swipe mt-8 text-center text-xs text-white/50">↓ {t.hero.swipe}</div>
        </div>
      </section>

      <Marquee items={lang === 'ar' ? ['زاوش', 'تيك توك', 'تشطيب راقٍ', 'عقد موثّق', 'وهران', 'الجزائر'] : ['ZAOUCCHE', 'TIKTOK', 'HAUT STANDING', 'ACTE NOTARIÉ', 'ALGER', 'ORAN']} />

      {/* VEDETTE */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <p className="text-xs font-bold tracking-[0.3em] text-[#C8A96A]">{t.featured.kicker}</p>
        <div className="clip-slant-r relative mt-4 overflow-hidden rounded-3xl border border-white/10">
          <img src={feat.images[0]} alt="" className="h-[60vh] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute bottom-0 p-6 md:p-10">
            <h2 className="text-4xl font-black md:text-6xl">{lang === 'ar' ? feat.title_ar : feat.title_fr}</h2>
            <p className="mt-2 text-white/70">{lang === 'ar' ? feat.wilaya_ar : feat.wilaya_fr} • {feat.price}</p>
            <div className="mt-4 flex gap-3">
              <Link to={`/projet/${feat.slug}`} className="rounded-full bg-[#C8A96A] px-5 py-2.5 text-sm font-bold text-black">{t.featured.cta}</Link>
              <Link to="/projets" className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-bold">{t.featured.all}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEED TIKTOK-STYLE */}
      <section className="bg-[#131316] py-14">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-bold tracking-[0.3em] text-[#C8A96A]">{t.feed.kicker}</p>
          <h2 className="mt-2 text-3xl font-black md:text-5xl">{t.feed.title}</h2>
          <p className="mt-2 text-white/60">{t.feed.sub}</p>
        </div>
        <div className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2">
          {projects.map((p, i) => (
            <motion.div key={p.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="relative h-[62vh] w-[78vw] shrink-0 snap-center overflow-hidden rounded-[2rem] border border-white/10 md:w-[340px]">
              <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
              <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[11px] font-bold text-[#C8A96A]">0{i + 1} — {p.status === 'ongoing' ? t.projects.ongoing : t.projects.delivered}</span>
              <div className="absolute bottom-0 w-full p-4">
                <h3 className="text-xl font-black">{lang === 'ar' ? p.title_ar : p.title_fr}</h3>
                <p className="text-xs text-white/60">{lang === 'ar' ? p.wilaya_ar : p.wilaya_fr} • {p.price}</p>
                <Link to={`/projet/${p.slug}`} className="mt-3 inline-block rounded-full bg-white px-4 py-2 text-xs font-black text-black">▶ {t.featured.cta}</Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AVANT/APRES */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <BeforeAfter before={projects[0].images[1]} after={projects[0].images[2]} />
      </section>

      {/* SOCIAL */}
      <section className="clip-slant bg-[#C8A96A] py-14 text-black">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-xs font-black tracking-[0.3em]">{t.social.kicker}</p>
          <h2 className="mt-2 text-4xl font-black md:text-6xl">{t.social.title}</h2>
          <a href={TIKTOK_URL} target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-full bg-black px-8 py-4 font-black text-[#C8A96A] hover:scale-105 transition">♪ {t.social.btn}</a>
        </div>
      </section>
    </div>
  )
}
