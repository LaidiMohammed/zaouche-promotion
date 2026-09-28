export const TIKTOK_URL = 'https://www.tiktok.com/@zaouche_promotion'
export const FACEBOOK_URL = 'https://www.facebook.com/share/19QF9mTQp9/'
export const WHATSAPP = 'https://wa.me/213771035153?text=Bonjour%20Zaouche%20Promotion%20!'
export const PHONE_LABEL = '+213 771 03 51 53'
export const PHONE2_LABEL = '+213 670 20 90 99'

// Vidéo réelle TikTok @zaouche_promotion (Résidence Rimas, Oran)
export const VIDEO_HOME = './video-rimas.mp4'
export const VIDEO_POSTER = './real/rimas-cover.jpg'

const img = (id) => `https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`

export const projects = [
  {
    slug: 'residence-rimas',
    status: 'ongoing',
    wilaya_fr: 'Oran — Hai Khemisti, Bd Millenium', wilaya_ar: 'وهران — حي خميستي، شارع ميلينيوم',
    price: 'Prix sur appel', surface: '127 m²', rooms: 'F5',
    title_fr: 'Résidence Rimas', title_ar: 'إقامة ريماس',
    desc_fr: "8 étages, appartement par palier. Cuisine moderne, climatisé, ascenseur, télésurveillance, matériaux de qualité. Paiement par tranches selon l'avancement des travaux. Derniers disponibles : 6ème, 7ème et 8ème étage.",
    desc_ar: '8 طوابق، شقة في كل طابق. مطبخ عصري، تكييف، مصعد، مراقبة بالكاميرات، مواد عالية الجودة. الدفع بالتقسيط حسب تقدم الأشغال. المتبقي: الطوابق 6 و7 و8.',
    images: ['./real/rimas-cover.jpg', './real/chantier-80.jpg', img('photo-1600607687939-ce8a6c25118c')],
  },
  {
    slug: 'f4-haut-standing',
    status: 'ongoing',
    wilaya_fr: 'Oran', wilaya_ar: 'وهران',
    price: 'Prix sur appel', surface: '—', rooms: 'F4',
    title_fr: 'F4 Haut Standing', title_ar: 'شقة F4 راقية',
    desc_fr: "Appartements F4 haut standing présentés sur TikTok. Finitions soignées, appelez pour visiter et connaître les disponibilités.",
    desc_ar: 'شقق F4 راقية معروضة على تيك توك. تشطيبات متقنة، اتصلوا للزيارة ومعرفة المتوفر.',
    images: ['./real/f4-standing-1.jpg', img('photo-1560448204-e02f11c3d0e2'), img('photo-1600566753086-00f18fb6b3ea')],
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
