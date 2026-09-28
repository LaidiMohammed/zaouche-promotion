export const TIKTOK_URL = 'https://www.tiktok.com/@zaouche_promotion'
export const FACEBOOK_URL = 'https://www.facebook.com/share/19QF9mTQp9/'
export const WHATSAPP = 'https://wa.me/213560000000?text=Bonjour%20Zaouche%20Promotion%20!'
export const PHONE_LABEL = '+213 560 00 00 00'

// Remplace VIDEO_HOME par ton vrai fichier : public/video-home.mp4
export const VIDEO_HOME =
  'https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4'
export const VIDEO_POSTER =
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600&auto=format&fit=crop'

const img = (id) => `https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`

export const projects = [
  {
    slug: 'residence-les-oliviers',
    status: 'ongoing',
    wilaya_fr: 'Alger — Draria', wilaya_ar: 'الجزائر — درارية',
    price: '1.85 Mds DA', surface: '78–142 m²', rooms: 'F2 → F4',
    title_fr: 'Résidence Les Oliviers', title_ar: 'إقامة الزيتون',
    desc_fr: 'Double ascenseur, parking sous-sol, façade ventilée, cuisine équipée. Gros œuvre terminé — finitions en cours filmées chaque semaine.',
    desc_ar: 'مصعد مزدوج، مرآب تحت الأرض، واجهة مهواة، مطبخ مجهز. الهيكل منتهي — التشطيبات جارية وتُصوَّر كل أسبوع.',
    images: [img('photo-1545324418-cc1a3fa10c00'), img('photo-1560448204-e02f11c3d0e2'), img('photo-1600607687939-ce8a6c25118c')],
  },
  {
    slug: 'residence-marina-bay',
    status: 'ongoing',
    wilaya_fr: 'Alger — Bordj El Kiffan', wilaya_ar: 'الجزائر — برج الكيفان',
    price: '2.40 Mds DA', surface: '95–180 m²', rooms: 'F3 → F5',
    title_fr: 'Résidence Marina Bay', title_ar: 'إقامة مارينا باي',
    desc_fr: 'Vue mer, piscine collective, spa, domotique. Idéale diaspora — visio chantier + paiement sécurisé notaire.',
    desc_ar: 'إطلالة على البحر، مسبح جماعي، سبا، منزل ذكي. مثالية للجالية — فيديو مباشر ودفع آمن عند الموثق.',
    images: [img('photo-1512917774080-9991f1c4c750'), img('photo-1600596542815-ffad4c1539a9'), img('photo-1600566753086-00f18fb6b3ea')],
  },
  {
    slug: 'residence-el-yasmine',
    status: 'delivered',
    wilaya_fr: 'Blida — Ouled Yaïch', wilaya_ar: 'البليدة — أولاد يعيش',
    price: '1.25 Mds DA', surface: '68–110 m²', rooms: 'F2 → F3',
    title_fr: 'Résidence El Yasmine', title_ar: 'إقامة الياسمين',
    desc_fr: 'Livrée 2024, 100% vendue. Façade blanche + moucharabieh moderne, cour arborée. Référence qualité Zaouche.',
    desc_ar: 'سُلّمت 2024، بيعت 100%. واجهة بيضاء + مشربية عصرية، فناء مشجّر. مرجع جودة زاوش.',
    images: [img('photo-1460317442991-0ec209397118'), img('photo-1502672260266-1c1ef2d93688'), img('photo-1600210492486-724fe5c67fb0')],
  },
  {
    slug: 'residence-hydra-park',
    status: 'ongoing',
    wilaya_fr: 'Alger — Hydra', wilaya_ar: 'الجزائر — حيدرة',
    price: '3.90 Mds DA', surface: '120–220 m²', rooms: 'F4 → Duplex',
    title_fr: 'Résidence Hydra Park', title_ar: 'إقامة حيدرة بارك',
    desc_fr: 'Standing premium : marbre, rooftop, conciergerie. 6 logements seulement — confidentialité totale.',
    desc_ar: 'فخامة عالية: رخام، سطح مشترك، بواب. 6 شقق فقط — خصوصية تامة.',
    images: [img('photo-1600585154340-be6161a56a0c'), img('photo-1600607687939-ce8a6c25118c'), img('photo-1486406146926-c627a92ad1ab')],
  },
  {
    slug: 'residence-cheraga-garden',
    status: 'delivered',
    wilaya_fr: 'Alger — Chéraga', wilaya_ar: 'الجزائر — شراقة',
    price: '1.60 Mds DA', surface: '82–130 m²', rooms: 'F3 → F4',
    title_fr: 'Résidence Chéraga Garden', title_ar: 'إقامة شراقة غاردن',
    desc_fr: 'Résidence fermée avec jardin, box parking, gardiennage. Livrée 2023, acte remis.',
    desc_ar: 'إقامة مغلقة بحديقة، مرآب خاص، حراسة. سُلّمت 2023 مع العقود.',
    images: [img('photo-1600047509807-ba8f99d2cdde'), img('photo-1560448204-e02f11c3d0e2'), img('photo-1600566753086-00f18fb6b3ea')],
  },
  {
    slug: 'residence-oran-front-mer',
    status: 'ongoing',
    wilaya_fr: 'Oran — Bir El Djir', wilaya_ar: 'وهران — بير الجير',
    price: '1.95 Mds DA', surface: '88–150 m²', rooms: 'F3 → F4',
    title_fr: "Résidence Oran Front-Mer", title_ar: 'إقامة وهران واجهة البحر',
    desc_fr: 'Nouvelle extension Oran. Balcons filants, parking sécurisé, commerces RDC. Lancement TikTok en exclusivité.',
    desc_ar: 'توسعة جديدة بوهران. شرفات ممتدة، مرآب مؤمّن، محلات بالطابق الأرضي. الإطلاق حصرياً على تيك توك.',
    images: [img('photo-1512917774080-9991f1c4c750'), img('photo-1502672260266-1c1ef2d93688'), img('photo-1600585154340-be6161a56a0c')],
  },
]
