import { createContext, useContext, useEffect, useState } from 'react'

const dict = {
  fr: {
    nav: { home: 'Accueil', projects: 'Nos Projets', about: 'À propos', contact: 'Contact' },
    hero: {
      kicker: 'Promotion immobilière — Algérie',
      titleA: 'ZAOUCCHE',
      titleB: 'BÂTIT LIEUX DE VIE',
      sub: 'Résidences standing, finitions soignées, emplacements recherchés. Suivez nos chantiers en vidéo comme sur TikTok.',
      cta1: 'Voir les projets',
      cta2: 'WhatsApp direct',
      swipe: 'swipe pour explorer',
      live: 'Chantier en vidéo',
    },
    stats: [
      { n: '12+', l: 'Résidences livrées' },
      { n: '480+', l: 'Logements remis' },
      { n: '6', l: 'Wilayas couvertes' },
      { n: '98%', l: 'Clients satisfaits' },
    ],
    featured: { kicker: 'Projet vedette', cta: 'Découvrir la résidence', all: 'Tous les projets' },
    feed: { kicker: 'Feed projets — style TikTok', title: 'Swipe. Regarde. Projette-toi.', sub: 'Chaque résidence en plein écran : photos, statut, prix, localisation.' },
    social: { kicker: 'On est actifs là où vous êtes', title: 'Suivez le chantier en direct', btn: 'Ouvrir TikTok @zaouche_promotion' },
    footer: { tagline: 'Promotion immobilière nouvelle génération. Vidéo, transparence, confiance.', rights: '© 2026 Zaouche Promotion. Démo présentation front-end.' },
    projects: { kicker: 'Nos Projets', title: 'Des résidences, pas des catalogues.', all: 'Tous', ongoing: 'En cours', delivered: 'Livrés' },
    detail: { back: 'Retour', status_ongoing: 'En cours', status_delivered: 'Livré', from: 'à partir de', surface: 'Surface', rooms: 'Pièces', wilaya: 'Wilaya', reserve: 'Réserver via WhatsApp', tiktok: 'Voir en vidéo TikTok' },
    about: {
      kicker: 'À propos',
      title: 'Zaouche, le promoteur qui montre tout.',
      p1: "Zaouche Promotion documente chaque étape : fondations, gros œuvre, finitions. Pas de promesses floues — des vidéos de chantier, des plans clairs, un accompagnement jusqu'à la remise des clés.",
      p2: "Conformité loi 04-11, acte notarié, EDD transparent. La diaspora comme les locaux peuvent acheter à distance en confiance via WhatsApp + visio chantier.",
      points: ['Vidéos chantier régulières', 'Finitions haut standing', 'Acte notarié sécurisé', 'Suivi WhatsApp 7j/7'],
    },
    contact: {
      kicker: 'Contact',
      title: 'Parlons de votre futur logement.',
      name: 'Nom complet', phone: 'Téléphone / WhatsApp', msg: 'Votre message (projet, budget, F2/F3/F4...)',
      send: 'Envoyer via WhatsApp', info: 'Réponse sous 24h — visio chantier possible.',
    },
    admin: { kicker: 'Admin', title: 'Panneau admin — bientôt en Phase 2', desc: "Version présentation : pas de backend. En Phase 2 : login, CRUD projets FR/AR, upload vidéo home, messages, stats. Tout le design actuel est déjà prêt pour être branché à Supabase." },
  },
  ar: {
    nav: { home: 'الرئيسية', projects: 'مشاريعنا', about: 'من نحن', contact: 'اتصل بنا' },
    hero: {
      kicker: 'ترقية عقارية — الجزائر',
      titleA: 'زاوش',
      titleB: 'يبني أماكن للحياة',
      sub: 'إقامات راقية، تشطيبات متقنة، مواقع مرغوبة. تابعوا الورشات بالفيديو كما على تيك توك.',
      cta1: 'شاهد المشاريع',
      cta2: 'واتساب مباشر',
      swipe: 'اسحب للاستكشاف',
      live: 'الورشة بالفيديو',
    },
    stats: [
      { n: '12+', l: 'إقامة مسلّمة' },
      { n: '480+', l: 'سكن مسلّم' },
      { n: '6', l: 'ولايات' },
      { n: '98%', l: 'زبائن راضون' },
    ],
    featured: { kicker: 'مشروع مميز', cta: 'اكتشف الإقامة', all: 'كل المشاريع' },
    feed: { kicker: 'مشاريع بأسلوب تيك توك', title: 'اسحب. شاهد. تخيّل نفسك.', sub: 'كل إقامة بملء الشاشة: صور، حالة، سعر، موقع.' },
    social: { kicker: 'نحن حيث أنتم', title: 'تابع الورشة مباشرة', btn: 'افتح تيك توك @zaouche_promotion' },
    footer: { tagline: 'ترقية عقارية بجيل جديد. فيديو، شفافية، ثقة.', rights: '© 2026 زاوش للترقية. نسخة عرض واجهة فقط.' },
    projects: { kicker: 'مشاريعنا', title: 'إقامات، ليست كتالوجات.', all: 'الكل', ongoing: 'قيد الإنجاز', delivered: 'مسلّمة' },
    detail: { back: 'عودة', status_ongoing: 'قيد الإنجاز', status_delivered: 'مسلّمة', from: 'ابتداءً من', surface: 'المساحة', rooms: 'الغرف', wilaya: 'الولاية', reserve: 'احجز عبر واتساب', tiktok: 'شاهد فيديو تيك توك' },
    about: {
      kicker: 'من نحن',
      title: 'زاوش، المرقي الذي يُظهر كل شيء.',
      p1: 'زاوش للترقية يوثّق كل مرحلة: الأساسات، الهيكل، التشطيبات. لا وعود غامضة — فيديوهات ورشة، مخططات واضحة، مرافقة حتى تسليم المفاتيح.',
      p2: 'مطابقة للقانون 04-11، عقد موثّق، بيان وصفي شفاف. الجالية بالخارج والسكان المحليون يمكنهم الشراء عن بعد بثقة عبر واتساب ومكالمات فيديو.',
      points: ['فيديوهات ورشة منتظمة', 'تشطيبات راقية', 'عقد موثّق آمن', 'متابعة واتساب 7/7'],
    },
    contact: {
      kicker: 'اتصل بنا',
      title: 'لنتحدث عن سكنك المستقبلي.',
      name: 'الاسم الكامل', phone: 'هاتف / واتساب', msg: 'رسالتك (مشروع، ميزانية، F2/F3/F4...)',
      send: 'أرسل عبر واتساب', info: 'رد خلال 24 ساعة — مكالمة فيديو للورشة ممكنة.',
    },
    admin: { kicker: 'إدارة', title: 'لوحة التحكم — قريباً في المرحلة 2', desc: 'نسخة العرض: بدون backend. في المرحلة 2: دخول، تسيير المشاريع عربي/فرنسي، رفع فيديو الرئيسية، الرسائل، الإحصائيات. التصميم الحالي جاهز للربط مع Supabase.' },
  },
}

const LangCtx = createContext(null)
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('fr')
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])
  const t = dict[lang]
  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>
}
export const useLang = () => useContext(LangCtx)
