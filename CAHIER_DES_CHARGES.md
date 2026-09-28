# Cahier des Charges — ZAOUCCHE Promotion Immobilière

**Projet :** Site vitrine + admin — promotion immobilière (Oran, Algérie)
**Références :** TikTok [@zaouche_promotion](https://www.tiktok.com/@zaouche_promotion) (647 abonnés) • Facebook (page partagée) • Tél commerciaux : 0771 03 51 53 / 0670 20 90 99
**Repo :** https://github.com/LaidiMohammed/zaouche-promotion
**Live :** https://zaouche-promotion.vercel.app (prod) • https://laidimohammed.github.io/zaouche-promotion/ (miroir)
**Version :** Phase 1 livrée (front + admin localStorage) • Phase 2 à venir (backend Supabase)
**Langues :** Français + Arabe (RTL)

---

## 1. Objectifs

1. Promouvoir les résidences Zaouche (vedette : **Résidence RIMAS** — 8 étages, F5 127 m², Hai Khemisti îlot 11, Bd Millenium, Oran).
2. Convertir visiteurs → contacts WhatsApp (0771 03 51 53) + formulaire avec boîte de réception admin.
3. Capitaliser sur TikTok : design immersif type feed, liens directs vers les vidéos.
4. Admin autonome : le promoteur modifie projets, vidéo home, coordonnées sans développeur.
5. Bilingue FR/AR pour public local + diaspora.

## 2. Périmètre

### Inclus (Phase 1 — livré)
- 5 pages publiques + navbar desktop top + bottom-bar mobile + page admin.
- Admin local (login code, dashboard, CRUD projets FR/AR, vidéo home, inbox messages, réglages, export/import JSON) persisté en `localStorage`.
- CI/CD : push `master` → Vercel (prod) + GitHub Pages (miroir).

### Phase 2 (backend — à chiffrer)
- Auth réelle, base partagée multi-appareils, upload médias, rôles, notifications.

### Exclu
- Paiement en ligne, espace client, multilingue au-delà FR/AR.

## 3. Architecture technique

| Couche | Phase 1 (actuel) | Phase 2 (cible) |
|---|---|---|
| Front | Vite 8 + React 19 + React Router (HashRouter) + TailwindCSS v4 + Framer Motion + Lucide | inchangé |
| État site | `src/admin/store.js` → `localStorage` clé `zaouche-site-v1` + event `zaouche-update` | Supabase (Postgres + Realtime) |
| Auth admin | code local (`zaouche2026`, sessionStorage) | Supabase Auth (email/mot de passe) |
| Médias | URLs distantes (Pexels/Unsplash) | Supabase Storage (buckets `projects`, `hero`) |
| Hébergement | Vercel + GitHub Pages | inchangé |
| CI | GitHub Actions → Vercel (`pull/build/deploy --prebuilt`) | inchangé |

Structure : `src/{components,pages,data,admin,i18n.jsx}` — voir README.

## 4. Spécifications Front-End (détail par page)

### 4.1 Global
- Thème dark `#0A0A0B` + doré `#C8A96A` + blanc cassé `#F4F1EA` ; fonts Space Grotesk + Cairo ; grain overlay ; aucune « card carrée IA » : feed snap, clips diagonaux, typo oversize, marquee, slider avant/après.
- Bilingue : toggle FR/ع, `dir=rtl` auto, dictionnaires `src/i18n.jsx`.
- Navbar desktop (logo Z + 4 liens + toggle langue + Admin discret) ; mobile bottom-bar 4 icônes Lucide (Home, Building2, Info, Mail) + safe-area.
- Responsive : mobile-first, bottom padding pour la bottom-bar.

### 4.2 Accueil `/`
1. Hero vidéo plein écran (autoplay/muet/loop/playsInline) + overlay dégradé + badge live + titre géant + sub + CTA « Voir les projets » / « WhatsApp direct » + 4 stats + hint swipe.
2. Marquee défilant (FR/AR).
3. Projet vedette (`projects[0]`, clip diagonal, CTA détail + tous projets).
4. Feed horizontal snap TikTok-style (cartes 9:16, badge statut, prix, CTA play).
5. Slider avant/après interactif.
6. Bandeau doré social → TikTok.

### 4.3 Nos Projets `/projets`
- Filtres Tous / En cours / Livrés ; lignes alternées image↔texte ; prix « à partir de » ; clic → détail.

### 4.4 Détail `/projet/:slug`
- Cover + badge statut + titre ; description ; galerie scroll ; encadré prix/wilaya/surface/type + CTA WhatsApp + TikTok ; fallback gracieux si slug inconnu ou liste vide.

### 4.5 À propos `/a-propos`
- Positionnement « promoteur qui montre tout », conformité loi 04-11 / acte notarié / EDD, 4 points de confiance.

### 4.6 Contact `/contact`
- Formulaire (nom/tél/message) → **sauvegarde inbox admin** + ouverture WhatsApp pré-rempli + message de confirmation ; cartes WhatsApp ×2, TikTok, Facebook.

### 4.7 Admin `/admin`
- Login code (défaut `zaouche2026`, changeable, session navigateur).
- Dashboard : compteurs (total/en cours/livrés/non lus) + actions rapides + reset démo.
- Projets : grille avec vignette, modifier (modale : statut, prix, surface, type, titres/descs/wilayas FR+AR, images 1 URL/ligne, slug auto), voir, supprimer (confirm), nouveau.
- Accueil : URL vidéo + poster avec preview live.
- Messages : liste (date FR-DZ, lu/non lu), réponse WhatsApp, marquer lu, supprimer.
- Réglages : 6 champs contact/réseaux, nouveau code (≥4 car.), export JSON (download), import JSON (validation), reset.
- Toutes modifs → `saveSite()` → event → **site mis à jour instantanément**.

## 5. Spécifications Back-End — Phase 2 (Supabase)

### 5.1 Tables
```sql
projects(id uuid pk, slug text unique, status text check (ongoing|delivered),
  price text, surface text, rooms text,
  title_fr text, title_ar text, wilaya_fr text, wilaya_ar text,
  desc_fr text, desc_ar text, images text[], featured int default 0,
  created_at timestamptz default now());
settings(id int pk check 1, whatsapp text, phone_label text, phone2_link text,
  phone2_label text, tiktok text, facebook text, video_home text, video_poster text);
messages(id uuid pk, name text, phone text, msg text, read bool default false,
  created_at timestamptz default now());
```

### 5.2 Auth & sécurité
- Supabase Auth, table `admins(user_id fk auth.users)` ; RLS : lecture publique `projects`/`settings` (statut publié), écriture réservée rôle admin ; `messages` insert public, select/update admin uniquement.
- Rate-limit formulaire (1/min/IP), validation longueur, sanitisation XSS (React l'échappe nativement).

### 5.3 Storage
- Buckets publics `projects/`, `hero/` (5 Mo img / 50 Mo vidéo, types mime limités) ; URLs publiques stockées en base ; migration : script d'import du JSON exporté.

### 5.4 Front-à-brancher
- Remplacer `src/admin/store.js` par client Supabase + Realtime (`postgres_changes`) ; login email via `signInWithPassword` ; garder le même shape de données (migration transparente pour les pages).

## 6. Design system
- Couleurs : ink `#0A0A0B`, coal `#131316`, sand `#C8A96A`, sandlight `#E8D5A3`, bone `#F4F1EA`.
- Icônes : Lucide uniquement (zéro emoji) ; tailles 14–22px contexte.
- Radius 2xl/3xl, bordures `white/10`, badges pill, boutons gold pleins + ghost.
- RTL : marquee inversé, font Cairo, alignements logiques.

## 7. Contenus réels intégrés
- RIMAS : 8 étages, F5 127 m², ascenseur, cuisine moderne, clim, télésurveillance, tranches de paiement, derniers 6e/7e/8e, Hai Khemisti îlot 11 Bd Millenium Oran, 0670-20-90-99 / 0771-03-51-53.
- **Manquant (à fournir)** : fichier logo (avatar TikTok non téléchargeable — CDN bloqué), prix exacts, autres résidences, vidéo home définitive.

## 8. SEO / Perf / Qualité
- Title/meta FR+AR, description TikTok, favicon Z, `og:` de base (À compléter : og:image, sitemap, robots).
- Build < 450 Ko JS gzip ~140 Ko ; images Unsplash `w=1200` ; vidéo Pexels streamée + poster.
- Critères d'acceptation : build vert, 0 emoji, FR+AR sans texte dur non traduit, Lighthouse mobile ≥ 85, formulaires → inbox + WhatsApp, admin CRUD reflected live, CI verte sur `master`.

## 9. Planning indicatif
- S1 : Phase 1 (livrée). S2 : contenus réels + logo + prix. S3 : backend Supabase (schéma, RLS, storage, branchement front, migration JSON). S4 : SEO/sitemap, durcissement, recette, transfert.

## 10. Prompt de génération (réutilisable avec une IA)

> Construis « ZAOUCCHE Promotion Immobilière », site vitrine immo bilingue FR/AR (RTL, fonts Space Grotesk + Cairo), stack Vite + React 19 + React Router + Tailwind v4 + Framer Motion + Lucide (zéro emoji), thème dark #0A0A0B + doré #C8A96A. Pages : Accueil (hero vidéo plein écran autoplay/muet/loop + stats + projet vedette + feed horizontal snap style TikTok + slider avant/après + bandeau TikTok), Nos Projets (filtres En cours/Livrés), Détail projet (galerie + encadré prix + CTA WhatsApp), À propos (loi 04-11, acte notarié), Contact (formulaire → inbox + WhatsApp pré-rempli), Admin /admin (code zaouche2026 : dashboard, CRUD projets FR/AR, vidéo home, inbox messages, réglages, export/import JSON, tout persisté et reflété live). Navbar desktop top + bottom-bar mobile (Accueil, Projets, À propos, Contact). Données : Résidence RIMAS Oran (F5 127 m², 8 étages, Hai Khemisti Bd Millenium), WhatsApp +213 771 03 51 53 / +213 670 20 90 99, TikTok @zaouche_promotion. Design anti-« cards IA » : sections diagonales, typo oversize, marquee, grain. Build `npm run build`, HashRouter, prêt Vercel + GitHub Pages.
