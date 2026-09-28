import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard, Building2, Clapperboard, Inbox, Settings as SettingsIcon,
  LogOut, Plus, Pencil, Trash2, Lock, Download, Upload, RotateCcw,
  X, Check, ExternalLink, KeyRound, Eye,
} from 'lucide-react'
import {
  useSiteData, saveSite, resetSite, login, logout, isAuthed,
  setPass, slugify,
} from '../admin/store'

const input = 'w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm outline-none focus:border-[#C8A96A]'
const label = 'mb-1 block text-xs font-bold uppercase tracking-wider text-white/50'
const card = 'rounded-3xl border border-white/10 bg-[#131316] p-5'
const btnGold = 'inline-flex items-center gap-2 rounded-full bg-[#C8A96A] px-5 py-2.5 text-sm font-black text-black hover:bg-[#E8D5A3] transition'
const btnGhost = 'inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-bold hover:bg-white/10 transition'

const emptyProject = {
  slug: '', status: 'ongoing', price: '', surface: '', rooms: '',
  title_fr: '', title_ar: '', wilaya_fr: '', wilaya_ar: '',
  desc_fr: '', desc_ar: '', images: [],
}

// ---------- LOGIN ----------
function Login({ onOk }) {
  const [code, setCode] = useState('')
  const [err, setErr] = useState(false)
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col items-center justify-center px-4 pb-20 pt-32">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#C8A96A] text-2xl font-black text-black">Z</span>
      <h1 className="mt-4 text-2xl font-black">Admin Zaouche</h1>
      <p className="mt-1 text-sm text-white/50">Code d'accès requis</p>
      <form
        className="mt-6 w-full space-y-3"
        onSubmit={(e) => {
          e.preventDefault()
          if (login(code)) onOk()
          else setErr(true)
        }}
      >
        <input
          type="password" value={code} onChange={(e) => { setCode(e.target.value); setErr(false) }}
          placeholder="Code admin" className={`${input} text-center tracking-[0.3em] ${err ? 'border-red-500' : ''}`}
        />
        {err && <p className="text-center text-xs font-bold text-red-400">Code incorrect</p>}
        <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#C8A96A] py-3 font-black text-black">
          <Lock size={16} /> Entrer
        </button>
        <p className="text-center text-[11px] text-white/35">Démo : zaouche2026 (modifiable dans Réglages)</p>
      </form>
    </div>
  )
}

// ---------- PROJECT FORM ----------
function ProjectForm({ initial, onSave, onClose }) {
  const [p, setP] = useState(initial || { ...emptyProject })
  const [imgs, setImgs] = useState((initial?.images || []).join('\n'))
  const set = (k, v) => setP({ ...p, [k]: v })
  const F = ({ k, t, ph, ta }) => (
    <div>
      <label className={label}>{t}</label>
      {ta
        ? <textarea rows={3} value={p[k]} onChange={(e) => set(k, e.target.value)} placeholder={ph} className={input} />
        : <input value={p[k]} onChange={(e) => set(k, e.target.value)} placeholder={ph} className={input} />}
    </div>
  )
  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">
      <div className={`${card} mx-auto my-8 max-w-3xl`}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-black">{initial ? 'Modifier le projet' : 'Nouveau projet'}</h2>
          <button onClick={onClose} className="rounded-full bg-white/10 p-2 hover:bg-white/20"><X size={18} /></button>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div><label className={label}>Statut</label>
            <select value={p.status} onChange={(e) => set('status', e.target.value)} className={input}>
              <option value="ongoing">En cours</option>
              <option value="delivered">Livré</option>
            </select>
          </div>
          <F k="price" t="Prix (ex: 1.85 Mds DA)" ph="Prix sur appel" />
          <F k="title_fr" t="Titre FR" ph="Résidence Rimas" />
          <F k="title_ar" t="Titre AR" ph="إقامة ريماس" />
          <F k="wilaya_fr" t="Wilaya FR" ph="Oran — Hai Khemisti" />
          <F k="wilaya_ar" t="Wilaya AR" ph="وهران — حي خميستي" />
          <F k="surface" t="Surface" ph="127 m²" />
          <F k="rooms" t="Type" ph="F5" />
          <div className="md:col-span-2"><F k="desc_fr" t="Description FR" ta ph="Détails, paiement, disponibilités…" /></div>
          <div className="md:col-span-2"><F k="desc_ar" t="Description AR" ta ph="التفاصيل…" /></div>
          <div className="md:col-span-2">
            <label className={label}>Images (1 URL par ligne)</label>
            <textarea rows={3} value={imgs} onChange={(e) => setImgs(e.target.value)} className={input} placeholder="https://…" />
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onClose} className={btnGhost}>Annuler</button>
          <button
            onClick={() => {
              const images = imgs.split('\n').map((s) => s.trim()).filter(Boolean)
              const slug = p.slug || slugify(p.title_fr)
              onSave({ ...p, slug, images })
            }}
            className={btnGold}
          ><Check size={16} /> Enregistrer</button>
        </div>
      </div>
    </div>
  )
}

// ---------- MAIN ----------
export default function Admin() {
  const [authed, setAuthed] = useState(isAuthed())
  const [tab, setTab] = useState('dash')
  const data = useSiteData()
  const [editing, setEditing] = useState(undefined)
  const [newPass, setNewPass] = useState('')
  const fileRef = useRef(null)

  if (!authed) return <Login onOk={() => setAuthed(true)} />

  const { projects, settings, messages } = data
  const unread = (messages || []).filter((m) => !m.read).length
  const ongoing = projects.filter((p) => p.status === 'ongoing').length

  const saveProjects = (list) => saveSite({ ...load(data), projects: list })
  const saveSettings = (s) => saveSite({ ...load(data), settings: { ...data.settings, ...s } })
  const saveMessages = (list) => saveSite({ ...load(data), messages: list })

  const tabs = [
    { k: 'dash', l: 'Tableau de bord', i: LayoutDashboard },
    { k: 'projects', l: 'Projets', i: Building2 },
    { k: 'home', l: 'Accueil & Vidéo', i: Clapperboard },
    { k: 'messages', l: `Messages${unread ? ` (${unread})` : ''}`, i: Inbox },
    { k: 'settings', l: 'Réglages', i: SettingsIcon },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-24">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#C8A96A] text-xl font-black text-black">Z</span>
          <div>
            <h1 className="text-xl font-black leading-tight">Panneau Admin</h1>
            <p className="text-xs text-white/50">Modifs visibles instantanément sur le site</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to="/" className={btnGhost}><Eye size={16} /> Voir le site</Link>
          <button onClick={() => { logout(); setAuthed(false) }} className={btnGhost}><LogOut size={16} /> Sortir</button>
        </div>
      </div>

      <div className="no-scrollbar mb-6 flex gap-2 overflow-x-auto">
        {tabs.map(({ k, l, i: Icon }) => (
          <button key={k} onClick={() => setTab(k)}
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${tab === k ? 'bg-[#C8A96A] text-black' : 'bg-white/10 text-white/70 hover:bg-white/15'}`}>
            <Icon size={16} /> {l}
          </button>
        ))}
      </div>

      {/* DASHBOARD */}
      {tab === 'dash' && (
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { n: projects.length, l: 'Projets au total' },
            { n: ongoing, l: 'En cours' },
            { n: projects.length - ongoing, l: 'Livrés' },
            { n: unread, l: 'Messages non lus' },
          ].map((s, i) => (
            <div key={i} className={card}>
              <div className="text-4xl font-black text-[#C8A96A]">{s.n}</div>
              <div className="text-sm text-white/60">{s.l}</div>
            </div>
          ))}
          <div className={`${card} md:col-span-4`}>
            <h3 className="font-black">Actions rapides</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <button onClick={() => { setEditing(null); setTab('projects') }} className={btnGold}><Plus size={16} /> Nouveau projet</button>
              <button onClick={() => setTab('messages')} className={btnGhost}><Inbox size={16} /> Lire les messages</button>
              <button onClick={() => { if (confirm('Tout réinitialiser ?')) resetSite() }} className={btnGhost}><RotateCcw size={16} /> Réinitialiser la démo</button>
            </div>
          </div>
        </div>
      )}

      {/* PROJETS */}
      {tab === 'projects' && (
        <div>
          <button onClick={() => setEditing(null)} className={`${btnGold} mb-4`}><Plus size={16} /> Nouveau projet</button>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((p) => (
              <div key={p.slug} className={`${card} flex gap-4`}>
                <img src={p.images?.[0]} alt="" className="h-24 w-24 shrink-0 rounded-2xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#C8A96A]">
                    {p.status === 'ongoing' ? 'En cours' : 'Livré'} • {p.price}
                  </p>
                  <h3 className="truncate font-black">{p.title_fr}</h3>
                  <p className="truncate text-sm text-white/50">{p.wilaya_fr}</p>
                  <div className="mt-2 flex gap-2">
                    <button onClick={() => setEditing(p)} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold hover:bg-white/20"><Pencil size={14} className="inline" /> Modifier</button>
                    <Link to={`/projet/${p.slug}`} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold hover:bg-white/20"><ExternalLink size={14} className="inline" /> Voir</Link>
                    <button
                      onClick={() => { if (confirm(`Supprimer « ${p.title_fr} » ?`)) saveProjects(projects.filter((x) => x.slug !== p.slug)) }}
                      className="rounded-full bg-red-500/15 px-3 py-1.5 text-xs font-bold text-red-400 hover:bg-red-500/25"
                    ><Trash2 size={14} className="inline" /> Supprimer</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {editing !== undefined && (
            <ProjectForm
              initial={editing}
              onClose={() => setEditing(undefined)}
              onSave={(np) => {
                const exists = projects.some((x) => x.slug === np.slug)
                saveProjects(exists ? projects.map((x) => (x.slug === np.slug ? np : x)) : [...projects, np])
                setEditing(undefined)
              }}
            />
          )}
        </div>
      )}

      {/* ACCUEIL */}
      {tab === 'home' && (
        <div className={`${card} max-w-2xl space-y-4`}>
          <h3 className="font-black">Vidéo fond d'écran — Accueil</h3>
          <div>
            <label className={label}>URL vidéo (mp4)</label>
            <input value={settings.videoHome} onChange={(e) => saveSettings({ videoHome: e.target.value })} className={input} />
          </div>
          <div>
            <label className={label}>Image poster (pendant chargement)</label>
            <input value={settings.videoPoster} onChange={(e) => saveSettings({ videoPoster: e.target.value })} className={input} />
          </div>
          <video src={settings.videoHome} poster={settings.videoPoster} controls playsInline className="max-h-64 w-full rounded-2xl border border-white/10 object-cover" />
          <p className="text-xs text-white/40">Astuce : collez un lien mp4 direct (TikTok via save, ou fichier uploadé). Changement visible dès retour sur l'Accueil.</p>
        </div>
      )}

      {/* MESSAGES */}
      {tab === 'messages' && (
        <div className="grid max-w-3xl gap-3">
          {(messages || []).length === 0 && <p className="text-white/50">Aucun message pour l'instant. Les formulaires du site arrivent ici.</p>}
          {(messages || []).map((m) => (
            <div key={m.id} className={`${card} ${m.read ? 'opacity-70' : 'border-[#C8A96A]/40'}`}>
              <div className="flex items-center justify-between gap-2">
                <p className="font-black">{m.name} <span className="font-normal text-white/50">• {m.phone}</span></p>
                <p className="shrink-0 text-[11px] text-white/40">{new Date(m.date).toLocaleString('fr-DZ')}</p>
              </div>
              <p className="mt-1 text-sm text-white/75">{m.msg}</p>
              <div className="mt-3 flex gap-2">
                <a href={`https://wa.me/${String(m.phone).replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="rounded-full bg-[#C8A96A] px-3 py-1.5 text-xs font-black text-black">Répondre WhatsApp</a>
                {!m.read && <button onClick={() => saveMessages(messages.map((x) => (x.id === m.id ? { ...x, read: true } : x)))} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold">Marquer lu</button>}
                <button onClick={() => saveMessages(messages.filter((x) => x.id !== m.id))} className="rounded-full bg-red-500/15 px-3 py-1.5 text-xs font-bold text-red-400"><Trash2 size={14} className="inline" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* RÉGLAGES */}
      {tab === 'settings' && (
        <div className={`${card} max-w-2xl space-y-4`}>
          <h3 className="font-black">Contact & réseaux</h3>
          {[['whatsapp', 'Lien WhatsApp principal'], ['phoneLabel', 'Téléphone affiché 1'], ['phone2Link', 'Lien WhatsApp 2'], ['phone2Label', 'Téléphone affiché 2'], ['tiktok', 'Lien TikTok'], ['facebook', 'Lien Facebook']].map(([k, l]) => (
            <div key={k}>
              <label className={label}>{l}</label>
              <input value={settings[k]} onChange={(e) => saveSettings({ [k]: e.target.value })} className={input} />
            </div>
          ))}
          <h3 className="pt-2 font-black">Sécurité</h3>
          <div className="flex gap-2">
            <input value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="Nouveau code admin" className={input} />
            <button onClick={() => { if (newPass.length >= 4) { setPass(newPass); setNewPass(''); alert('Code mis à jour') } }} className={btnGold}><KeyRound size={16} /></button>
          </div>
          <h3 className="pt-2 font-black">Sauvegarde</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
                const a = document.createElement('a')
                a.href = URL.createObjectURL(blob)
                a.download = 'zaouche-backup.json'
                a.click()
              }}
              className={btnGhost}
            ><Download size={16} /> Exporter JSON</button>
            <button onClick={() => fileRef.current?.click()} className={btnGhost}><Upload size={16} /> Importer JSON</button>
            <input
              ref={fileRef} type="file" accept=".json" className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (!f) return
                const r = new FileReader()
                r.onload = () => {
                  try {
                    const d = JSON.parse(r.result)
                    if (d.projects && d.settings) { saveSite({ messages: [], ...d }); alert('Importé !') }
                    else alert('Fichier invalide')
                  } catch { alert('Fichier invalide') }
                }
                r.readAsText(f)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function load(data) {
  return data
}
