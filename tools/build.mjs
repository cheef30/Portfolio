// Pravi sve što se ne piše ručno. Pokreni posle svake izmene:
//
//   node tools/build.mjs
//
// 1. dodaje ?v=<hash> na CSS i JS u index.html (da browser ne drži staru verziju)
// 2. pravi en/index.html: engleska početna, iz index.html + tools/site/en.mjs
// 3. pravi podstranice: srpske iz tools/site/pages.mjs, engleske iz tools/site/pages.en.mjs
//    (stranice sa istim `id` su par i povezane su hreflang oznakama)
// 4. pravi sitemap.xml i proverava da li svi interni linkovi vode na postojeću stranicu
//
// Bez npm paketa, treba samo Node 18 ili noviji.

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { EN, META_EN, JSONLD_EN } from './site/en.mjs';
import { PAGES as PAGES_SR } from './site/pages.mjs';
import { PAGES as PAGES_EN } from './site/pages.en.mjs';
import { SHOW_PRICES } from './site/shared.mjs';
import * as L from './site/layout.mjs';

const PAGES = [...PAGES_SR, ...PAGES_EN];
// parovi po id: { obrenovac: { sr: '/izrada-sajta-obrenovac', en: '/en/web-design-obrenovac' }, ... }
const PAIRS = {};
for (const p of PAGES) (PAIRS[p.id] ||= {})[p.lang] = p.path;
const alternatesOf = (p) => (PAIRS[p.id].sr && PAIRS[p.id].en ? PAIRS[p.id] : null);

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = L.SITE;
const HOME_UPDATED = '2026-10-12';
const MANIFEST = 'tools/site/generated.json';

const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const write = (f, s) => {
  const p = path.join(ROOT, f);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  const old = fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null;
  if (old !== s) fs.writeFileSync(p, s);
  return old !== s;
};
const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const strip = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const warnings = [];

/* ---------- 1. verzije fajlova ---------- */
const ASSETS = ['css/style.css', 'css/page.css', 'js/main.js', 'js/chat.js', 'js/page.js'];
const v = {};
for (const a of ASSETS) {
  v[a] = crypto.createHash('sha1').update(fs.readFileSync(path.join(ROOT, a))).digest('hex').slice(0, 8);
}

let index = read('index.html');
for (const a of ['css/style.css', 'js/main.js', 'js/chat.js']) {
  const re = new RegExp(reEsc(a) + '(\\?v=[0-9a-f]+)?"', 'g');
  const n = (index.match(re) || []).length;
  if (n !== 1) throw new Error(`index.html: ${a} se pojavljuje ${n} puta`);
  index = index.replace(re, `${a}?v=${v[a]}"`);
}
const changed = [];
if (write('index.html', index)) changed.push('index.html');

const spriteMatch = index.match(/[ \t]*<svg class="sprite"[\s\S]*?<\/svg>/);
if (!spriteMatch) throw new Error('index.html: nema <svg class="sprite">');
const SPRITE = spriteMatch[0].replace(/\r\n/g, '\n');

/* ---------- HTML pomoćnici ---------- */
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);

// kraj elementa koji počinje na `start` (indeks znaka "<")
function elementEnd(s, start) {
  const open = s.slice(start).match(/^<([a-z0-9-]+)\b[^>]*>/i);
  const tag = open[1].toLowerCase();
  const openEnd = start + open[0].length;
  if (VOID.has(tag)) return { openEnd, innerEnd: openEnd, end: openEnd };
  const re = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'gi');
  re.lastIndex = openEnd;
  let depth = 1;
  let m;
  while ((m = re.exec(s))) {
    depth += m[1] ? -1 : 1;
    if (depth === 0) return { openEnd, innerEnd: m.index, end: re.lastIndex };
  }
  throw new Error(`nije zatvoren <${tag}> na ${start}`);
}

function removeMarked(s, attr) {
  const re = new RegExp(`<[a-z0-9-]+\\b[^>]*\\s${reEsc(attr)}[^>]*>`, 'i');
  let m;
  while ((m = re.exec(s))) {
    const { end } = elementEnd(s, m.index);
    // skini i uvlačenje i prazan red ispred elementa
    let from = m.index;
    while (from > 0 && (s[from - 1] === ' ' || s[from - 1] === '\t')) from--;
    if (s.slice(from - 2, from) === '\r\n') from -= 2;
    else if (s[from - 1] === '\n') from -= 1;
    s = s.slice(0, from) + s.slice(end);
  }
  return s;
}

const setAttr = (tag, name, value) => {
  const re = new RegExp(`(\\s${reEsc(name)}=")[^"]*(")`);
  return re.test(tag) ? tag.replace(re, `$1${value}$2`) : tag.replace(/\s*\/?>$/, (end) => ` ${name}="${value}"${end}`);
};

function translate(s) {
  // sadržaj elemenata sa data-i18n
  const re = /<([a-z0-9-]+)\b[^>]*\sdata-i18n="([^"]+)"[^>]*>/gi;
  let out = '';
  let pos = 0;
  let m;
  while ((m = re.exec(s))) {
    const key = m[2];
    const { openEnd, innerEnd, end } = elementEnd(s, m.index);
    const openTag = s.slice(m.index, openEnd).replace(/\sdata-i18n="[^"]*"/, '');
    let inner = s.slice(openEnd, innerEnd);
    if (EN[key] === undefined) warnings.push(`EN nema ključ "${key}"`);
    else inner = EN[key];
    out += s.slice(pos, m.index) + openTag + inner + s.slice(innerEnd, end);
    pos = end;
    re.lastIndex = end;
  }
  s = out + s.slice(pos);

  // atributi iz data-i18n-attr="alt:kljuc|aria-label:kljuc"
  return s.replace(/<[a-z0-9-]+\b[^>]*\sdata-i18n-attr="([^"]+)"[^>]*>/gi, (tag, spec) => {
    let t = tag.replace(/\sdata-i18n-attr="[^"]*"/, '');
    for (const pair of spec.split('|')) {
      const [attr, key] = pair.split(':');
      if (EN[key] === undefined) warnings.push(`EN nema ključ "${key}"`);
      else t = setAttr(t, attr, L.esc(EN[key]).replace(/&amp;(?=[a-z#0-9]+;)/gi, '&'));
    }
    return t;
  });
}

// relativne putanje (css/..., img/...) u apsolutne, jer /en nije u korenu
function absolutize(s) {
  const fix = (u) => (/^([a-z][a-z0-9+.-]*:|\/|#|\?)/i.test(u) ? u : '/' + u);
  s = s.replace(/(\s(?:src|href|data-preview)=")([^"]+)"/g, (all, a, u) => `${a}${fix(u)}"`);
  return s.replace(/(\s(?:srcset|imagesrcset)=")([^"]+)"/g, (all, a, list) =>
    `${a}${list.split(',').map((part) => {
      const [u, ...rest] = part.trim().split(/\s+/);
      return [fix(u), ...rest].join(' ');
    }).join(', ')}"`);
}

/* ---------- 2. engleska početna ---------- */
function jsonldEn(json) {
  const data = JSON.parse(json);
  for (const node of data['@graph']) {
    if (node['@type'] === 'Person' && node.alumniOf) node.alumniOf.name = JSONLD_EN.alumni;
    if (node['@type'] === 'ProfessionalService') {
      node.name = JSONLD_EN.serviceName;
      node.description = JSONLD_EN.serviceDescription;
      node.url = `${SITE}/en`;
      node.hasOfferCatalog.name = JSONLD_EN.catalogName;
      node.hasOfferCatalog.itemListElement.forEach((o, i) => {
        if (!JSONLD_EN.offers[i]) return;
        o.itemOffered.name = JSONLD_EN.offers[i].name;
        o.itemOffered.description = JSONLD_EN.offers[i].description;
      });
    }
    if (node['@type'] === 'FAQPage') {
      node['@id'] = `${SITE}/en#questions`;
      node.mainEntity = node.mainEntity.map((q, i) => ({
        ...q,
        name: strip(EN[`faq.q${i + 1}`]),
        acceptedAnswer: { ...q.acceptedAnswer, text: strip(EN[`faq.a${i + 1}`]) },
      }));
    }
  }
  return JSON.stringify(data, null, 2);
}

function buildEn(src) {
  let s = src;
  const head = (re, value) => {
    if (!re.test(s)) throw new Error('EN: nije nađeno ' + re);
    s = s.replace(re, value);
  };
  const content = (sel, value) => head(new RegExp(`(<meta ${reEsc(sel)} content=")[^"]*(")`), `$1${L.esc(value)}$2`);

  head(/<html lang="sr-Latn"/, '<html lang="en"');
  head(/<title>[^<]*<\/title>/, `<title>${L.esc(EN['meta.title'])}</title>`);
  content('name="description"', META_EN.description);
  content('property="og:url"', `${SITE}/en`);
  content('property="og:locale"', 'en_US');
  content('property="og:locale:alternate"', 'sr_RS');
  content('property="og:title"', META_EN.ogTitle);
  content('property="og:description"', META_EN.ogDescription);
  content('property="og:image:alt"', META_EN.ogImageAlt);
  content('name="twitter:title"', META_EN.ogTitle);
  content('name="twitter:description"', META_EN.ogDescription);
  head(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${SITE}/en">`);
  head(/(<script type="application\/ld\+json">\s*)([\s\S]*?)(\s*<\/script>)/, (all, a, json, b) => a + jsonldEn(json) + b);
  s = s.replace(/<!-- Društvene mreže\.[^>]*-->\r?\n/, '');

  s = removeMarked(s, 'data-only="sr"');
  s = s.replace(/ footer__grid--links"/, '"');
  s = translate(s);

  // SR/EN prekidač: trenutni jezik je engleski
  s = s.split('data-lang="sr" hreflang="sr-Latn" aria-current="true"').join('data-lang="sr" hreflang="sr-Latn"');
  s = s.split('data-lang="en" hreflang="en">').join('data-lang="en" hreflang="en" aria-current="true">');

  // linkovi ka srpskim podstranicama vode na njihove engleske verzije
  for (const pair of Object.values(PAIRS)) {
    if (pair.sr && pair.en) s = s.split(`href="${pair.sr}"`).join(`href="${pair.en}"`);
  }

  s = absolutize(s);
  s = s.replace(/<head>/, '<head>\n  <!-- Ovaj fajl pravi tools/build.mjs iz index.html i tools/site/en.mjs. Ne menjaj ga ručno. -->');
  return s;
}

const en = buildEn(index);
// provera: da li je ostalo nešto na srpskom što nema prevod
for (const word of ['Pišite mi', 'Pogledajte', 'Zatražite', 'Usluge', 'Kontakt', 'Česta pitanja', 'Pošalji']) {
  const body = en.slice(en.indexOf('<body')).replace(/<!--[\s\S]*?-->/g, '');
  if (body.includes(word)) warnings.push(`en/index.html još sadrži "${word}"`);
}
if (write('en/index.html', en)) changed.push('en/index.html');

/* ---------- 3. podstranice ---------- */
function renderPage(page) {
  const lang = page.lang;
  const url = SITE + page.path;
  const alternates = alternatesOf(page);
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: page.crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url ? SITE + c.url : url,
    })),
  };
  const webpage = {
    '@type': 'WebPage',
    '@id': `${url}#page`,
    url,
    name: page.title,
    description: page.description,
    inLanguage: lang === 'en' ? 'en' : 'sr-Latn',
    dateModified: page.updated,
    isPartOf: { '@id': `${SITE}/#website` },
    breadcrumb: { '@id': `${url}#breadcrumb` },
    ...(page.schema && page.schema[0] ? { mainEntity: { '@id': page.schema[0]['@id'] } } : {}),
  };
  const faqNode = page.faq && {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: page.faq.map(([q, a]) => ({
      '@type': 'Question',
      name: strip(q),
      acceptedAnswer: { '@type': 'Answer', text: strip(a) },
    })),
  };
  const jsonld = { '@context': 'https://schema.org', '@graph': [webpage, breadcrumb, ...(page.schema || []), faqNode].filter(Boolean) };
  const source = lang === 'en' ? 'tools/site/pages.en.mjs' : 'tools/site/pages.mjs';

  return `${L.head({ lang, url, title: page.title, description: page.description, jsonld, v, alternates })}
<!-- Ovaj fajl pravi tools/build.mjs iz ${source}. Ne menjaj ga ručno. -->
<body class="page">
${SPRITE}

${L.nav({ lang, section: page.section, alternates })}

  <main id="main">
${L.pageHero({ lang, crumbs: page.crumbs, ...page.hero })}
${page.media || ''}
${page.extraFirst && page.extra ? page.extra : ''}
    <section class="section pbody">
      <div class="wrap pbody__grid">
        <div class="prose">
          ${page.body}
        </div>
        ${L.aside({ lang, ...(page.aside || {}) })}
      </div>
    </section>
${!page.extraFirst && page.extra ? page.extra : ''}
${page.faq ? L.faq({ lang, items: page.faq }) : ''}
${page.related ? L.cards(page.related) : ''}
${L.contact({ lang, ...(page.contact || {}) })}
  </main>

${L.footer({ lang, showPrices: SHOW_PRICES })}

${L.scripts(v)}
</body>
</html>
`.replace(/\n{3,}/g, '\n\n');
}

const files = ['en/index.html'];
const outputs = { 'index.html': index, 'en/index.html': en };
for (const page of PAGES) {
  files.push(page.file);
  const html = renderPage(page);
  outputs[page.file] = html;
  if (write(page.file, html)) changed.push(page.file);
}

// obriši stranice koje je prethodni build napravio, a ovaj više ne pravi
const before = fs.existsSync(path.join(ROOT, MANIFEST)) ? JSON.parse(read(MANIFEST)) : [];
for (const f of before) {
  if (!files.includes(f) && fs.existsSync(path.join(ROOT, f))) {
    fs.unlinkSync(path.join(ROOT, f));
    changed.push(`${f} (obrisan)`);
  }
}
write(MANIFEST, JSON.stringify(files, null, 2) + '\n');

/* ---------- 4. sitemap.xml ---------- */
const altLinks = (pair) => `
    <xhtml:link rel="alternate" hreflang="sr-Latn" href="${SITE}${pair.sr}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE}${pair.en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${pair.sr}"/>`;
const entry = (loc, lastmod, pair) => `  <url>\n    <loc>${SITE}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>${pair ? altLinks(pair) : ''}\n  </url>`;
const homePair = { sr: '/', en: '/en' };
const urls = [
  entry('/', HOME_UPDATED, homePair),
  entry('/en', HOME_UPDATED, homePair),
  ...PAGES.map((p) => entry(p.path, p.updated, alternatesOf(p))),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
if (write('sitemap.xml', sitemap)) changed.push('sitemap.xml');

/* ---------- 5. provera internih linkova ---------- */
const vercel = JSON.parse(read('vercel.json'));
const rewrites = (vercel.rewrites || []).map((r) => new RegExp('^' + r.source + '$'));
const routes = new Set(['/', '/en', ...PAGES.map((p) => p.path)]);
for (const [file, html] of Object.entries(outputs)) {
  for (const [, href] of html.matchAll(/\s(?:href|src)="(\/[^"#?]*)/g)) {
    if (href.startsWith('/_vercel/') || routes.has(href) || rewrites.some((re) => re.test(href))) continue;
    if (fs.existsSync(path.join(ROOT, href))) continue;
    warnings.push(`${file}: link ka nepostojećoj stranici ${href}`);
  }
}

/* ---------- izveštaj ---------- */
console.log(`Stranica: ${PAGES.length + 2} (početna i /en, ${PAGES_SR.length} srpskih i ${PAGES_EN.length} engleskih podstranica)`);
console.log(changed.length ? 'Promenjeno:\n  ' + changed.join('\n  ') : 'Ništa se nije promenilo.');
if (warnings.length) {
  console.log('\nUpozorenja:\n  ' + [...new Set(warnings)].join('\n  '));
  process.exitCode = 1;
}
