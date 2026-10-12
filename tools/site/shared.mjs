// Podaci koje dele srpske (pages.mjs) i engleske (pages.en.mjs) podstranice:
// cene, projekti i slike, utisci klijenata i pomoćnici za ponavljajuće delove.

import { EN } from './en.mjs';

// Cene su iste kao u lib/assistant-prompt.js (OKVIRNE CENE).
// Ako ne želiš javne cene: stavi SHOW_PRICES = false i pokreni build.
// Tada stranica sa cenama ne nastaje (ni srpska ni engleska), a cene nestaju i sa ostalih stranica.
export const SHOW_PRICES = true;

export const UPDATED = '2026-10-12';

const PRICES = {
  vizitkarta: {
    min: 150, max: 300,
    sr: { name: 'Vizitkarta', label: 'od 150 do 300 €', time: '5 do 10 dana' },
    en: { name: 'One-page site', label: '€150 to €300', time: '5 to 10 days' },
  },
  firma: {
    min: 300, max: 500,
    sr: { name: 'Sajt za firmu', label: 'od 300 do 500 €', time: '2 do 3 nedelje' },
    en: { name: 'Business website', label: '€300 to €500', time: '2 to 3 weeks' },
  },
  admin: {
    min: 500, max: 1000,
    sr: { name: 'Sajt koji sami menjate', label: 'od 500 do 1.000 €', time: '3 do 4 nedelje' },
    en: { name: 'Self-managed website', label: '€500 to €1,000', time: '3 to 4 weeks' },
  },
  app: {
    min: 1200, max: 2500,
    sr: { name: 'Web aplikacija', label: 'od 1.200 do 2.500 €', time: '4 do 8 nedelja' },
    en: { name: 'Web application', label: '€1,200 to €2,500', time: '4 to 8 weeks' },
  },
  premium: {
    min: 500,
    sr: { name: 'Premium prikaz (3D i animacije)', label: 'od 500 €, zavisno od obima', short: 'od 500 €', time: 'dogovara se' },
    en: { name: 'Premium (3D and motion)', label: 'from €500, depending on scope', short: 'from €500', time: 'agreed per project' },
  },
  odrzavanje: {
    min: 20, max: 50,
    sr: { name: 'Održavanje', label: 'od 20 do 50 € mesečno' },
    en: { name: 'Maintenance', label: '€20 to €50 a month' },
  },
};

// cene na jednom jeziku: prices('sr').firma.label, prices('en').app.time ...
export const prices = (lang) => Object.fromEntries(Object.entries(PRICES).map(([k, v]) => [k, { min: v.min, max: v.max, ...v[lang] }]));

/* ---------- projekti (iste slike kao na početnoj) ---------- */
const P = (key, data) => ({
  ...data,
  sr: data.sr,
  en: {
    kind: EN[`${key}.kind`],
    desktopAlt: EN[`${key}.alt1`],
    mobileAlt: EN[`${key}.alt2`],
    detailAlt: EN[`${key}.alt3`],
    cap: EN[`${key}.cap`],
  },
});

export const PROJECTS = {
  modus: P('modus', {
    slug: 'modus-gradnja', name: 'Modus Gradnja', site: 'https://modusgradnja.rs', host: 'modusgradnja.rs',
    bg: '#141518', accent: '#c9a86a', sb: '#111317', sbFg: '#fff',
    desktop: 'modus-desktop', mobile: 'modus-mobile', detail: 'modus-config', detailW: 1226, detailH: 636, card: 'modus-desktop-760',
    sr: {
      kind: 'Investitor i izvođač stambenih objekata',
      desktopAlt: 'Početna stranica sajta Modus Gradnja',
      mobileAlt: 'Modus Gradnja na telefonu',
      detailAlt: '3D konfigurator stanova sa osnovom sprata',
      cap: 'Konfigurator: izabran drugi sprat, šematska osnova i lista stanova sa cenama.',
    },
  }),
  naizlet: P('naizlet', {
    slug: 'na-izlet', name: 'Na Izlet', site: 'https://naizlet.rs', host: 'naizlet.rs',
    bg: '#0d2133', accent: '#f2803b', sb: '#103751', sbFg: '#fff',
    desktop: 'naizlet-cards', mobile: 'naizlet-mobile', detail: 'naizlet-trip', detailW: 1366, detailH: 854, card: 'naizlet-cards-760',
    sr: {
      kind: 'Turistička agencija, Beograd',
      desktopAlt: 'Kalendar putovanja na sajtu Na Izlet',
      mobileAlt: 'Na Izlet na telefonu',
      detailAlt: 'Stranica putovanja sa cenom i terminom',
      cap: 'Stranica putovanja: program, cena, sledeći termin i prijava na jednom mestu.',
    },
  }),
  leto: P('leto', {
    slug: 'leto-u-turskoj', name: 'Leto u Turskoj', site: 'https://letouturskoj.rs', host: 'letouturskoj.rs',
    bg: '#0c1c30', accent: '#ffab2e', sb: '#141f3a', sbFg: '#fff',
    desktop: 'leto-dest', mobile: 'leto-mobile', detail: 'leto-hero', detailW: 1366, detailH: 612, card: 'leto-dest-760',
    sr: {
      kind: 'Turistička agencija za putovanja u Tursku',
      desktopAlt: 'Destinacije sa filterima na sajtu Leto u Turskoj',
      mobileAlt: 'Leto u Turskoj na telefonu',
      detailAlt: 'Početni ekran sajta Leto u Turskoj',
      cap: 'Početni ekran: jedna poruka, jedno dugme i izbor letovanja avionom ili autobusom.',
    },
  }),
  toma: P('toma', {
    slug: 'tomasevacka', name: 'Tomaševačka', site: 'https://cheef30.github.io/tomasevacka/', host: 'cheef30.github.io/tomasevacka',
    bg: '#1c1511', accent: '#dcaa5e', sb: '#1c1511', sbFg: '#fff',
    desktop: 'toma-pour', mobile: 'toma-mobile', detail: 'toma-desktop', detailW: 1366, detailH: 854, card: 'toma-pour-760',
    sr: {
      kind: 'Domaća voćna rakija iz Tomaševca',
      desktopAlt: 'Kadar 68 od 121: rakija se sipa u čašu',
      mobileAlt: 'Tomaševačka na telefonu',
      detailAlt: 'Početni ekran sa nazivom na ćirilici',
      cap: 'Početni ekran. Ceo sajt je na ćirilici, uključujući navigaciju i dugmad.',
    },
  }),
  pro: P('pro', {
    slug: 'pro-klima-obrenovac', name: 'PRO KLIMA Obrenovac', site: 'https://cheef30.github.io/proklima-obrenovac/', host: 'cheef30.github.io/proklima-obrenovac',
    bg: '#0a1530', accent: '#5b9bff', sb: '#ffffff', sbFg: '#0b1324',
    desktop: 'proklima-desktop', mobile: 'proklima-mobile', detail: 'proklima-gallery', detailW: 1366, detailH: 854, card: 'proklima-desktop-760',
    sr: {
      kind: 'Ugradnja i servis klima uređaja',
      desktopAlt: 'Početna stranica redizajna za PRO KLIMA',
      mobileAlt: 'PRO KLIMA na telefonu, sa dugmetom za poziv',
      detailAlt: 'Galerija radova sa filterima po vrsti posla',
      cap: 'Galerija sa terena: 41 urađen posao, sa filterima po vrsti posla.',
    },
  }),
};

// adresa projekta na jeziku: /radovi/modus-gradnja ili /en/work/modus-gradnja
export const workPath = (key, lang) => (lang === 'en' ? '/en/work/' : '/radovi/') + PROJECTS[key].slug;

/* ---------- utisci klijenata (srpski su i na početnoj, engleski u en.mjs) ---------- */
const QUOTES = {
  sr: {
    modus: 'Ljudi nas sad zovu kad su već izabrali stan, ne moramo više svakom da šaljemo PDF-ove. A kad prodamo neki stan, samo javimo Stefanu i to bude sređeno isti dan.',
    naizlet: 'Najviše nam znači što sad sami ubacimo novi polazak i cenu i ne čekamo nikoga. I sajt se na telefonu konačno otvara kako treba.',
    leto: 'Objasnili smo mu u jednom pozivu šta hoćemo i to je bilo to, bez natezanja. Sajt je baš onakav kakav smo zamislili, i na srpskom i na engleskom.',
  },
  en: { modus: EN['voices.q1'], naizlet: EN['voices.q2'], leto: EN['voices.q3'] },
};

export const quote = (key, lang) => `<figure class="pquote">
            <blockquote><p>${QUOTES[lang][key]}</p></blockquote>
            <figcaption>${PROJECTS[key].name}</figcaption>
          </figure>`;

/* ---------- ekrani projekta ---------- */
export function media(key, lang) {
  const p = PROJECTS[key];
  const t = p[lang];
  const big = String(p.detailW);
  return `    <section class="pmedia" style="--work-bg:${p.bg};--accent:${p.accent}">
      <div class="wrap pmedia__inner project__media">
        <a class="shot shot--browser" href="${p.site}" target="_blank" rel="noopener">
          <span class="shot__bar"><span class="shot__dots"><i></i><i></i><i></i></span><span class="shot__url">${p.host}</span></span>
          <img src="/img/work/${p.desktop}-1366.webp" srcset="/img/work/${p.desktop}-760.webp 760w, /img/work/${p.desktop}-1366.webp 1366w" sizes="(min-width: 1180px) 1100px, 92vw" width="1366" height="854" alt="${t.desktopAlt}" fetchpriority="high" decoding="async">
        </a>
        <div class="project__pair">
          <div class="phone" style="--sb:${p.sb};--sb-fg:${p.sbFg}">
            <div class="phone__screen">
              <span class="phone__bar" aria-hidden="true"><span class="phone__time">9:41</span><i class="phone__island"></i><span class="phone__sys"><i></i><b></b></span></span>
              <img src="/img/work/${p.mobile}-780.webp" srcset="/img/work/${p.mobile}-420.webp 420w, /img/work/${p.mobile}-780.webp 780w" sizes="(min-width: 1180px) 360px, 42vw" width="780" height="1688" alt="${t.mobileAlt}" loading="lazy" decoding="async">
            </div>
          </div>
          <figure class="detail">
            <div class="shot"><img src="/img/work/${p.detail}-${big}.webp" srcset="/img/work/${p.detail}-760.webp 760w, /img/work/${p.detail}-${big}.webp ${big}w" sizes="(min-width: 1180px) 720px, 52vw" width="${p.detailW}" height="${p.detailH}" alt="${t.detailAlt}" loading="lazy" decoding="async"></div>
            <figcaption class="media-caption">${t.cap}</figcaption>
          </figure>
        </div>
      </div>
    </section>`;
}

export const tags = (list) => list.map((t) => `<span class="ptag">${t}</span>`).join(' ');

export const projectMeta = (key, rows, linkText) => {
  const p = PROJECTS[key];
  return `<dl class="phero__meta">
          ${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('\n          ')}
        </dl>
        <a class="btn btn--line phero__site" href="${p.site}" target="_blank" rel="noopener">${linkText || p.host}<svg aria-hidden="true"><use href="#i-out"/></svg></a>`;
};

// kartice "Još radova" (svi projekti osim trenutnog)
export const otherProjects = (except, lang, title, sub, texts) => ({
  title,
  sub,
  items: Object.keys(PROJECTS).filter((k) => k !== except).map((k) => ({
    url: workPath(k, lang),
    img: `/img/work/${PROJECTS[k].card}.webp`,
    kicker: PROJECTS[k][lang].kind,
    title: PROJECTS[k].name,
    text: texts[k],
  })),
});

/* ---------- JSON-LD ---------- */
const SITE = 'https://stefanstevic.rs';
const AREA = {
  sr: [{ '@type': 'City', name: 'Obrenovac' }, { '@type': 'City', name: 'Beograd' }, { '@type': 'Country', name: 'Srbija' }],
  en: [{ '@type': 'City', name: 'Obrenovac' }, { '@type': 'City', name: 'Belgrade' }, { '@type': 'Country', name: 'Serbia' }],
};

export const serviceSchema = (lang, name, description, path, area) => ({
  '@type': 'Service',
  '@id': `${SITE}${path}#service`,
  name,
  description,
  url: SITE + path,
  serviceType: name,
  provider: { '@id': `${SITE}/#usluga` },
  areaServed: area || AREA[lang],
});

export const offer = (pr) => ({
  '@type': 'Offer',
  name: pr.name,
  priceCurrency: 'EUR',
  priceSpecification: {
    '@type': 'PriceSpecification',
    priceCurrency: 'EUR',
    minPrice: pr.min,
    ...(pr.max ? { maxPrice: pr.max } : {}),
  },
});

export const workSchema = (key, lang, about, description) => {
  const p = PROJECTS[key];
  const url = SITE + workPath(key, lang);
  return {
    '@type': 'CreativeWork',
    '@id': `${url}#work`,
    name: p.name,
    description,
    about,
    url,
    image: `${SITE}/img/work/${p.desktop}-1366.webp`,
    dateCreated: '2026',
    inLanguage: lang === 'en' ? 'en' : 'sr-Latn',
    creator: { '@id': `${SITE}/#stefan` },
    sameAs: p.site,
  };
};
