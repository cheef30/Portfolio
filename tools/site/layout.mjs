// Zajednički delovi podstranica: <head>, navigacija, meni, kontakt i futer, na srpskom i engleskom.
// Klase su iste kao na početnoj (css/style.css), a ono što je novo je u css/page.css.

export const SITE = 'https://stefanstevic.rs';
export const TEL = 'tel:+381645580188';
export const VIBER = 'viber://chat?number=%2B381645580188';
export const IG = 'https://www.instagram.com/stevke30/';
export const GH = 'https://github.com/cheef30';
export const EMAIL = 'stefanstevicoz30@gmail.com';

export const esc = (s) => String(s)
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

// Tekstovi rasporeda na oba jezika
export const T = {
  sr: {
    htmlLang: 'sr-Latn',
    ogLocale: 'sr_RS',
    ogAlt: 'Stefan Stević, web developer. Sajtovi i web aplikacije za firme.',
    home: '/',
    homeName: 'Početna',
    skip: 'Preskoči na sadržaj',
    brand: 'Stefan Stević, početna',
    navLabel: 'Glavna navigacija',
    nav: [['/radovi', 'Radovi', 'radovi'], ['/usluge', 'Usluge', 'usluge'], ['/kako-radim', 'Kako radim', 'proces'], ['/o-meni', 'O meni', 'o-meni']],
    contactLink: ['/kontakt', 'Kontakt'],
    faqLink: ['/pitanja', 'Česta pitanja'],
    langLabel: 'Jezik',
    navCta: 'Pišite mi',
    menu: 'Meni',
    quickLabel: 'Brz kontakt',
    call: 'Pozovite',
    phone: '064 558 0188',
    wa: 'https://wa.me/381645580188?text=Zdravo%20Stefane%2C%20pi%C5%A1em%20sa%20va%C5%A1eg%20sajta.%20Zanima%20me%20izrada%20sajta.',
    heroCta: 'Zatražite ponudu',
    crumbs: 'Putanja',
    asideTitle: 'Ukratko',
    waLine: 'WhatsApp ili Viber',
    faqTitle: 'Česta pitanja',
    faqSub: 'Ako ovde nema odgovora, pišite mi na Viber ili WhatsApp.',
    contactTitle: 'Recite mi šta vam treba.',
    contactIntro: 'Napišite mi ukratko čime se bavite i šta vam treba. Javiću se sa predlogom, okvirnom cenom i rokom.',
    fast: 'Najbrže odgovaram na WhatsApp-u i Viberu, obično istog dana.',
    orMail: 'Ili mejlom:',
    preferForm: 'Više volite formu?',
    sendEnquiry: 'Pošaljite upit',
    footerRole: 'Izrada sajtova, Obrenovac i Beograd',
    time: 'Vreme u Obrenovcu',
    hours: 'Radnim danima 9 do 20 h, subotom 10 do 16 h',
    toTop: 'Nazad na vrh',
    social: 'Društvene mreže i kontakt',
    servicesLabel: 'Usluge',
    footerLinks: [
      ['/usluge/izrada-sajta-za-firmu', 'Izrada sajta za firmu'],
      ['/usluge/izrada-web-aplikacija', 'Izrada web aplikacija'],
      ['/usluge/3d-konfigurator-i-animacije', '3D i animacije'],
      ['/usluge/odrzavanje-sajta', 'Održavanje sajta'],
      ['/cena-izrade-sajta', 'Cena izrade sajta', 'prices'],
      ['/izrada-sajta-obrenovac', 'Izrada sajta Obrenovac'],
      ['/izrada-sajta-beograd', 'Izrada sajta Beograd'],
    ],
  },
  en: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    ogAlt: 'Stefan Stević, web developer. Websites and web apps for businesses.',
    home: '/en',
    homeName: 'Home',
    skip: 'Skip to content',
    brand: 'Stefan Stević, home',
    navLabel: 'Main navigation',
    nav: [['/en/work', 'Work', 'radovi'], ['/en/services', 'Services', 'usluge'], ['/en/process', 'Process', 'proces'], ['/en/about', 'About', 'o-meni']],
    contactLink: ['/en/contact', 'Contact'],
    faqLink: ['/en/questions', 'Questions'],
    langLabel: 'Language',
    navCta: 'Get in touch',
    menu: 'Menu',
    quickLabel: 'Quick contact',
    call: 'Call',
    phone: '+381 64 558 0188',
    wa: 'https://wa.me/381645580188?text=Hi%20Stefan%2C%20I%20found%20you%20through%20your%20website.%20I%27d%20like%20to%20talk%20about%20a%20website.',
    heroCta: 'Get a quote',
    crumbs: 'Breadcrumb',
    asideTitle: 'In short',
    waLine: 'WhatsApp or Viber',
    faqTitle: 'Questions',
    faqSub: 'If your question isn’t here, message me on Viber or WhatsApp.',
    contactTitle: 'Tell me what you need.',
    contactIntro: 'Tell me briefly what your business does and what you need. I’ll get back to you with a proposal, a ballpark price and a timeline.',
    fast: 'I reply fastest on WhatsApp and Viber, usually the same day.',
    orMail: 'Or by email:',
    preferForm: 'Prefer a form?',
    sendEnquiry: 'Send an enquiry',
    footerRole: 'Web development, Obrenovac and Belgrade',
    time: 'Local time in Obrenovac',
    hours: 'Weekdays 9 am to 8 pm, Saturdays 10 am to 4 pm',
    toTop: 'Back to top',
    social: 'Social and contact',
    servicesLabel: 'Services',
    footerLinks: [
      ['/en/services/business-website', 'Business website'],
      ['/en/services/web-app-development', 'Web app development'],
      ['/en/services/3d-configurator-and-animation', '3D and motion'],
      ['/en/services/website-maintenance', 'Website maintenance'],
      ['/en/website-cost', 'Website cost', 'prices'],
      ['/en/web-design-obrenovac', 'Web design Obrenovac'],
      ['/en/web-design-belgrade', 'Web design Belgrade'],
    ],
  },
};

const arrow = '<svg aria-hidden="true"><use href="#i-arrow"/></svg>';
const ctaIcon = '<span class="cta__icon" aria-hidden="true"><svg><use href="#i-arrow"/></svg><svg><use href="#i-arrow"/></svg></span>';

export const cta = (href, text, mod = '') =>
  `<a class="cta${mod ? ' ' + mod : ''}" href="${href}"><span class="cta__text">${text}</span>${ctaIcon}</a>`;

export const quick = (t, mod = '') => `<ul class="quick${mod ? ' ' + mod : ''}" aria-label="${t.quickLabel}">
          <li><a class="quick__btn quick__btn--wa" href="${t.wa}" target="_blank" rel="noopener" data-tip="WhatsApp" aria-label="WhatsApp, ${t.phone}"><svg aria-hidden="true"><use href="#i-wa"/></svg></a></li>
          <li><a class="quick__btn quick__btn--viber" href="${VIBER}" data-tip="Viber" aria-label="Viber, ${t.phone}"><svg aria-hidden="true"><use href="#i-viber"/></svg></a></li>
          <li><a class="quick__btn quick__btn--tel" href="${TEL}" data-tip="${t.call}" aria-label="${t.call}, ${t.phone}"><svg aria-hidden="true"><use href="#i-phone"/></svg></a></li>
        </ul>`;

// alternates: { sr: '/putanja', en: '/en/path' } za hreflang
export function head({ lang, url, title, description, jsonld, v, alternates }) {
  const t = T[lang];
  const alt = alternates
    ? `
  <link rel="alternate" hreflang="sr-Latn" href="${SITE}${alternates.sr}">
  <link rel="alternate" hreflang="en" href="${SITE}${alternates.en}">
  <link rel="alternate" hreflang="x-default" href="${SITE}${alternates.sr}">`
    : '';
  return `<!doctype html>
<html lang="${t.htmlLang}" class="no-js">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="author" content="Stefan Stević">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <meta name="theme-color" content="#fec834">
  <meta name="color-scheme" content="light">

  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:site_name" content="Stefan Stević">
  <meta property="og:locale" content="${t.ogLocale}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="${SITE}/og-image.jpg">
  <meta property="og:image:alt" content="${esc(t.ogAlt)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${SITE}/og-image.jpg">

  <link rel="canonical" href="${url}">${alt}
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">

  <link rel="preload" href="/fonts/archivo-base.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/archivo-sr.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/css/style.css?v=${v['css/style.css']}">
  <link rel="stylesheet" href="/css/page.css?v=${v['css/page.css']}">

  <script>document.documentElement.classList.replace('no-js', 'js');</script>

  <script type="application/ld+json">
${JSON.stringify(jsonld, null, 2)}
  </script>
</head>`;
}

export function nav({ lang, section, alternates }) {
  const t = T[lang];
  const links = t.nav.map(([href, label, id]) =>
    `<a href="${href}"${id === section ? ' aria-current="true"' : ''}>${label}</a>`).join('\n        ');
  const menuLinks = [...t.nav, t.contactLink].map(([href, label]) =>
    `<li><a href="${href}">${label}</a></li>`).join('\n      ');
  const sr = alternates ? alternates.sr : '/';
  const en = alternates ? alternates.en : '/en';
  const cur = (l) => (l === lang ? ' aria-current="true"' : '');
  const switcher = `<div class="lang" role="group" aria-label="${t.langLabel}">
          <a href="${sr}" data-lang="sr" hreflang="sr-Latn"${cur('sr')}>SR</a>
          <a href="${en}" data-lang="en" hreflang="en"${cur('en')}>EN</a>
        </div>`;
  return `  <a class="skip" href="#main">${t.skip}</a>

  <header class="nav" data-nav>
    <div class="nav__bar">
      <a class="nav__brand" href="${t.home}" aria-label="${t.brand}"><svg class="logo" aria-hidden="true"><use href="#i-logo"/></svg><span>Stefan Stević</span></a>
      <nav class="nav__links" aria-label="${t.navLabel}">
        ${links}
      </nav>
      <div class="nav__end">
        ${switcher}
        <a class="btn btn--small nav__cta" href="#kontakt">${t.navCta}</a>
        <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="menu" data-menu-toggle>
          <span>${t.menu}</span>
          <span class="nav__toggle-icon" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  </header>

  <div class="menu" id="menu" data-menu>
    <ul class="menu__links">
      ${menuLinks}
    </ul>
    <div class="menu__quick">
      <a class="menu__phone" href="${TEL}">${t.phone}</a>
      ${quick(t, 'quick--menu')}
    </div>
    <div class="menu__foot">
      <a href="mailto:${EMAIL}">${EMAIL}</a>
      ${switcher}
    </div>
  </div>`;
}

// Žuti uvod na vrhu podstranice: putanja (breadcrumbs), naslov, kratak opis i dugmad
export function pageHero({ lang, crumbs, eyebrow, h1, lede, after = '', actions = true }) {
  const t = T[lang];
  const items = crumbs.map((c, i) => i < crumbs.length - 1
    ? `<li><a href="${c.url}">${c.name}</a></li>`
    : `<li><span aria-current="page">${c.name}</span></li>`).join('');
  return `    <section class="phero">
      <svg class="phero__mark" aria-hidden="true"><use href="#i-logo"/></svg>
      <div class="wrap phero__inner">
        <nav class="crumbs" aria-label="${t.crumbs}"><ol>${items}</ol></nav>
        <p class="phero__eyebrow">${eyebrow}</p>
        <h1 class="phero__title">${h1}</h1>
        <p class="phero__lede">${lede}</p>
        ${after}
        ${actions ? `<div class="phero__actions">
          ${cta('#kontakt', t.heroCta)}
          ${quick(t)}
        </div>` : ''}
      </div>
    </section>`;
}

// Bočna kartica uz tekst: kratki podaci i dugme
export function aside({ lang, title, facts = [], note = '', button }) {
  const t = T[lang];
  const rows = facts.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('\n            ');
  const [href, text] = button || ['#kontakt', t.heroCta];
  return `<aside class="paside">
          <p class="paside__title">${title || t.asideTitle}</p>
          ${rows ? `<dl class="paside__facts">
            ${rows}
          </dl>` : ''}
          ${note ? `<p class="paside__note">${note}</p>` : ''}
          ${cta(href, text, 'cta--sun cta--wide')}
          <a class="paside__wa" href="${t.wa}" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-wa"/></svg>${t.waLine}: ${t.phone}</a>
        </aside>`;
}

// Kartice sa linkovima (srodne usluge, drugi projekti)
export function cards({ title, sub = '', items }) {
  const list = items.map((c) => `<li>
            <a class="pcard" href="${c.url}">
              ${c.img ? `<span class="pcard__img"><img src="${c.img}" width="760" height="475" alt="" loading="lazy" decoding="async"></span>` : ''}
              ${c.kicker ? `<span class="pcard__kicker">${c.kicker}</span>` : ''}
              <span class="pcard__title">${c.title}</span>
              <span class="pcard__text">${c.text}</span>
              <span class="pcard__go" aria-hidden="true">${arrow}</span>
            </a>
          </li>`).join('\n          ');
  return `    <section class="section prel">
      <div class="wrap">
        <header class="prel__head">
          <h2 class="section-title">${title}</h2>
          ${sub ? `<p class="prel__sub">${sub}</p>` : ''}
        </header>
        <ul class="pcards">
          ${list}
        </ul>
      </div>
    </section>`;
}

export function faq({ lang, items }) {
  const t = T[lang];
  const list = items.map(([q, a], i) => {
    const n = String(i + 1).padStart(2, '0');
    return `<div class="faq__item" data-faq>
            <h3 class="faq__h"><button class="faq__q" type="button" aria-expanded="false" aria-controls="pfaq-${n}" id="pfaq-${n}-btn"><span class="faq__n" aria-hidden="true">${n}</span><span class="faq__text">${q}</span><span class="faq__icon" aria-hidden="true"></span></button></h3>
            <div class="faq__panel" id="pfaq-${n}" role="region" aria-labelledby="pfaq-${n}-btn"><div class="faq__inner"><p>${a}</p></div></div>
          </div>`;
  }).join('\n          ');
  return `    <section class="section faq" id="pitanja">
      <div class="wrap faq__grid">
        <header class="faq__head">
          <h2 class="section-title">${t.faqTitle}</h2>
          <p class="faq__sub">${t.faqSub}</p>
        </header>
        <div class="faq__list">
          ${list}
        </div>
      </div>
    </section>`;
}

export function contact({ lang, title, intro } = {}) {
  const t = T[lang];
  const ch = (mod, href, icon, name, value, ext) => `<li><a class="channel channel--${mod}" href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}>
                <span class="channel__icon"><svg aria-hidden="true"><use href="#i-${icon}"/></svg></span>
                <span class="channel__name">${name}</span>
                <span class="channel__value">${value}</span>
                <svg class="channel__arrow" aria-hidden="true"><use href="#i-out"/></svg>
              </a></li>`;
  return `    <section class="section contact pcontact" id="kontakt">
      <div class="wrap">
        <div class="contact__grid">
          <div class="contact__direct">
            <h2 class="contact__title">${title || t.contactTitle}</h2>
            <p class="contact__intro">${intro || t.contactIntro}</p>
            <p class="contact__fast"><span class="pulse" aria-hidden="true"></span><span>${t.fast}</span></p>
          </div>
          <div class="pcontact__side">
            <ul class="channels">
              ${ch('wa', t.wa, 'wa', 'WhatsApp', t.phone, true)}
              ${ch('viber', VIBER, 'viber', 'Viber', t.phone)}
              ${ch('tel', TEL, 'phone', t.call, t.phone)}
              ${ch('ig', IG, 'ig', 'Instagram', '@stevke30', true)}
            </ul>
            <div class="contact__mail">
              <p class="contact__mail-label">${t.orMail}</p>
              <a class="contact__email" href="mailto:${EMAIL}">${EMAIL}</a>
            </div>
            <p class="pcontact__form">${t.preferForm} ${cta(t.contactLink[0], t.sendEnquiry)}</p>
          </div>
        </div>
      </div>
    </section>`;
}

export function footer({ lang, showPrices }) {
  const t = T[lang];
  const nav = [...t.nav, t.faqLink].map(([href, label]) =>
    `<li><a href="${href}">${label}</a></li>`).join('\n        ');
  const links = t.footerLinks.filter((l) => l[2] !== 'prices' || showPrices)
    .map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('\n        ');
  return `  <footer class="footer">
    <div class="wrap footer__grid footer__grid--links">
      <p class="footer__brand"><svg class="logo footer__logo" aria-hidden="true"><use href="#i-logo"/></svg>Stefan Stević <span>${t.footerRole}</span></p>
      <ul class="footer__nav">
        ${nav}
      </ul>
      <ul class="footer__nav footer__links" aria-label="${t.servicesLabel}">
        ${links}
      </ul>
      <div class="footer__contact">
        <p class="footer__time"><span>${t.time}</span> <strong data-clock>--:--</strong></p>
        <p class="footer__hours">${t.hours}</p>
        <a class="footer__phone" href="${TEL}">${t.phone}</a>
        <a class="footer__mail" href="mailto:${EMAIL}">${EMAIL}</a>
      </div>
      <button class="footer__top" type="button" data-to-top>
        <span>${t.toTop}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
      </button>
    </div>
    <div class="wrap footer__bottom">
      <span>© 2026 Stefan Stević</span>
      <ul class="social" aria-label="${t.social}">
        <li><a href="${t.wa}" target="_blank" rel="noopener" aria-label="WhatsApp"><svg aria-hidden="true"><use href="#i-wa"/></svg></a></li>
        <li><a href="${VIBER}" aria-label="Viber"><svg aria-hidden="true"><use href="#i-viber"/></svg></a></li>
        <li><a href="${IG}" target="_blank" rel="noopener" aria-label="Instagram"><svg aria-hidden="true"><use href="#i-ig"/></svg></a></li>
        <li><a href="${GH}" target="_blank" rel="noopener" aria-label="GitHub"><svg aria-hidden="true"><use href="#i-gh"/></svg></a></li>
      </ul>
    </div>
  </footer>`;
}

export function scripts(v) {
  return `  <!-- Vercel Web Analytics (radi samo na Vercelu) -->
  <script>window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };</script>
  <script defer src="/_vercel/insights/script.js"></script>
  <script src="/js/page.js?v=${v['js/page.js']}" defer></script>`;
}
