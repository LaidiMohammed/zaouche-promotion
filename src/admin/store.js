import { useEffect, useState } from 'react'
import { projects as seedProjects, TIKTOK_URL, FACEBOOK_URL, WHATSAPP, PHONE_LABEL, PHONE2_LABEL, VIDEO_HOME, VIDEO_POSTER } from '../data/projects'

const KEY = 'zaouche-site-v1'
const PASS_KEY = 'zaouche-admin-pass'
export const DEFAULT_PASS = 'zaouche2026'

function seed() {
  return {
    projects: seedProjects,
    settings: {
      whatsapp: WHATSAPP,
      phoneLabel: PHONE_LABEL,
      phone2Label: PHONE2_LABEL,
      phone2Link: 'https://wa.me/213670209099',
      tiktok: TIKTOK_URL,
      facebook: FACEBOOK_URL,
      videoHome: VIDEO_HOME,
      videoPoster: VIDEO_POSTER,
    },
    messages: [],
  }
}

export function loadSite() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) {
      const s = seed()
      localStorage.setItem(KEY, JSON.stringify(s))
      return s
    }
    const data = JSON.parse(raw)
    if (!data.projects || !data.settings) return seed()
    return { messages: [], ...data }
  } catch {
    return seed()
  }
}

export function saveSite(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
  window.dispatchEvent(new Event('zaouche-update'))
}

export function resetSite() {
  const s = seed()
  saveSite(s)
  return s
}

export function useSiteData() {
  const [data, setData] = useState(loadSite)
  useEffect(() => {
    const refresh = () => setData(loadSite())
    window.addEventListener('zaouche-update', refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener('zaouche-update', refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])
  return data
}

export function addMessage({ name, phone, msg }) {
  const data = loadSite()
  data.messages = [{ id: Date.now(), date: new Date().toISOString(), name, phone, msg, read: false }, ...(data.messages || [])]
  saveSite(data)
}

// ---- auth (démo front, Phase 2 = vrai backend) ----
export function getPass() {
  return localStorage.getItem(PASS_KEY) || DEFAULT_PASS
}
export function setPass(p) {
  localStorage.setItem(PASS_KEY, p)
}
export function login(code) {
  if (code === getPass()) {
    sessionStorage.setItem('zaouche-admin', '1')
    return true
  }
  return false
}
export function logout() {
  sessionStorage.removeItem('zaouche-admin')
}
export function isAuthed() {
  return sessionStorage.getItem('zaouche-admin') === '1'
}

export const slugify = (s) =>
  (s || 'projet')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || `projet-${Date.now()}`
