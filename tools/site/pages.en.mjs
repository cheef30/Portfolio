// English versions of the subpages. Same `id` as the Serbian page in pages.mjs,
// so the build links each pair with hreflang. After a change run: node tools/build.mjs

import {
  SHOW_PRICES, UPDATED, prices, PROJECTS, quote as q, media as m,
  tags, projectMeta, otherProjects, serviceSchema, offer, workSchema,
} from './shared.mjs';

const L = 'en';
const P = prices(L);
const quote = (key) => q(key, L);
const media = (key) => m(key, L);

const ifPrices = (html) => (SHOW_PRICES ? html : '');
const priceLink = () => ifPrices(`<p><a href="/en/website-cost">All prices and packages</a></p>`);

const HOME = { name: 'Home', url: '/en' };
const SERVICES = { name: 'Services', url: '/en/services' };
const WORK = { name: 'Work', url: '/en/work' };

const CARD_TEXT = {
  modus: 'A 3D model of the building where buyers pick a floor and an apartment.',
  naizlet: 'The agency’s new site, with an admin panel and bus seat booking.',
  leto: 'A bilingual site with last-minute offers.',
  toma: 'A Cyrillic landing page where the rakija pours as you scroll.',
  pro: 'A redesign with call and Viber on every screen.',
};
const others = (except) => otherProjects(except, L, 'More work', 'Each of these sites solved a different problem.', CARD_TEXT);

const SERVICE_CARDS = {
  firma: { url: '/en/services/business-website', kicker: 'Service', title: 'Business website', text: 'A presentation site or landing page people find you through and call from.' },
  app: { url: '/en/services/web-app-development', kicker: 'Service', title: 'Web application', text: 'Bookings, calendars, an admin panel and a database, when your site needs to do part of the work.' },
  d3: { url: '/en/services/3d-configurator-and-animation', kicker: 'Service', title: '3D and motion', text: '3D configurators and scroll-driven animation.' },
  odrz: { url: '/en/services/website-maintenance', kicker: 'Service', title: 'Maintenance', text: 'Send me a message and I’ll update the text, a photo or a price.' },
  cene: { url: '/en/website-cost', kicker: 'Prices', title: 'Website cost', text: 'Ballpark prices by package, timelines and what’s included.' },
};

const services = (keys, title = 'What else I do') => ({
  title,
  items: keys.filter((k) => k !== 'cene' || SHOW_PRICES).map((k) => SERVICE_CARDS[k]),
});

const steps = (where = 'in Obrenovac or Belgrade') => `<ol class="psteps">
            <li><strong>Conversation</strong> <span>Free</span><p>A short call or a coffee ${where}. You tell me what your business does and what you expect from the site, and I send you a proposal with a price and a timeline.</p></li>
            <li><strong>Design</strong> <span>About a week</span><p>I put together the layout and the look and send you a link to check it in your browser. You tell me what you don’t like, I fix it, and only then do I start building.</p></li>
            <li><strong>Build</strong> <span>1 to 3 weeks</span><p>I code the site, add your copy and photos and test it on a phone, a tablet and a desktop.</p></li>
            <li><strong>Launch</strong> <span>One day</span><p>I connect the domain, submit the site to Google and give you all the logins.</p></li>
          </ol>`;

const service = (name, description, path, area) => serviceSchema(L, name, description, path, area);
const work = (key, about, description) => workSchema(key, L, about, description);
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/* ==========================================================================
   Pages
   ========================================================================== */
export const PAGES = [];

/* ---------- Web design Obrenovac ---------- */
PAGES.push({
  id: 'obrenovac',
  lang: L,
  file: 'en/web-design-obrenovac.html',
  path: '/en/web-design-obrenovac',
  updated: UPDATED,
  title: 'Web Design in Obrenovac, Serbia | Stefan Stević',
  description: 'Websites for businesses in Obrenovac: custom design, fast on phones, call and Viber in one tap, Google Maps. Meet in person in Obrenovac, price agreed upfront.',
  crumbs: [HOME, { name: 'Web design Obrenovac' }],
  hero: {
    eyebrow: 'Web design and development, Obrenovac',
    h1: 'Web design in Obrenovac',
    lede: 'I build websites for businesses in and around Obrenovac: tradespeople, service companies, salons, schools and local shops. The site opens fast on a phone, says clearly what you do and puts your number where people look for it.',
  },
  body: `<h2>A web developer from Obrenovac, not an agency from another city</h2>
          <p>I live and work in Obrenovac. When you need a website, you don’t talk to an agency salesperson but to the person who will actually build it. We can meet for a coffee, you can show me your shop or premises, and we can work out together what your customers really need.</p>
          <p>I do everything myself, from the design to connecting the domain. So you always know who to call when something needs to change.</p>

          <h2>What a local business needs from its website</h2>
          <p>Most people look up a business in Obrenovac on their phone, usually when they need something urgently: an air conditioner that stopped working, a hairdresser appointment, a driving school for their kid. Within a few seconds they decide whether to call you or someone else. So I build local business sites around a few simple things:</p>
          <ul class="pchecks">
            <li>Call, Viber and WhatsApp on every screen, in one tap</li>
            <li>The first screen says clearly what you do and where you are</li>
            <li>Services described in the words people use on Google</li>
            <li>Photos of your real work instead of stock images</li>
            <li>Google Maps and a contact form</li>
            <li>A site that loads fast even on a weak mobile connection</li>
          </ul>

          <h2>Getting found on Google and on the map</h2>
          <p>When someone searches for “air conditioning service Obrenovac” or “hairdresser Obrenovac”, Google shows two things: a map with businesses and a list of websites. For both, it matters that the site is technically sound and clearly says where you work. That’s why on every site I set up titles, descriptions and structured data for Google from day one, connect the site to Google Search Console and help you with your Google Business Profile.</p>
          <p>No honest person can promise you first place on Google. But a fast, clear and technically correct site has a much better chance than one that isn’t.</p>

          <h2>Websites for businesses in Obrenovac</h2>
          <p><a href="/en/work/pro-klima-obrenovac">PRO KLIMA Obrenovac</a> installs and services air conditioners. People usually look them up when their AC dies in the middle of summer, so the redesign puts call, WhatsApp and Viber on every screen, with services and a gallery of 41 real jobs right below.</p>
          <p>For the START driving school in Obrenovac I made a <a href="https://cheef30.github.io/auto-skola-start/" target="_blank" rel="noopener">proposal for a new website</a>. I also work with businesses in Belgrade, such as the <a href="/en/work/na-izlet">Na Izlet</a> travel agency.</p>

          <h2>How we work together</h2>
          ${steps('in Obrenovac')}
          ${ifPrices(`
          <h2>How much a website costs for a business in Obrenovac</h2>
          <p>A simple one-page site, which is enough for most tradespeople, salons and cafés, costs ${P.vizitkarta.label} and is ready in ${P.vizitkarta.time}. A site with separate pages for services, a gallery of your work and contact costs ${P.firma.label}. You get the exact price after a short call, and it doesn’t change unless we change the plan.</p>
          ${priceLink()}`)}`,
  aside: {
    facts: [
      ['Location', 'Obrenovac'],
      ['Meeting', 'In person or by phone'],
      ['Timeline', '2 to 4 weeks for a business site'],
      ...(SHOW_PRICES ? [['Price', `From €${P.vizitkarta.min}`]] : []),
    ],
  },
  faq: [
    ['Can we meet in person?', 'Yes. The first conversation can be over coffee in Obrenovac or at your shop. After that, most things are agreed by phone, Viber or WhatsApp.'],
    ['How quickly can the site be ready?', 'A simple one-page site is usually ready in 5 to 10 days, and a site with more pages in 2 to 3 weeks from the day I get the copy and photos.'],
    ['Will I be able to edit the site myself?', 'If you need to, you get an admin panel where you change prices, offers or dates yourself. If you’d rather not deal with it, send me a message and I’ll make the change.'],
    ['Do you help with the Google Business Profile?', 'Yes. I help you pick and buy a domain, put the site on fast hosting, connect it to Google Search Console and set up your Google Business Profile, so people find you more easily in search and on the map.'],
    ['Do you work with businesses outside Obrenovac?', 'Yes. I mostly work with businesses in Obrenovac and Belgrade, but also with people from all over Serbia and abroad by phone and video call.'],
  ],
  related: services(['firma', 'cene', 'odrz', 'app'], 'Services'),
  contact: { title: 'Need a website in Obrenovac?', intro: 'Tell me briefly what your business does and what you need. I’ll get back to you with a proposal, a ballpark price and a timeline, and we can meet for coffee too.' },
  schema: [service('Web design in Obrenovac', 'Websites and web apps for businesses in and around Obrenovac.', '/en/web-design-obrenovac', [{ '@type': 'City', name: 'Obrenovac' }])],
});

/* ---------- Web design Belgrade ---------- */
PAGES.push({
  id: 'beograd',
  lang: L,
  file: 'en/web-design-belgrade.html',
  path: '/en/web-design-belgrade',
  updated: UPDATED,
  title: 'Web Design and Development in Belgrade | Stefan Stević',
  description: 'Websites and web apps for businesses in Belgrade: custom design, fast on phones, an admin panel you can use. Work directly with the developer, price agreed upfront.',
  crumbs: [HOME, { name: 'Web design Belgrade' }],
  hero: {
    eyebrow: 'Web design and development, Belgrade',
    h1: 'Web design for businesses in Belgrade',
    lede: 'I build websites and web apps for Belgrade businesses, from travel agencies to event venues. You talk directly to the person building your site, and you know the price and timeline before we start.',
  },
  body: `<h2>No agency between you and your website</h2>
          <p>Belgrade has plenty of agencies and even more offers. The difference with me is simple: I do everything myself, from the first call and the design to the code and the maintenance. You don’t pass your wishes through a middleman, and you don’t pay for a team you don’t need.</p>
          <p>I’m based in Obrenovac, so meeting in person in Belgrade is easy. After the first meeting, we sort most things out by phone, Viber or video call.</p>

          <h2>A Belgrade example: the Na Izlet travel agency</h2>
          <p><a href="/en/work/na-izlet">Na Izlet</a> is a Belgrade travel agency that runs day trips and tours across Europe. Its old WordPress site was slow on phones and hard to keep up to date with new departures. I built the new site from scratch in Next.js, with an admin panel where the agency adds trips, dates and prices on its own, a departure calendar and a booking system with a bus seat map.</p>
          ${quote('naizlet')}
          <p>I’m also currently building a site for Mister S Tailored Events, an event venue in central Belgrade.</p>

          <h2>What I can build for your business</h2>
          <ul class="pchecks">
            <li><a href="/en/services/business-website">A business website</a>: a presentation site or landing page, with call, Viber, WhatsApp, Google Maps and a contact form</li>
            <li><a href="/en/services/web-app-development">A web application</a>: bookings, calendars, an admin panel, user accounts and a database</li>
            <li><a href="/en/services/3d-configurator-and-animation">3D views and animation</a>: for property, products and brands</li>
            <li><a href="/en/services/website-maintenance">Maintenance</a>: text, image and price updates, fixes and speed checks</li>
          </ul>

          <h2>Websites in Serbian and English</h2>
          <p>Many Belgrade businesses also work with foreigners: agencies, accommodation, event venues. I built bilingual sites for the <a href="/en/work/leto-u-turskoj">Leto u Turskoj</a> agency and for Mister S Tailored Events. Each language should have its own address, so Google can show the Serbian version to people searching in Serbian and the English version to people searching in English.</p>

          <h2>A fast site, because people open it on their phone</h2>
          <p>Most visitors open your site for the first time on a phone, often on the bus or during a break. So I prepare images in modern formats (AVIF and WebP), keep fonts and scripts on the site itself and check the speed before handover. The Leto u Turskoj site has a Lighthouse SEO score of 100 on mobile.</p>

          <h2>How we work together</h2>
          ${steps('in Belgrade or Obrenovac')}
          ${ifPrices(`
          <h2>Price and timeline</h2>
          <p>A business website with 4 to 7 pages costs ${P.firma.label} and is ready in ${P.firma.time}. A site with an admin panel where you change offers and prices yourself is ${P.admin.label}, and a web application with bookings and user accounts is ${P.app.label}. You get the exact price after a short call, with no obligation.</p>
          ${priceLink()}`)}`,
  aside: {
    facts: [
      ['City', 'Belgrade and surroundings'],
      ['Meeting', 'In person or by video call'],
      ['Languages', 'Serbian and English'],
      ['Reply', 'Usually the same day'],
    ],
  },
  faq: [
    ['Do you come to meetings in Belgrade?', 'Yes. The first conversation can be in person in Belgrade or Obrenovac, and after that we mostly talk by phone, Viber or video call.'],
    ['I already have a website. Can you fix it?', 'Yes. Sometimes it’s enough to speed it up and fix what visitors see first, and sometimes a new site makes more sense, like it did for the Na Izlet agency. I’ll take a look and tell you honestly what’s worth doing.'],
    ['Do I get an admin panel?', 'If you need to change prices, offers or dates yourself, you get an admin panel in Serbian or English. If you’d rather not deal with it, send me a message and I’ll make the change.'],
    ['Do I get full access to the site?', 'Yes. When the site is ready, I connect the domain, submit the site to Google and hand over all the logins.'],
  ],
  related: others('none'),
  contact: { title: 'Need a website in Belgrade?', intro: 'Tell me briefly what your business does and what you need. I’ll get back to you with a proposal, a ballpark price and a timeline.' },
  schema: [service('Web design in Belgrade', 'Websites and web apps for businesses in Belgrade.', '/en/web-design-belgrade', [{ '@type': 'City', name: 'Belgrade' }])],
});

/* ---------- Website cost ---------- */
const tier = (pr, desc, who, featured = false) => `<li class="ptier${featured ? ' ptier--hot' : ''}">
            <h3 class="ptier__name">${pr.name}</h3>
            <p class="ptier__price">${pr.short ? cap(pr.short) : pr.label}</p>
            ${pr.time ? `<p class="ptier__time">Timeline: ${pr.time}</p>` : ''}
            <p class="ptier__desc">${desc}</p>
            ${who ? `<p class="ptier__who">${who}</p>` : ''}
          </li>`;

if (SHOW_PRICES) PAGES.push({
  id: 'cene',
  lang: L,
  file: 'en/website-cost.html',
  path: '/en/website-cost',
  updated: UPDATED,
  title: 'Website Cost in Serbia 2026: Packages | Stefan Stević',
  description: 'How much a website costs: one-page site from €150, business website from €300, web app from €1,200. What’s included, timelines and what you pay separately.',
  crumbs: [HOME, { name: 'Website cost' }],
  hero: {
    eyebrow: 'Prices and packages, 2026',
    h1: 'How much does a website cost?',
    lede: 'Ballpark prices for websites and web apps, with timelines and what’s included. You get the exact price after a short call, and it doesn’t change unless we change the plan.',
  },
  extraFirst: true,
  extra: `    <section class="section ptiers-wrap" id="paketi">
      <div class="wrap">
        <h2 class="sr-only">Packages</h2>
        <ul class="ptiers">
          ${tier(P.vizitkarta, 'Everything important on a single page: who you are, what you do, services, photos, call, WhatsApp and Viber, a map and a contact form.', 'For tradespeople, salons, cafés and local businesses.')}
          ${tier(P.firma, 'Everything in the one-page site, plus separate pages for services, a gallery of your work, about and contact. Basic SEO, help with your Google Business Profile and connecting the domain.', 'For businesses that want people to find each service on Google.', true)}
          ${tier(P.admin, 'A business website with an admin panel where you change offers, prices, the gallery or the blog yourself. Bilingual sites, in Serbian and English, also fall here.', 'For businesses whose offer changes often.')}
          ${tier(P.app, 'Bookings, calendars, user accounts, a database, PDF documents and email notifications.', 'For agencies, schools, service companies and anyone whose site needs to do part of the work.')}
          ${tier(P.premium, '3D configurators and scroll-driven animation. The price depends on the scope.', 'For property, products and brands.')}
          <li class="ptier ptier--plain">
            <h3 class="ptier__name">Extras</h3>
            <p class="ptier__desc"><strong>Maintenance:</strong> ${P.odrzavanje.label}, for text, image and price updates, speed checks and fixes.</p>
            <p class="ptier__desc"><strong>Redesign:</strong> priced as the package it falls into, and it can cost less if part of the old site can be reused.</p>
          </li>
        </ul>
        <p class="ptiers__note">Prices are ballpark figures in euros. The domain is paid separately, to the registrar.</p>
      </div>
    </section>`,
  body: `<h2>What the price depends on</h2>
          <p>Mostly on the number of pages and on what the site needs to do. A site that presents your business is simpler than one where customers book an appointment or sign up for a trip. An admin panel, more languages and 3D views also raise the price.</p>
          <p>That’s why I don’t quote off the top of my head. After a short call I know what you need and send you a proposal with the exact price and timeline, with no obligation.</p>

          <h2>What every package includes</h2>
          <ul class="pchecks">
            <li>Design from scratch, no ready-made templates</li>
            <li>A site that works on phones, tablets and desktops</li>
            <li>Call, WhatsApp and Viber buttons</li>
            <li>A base for Google search: titles, descriptions and structured data</li>
            <li>Connecting the domain and submitting the site to Google</li>
            <li>All the logins once the site is done</li>
          </ul>

          <h2>What you pay separately</h2>
          <p>The domain, for example yourbusiness.rs, is paid separately, to the registrar. Hosting is free for most sites, because I deploy them on Vercel. If after handover you need someone to change text, images and prices, maintenance is ${P.odrzavanje.label}.</p>

          <h2>How long it takes</h2>
          <p>A one-page site is usually ready in ${P.vizitkarta.time}, and a business website in ${P.firma.time} from the day I get the copy and photos. Web apps take ${P.app.time}, depending on the features. You know the timeline before I start.</p>`,
  aside: {
    title: 'Not sure which package you need?',
    note: 'Send me a few words about your business and what the site needs to do. I’ll tell you which package you fall into and a ballpark price, with no obligation.',
    button: ['#kontakt', 'Ask about the price'],
  },
  faq: [
    ['Is the price final?', 'You get the exact price after a short call, before I start. It doesn’t change unless we change the plan.'],
    ['How long does it take to build a website?', 'A business site is usually ready two to four weeks after I get the copy and photos. Bigger web apps take longer, and you know the timeline before I start.'],
    ['Is a redesign cheaper than a new site?', 'A redesign is priced as the package it falls into, and it can cost less if part of the old site can be reused. I take a look at your current site and tell you honestly whether it’s enough to speed it up and fix it, or whether a new one makes more sense.'],
    ['How much does website maintenance cost?', '€20 to €50 a month, depending on how often something needs to change. It covers text, image and price updates, fixes and speed checks.'],
    ['Do I pay for hosting?', 'For most sites, no, because I deploy them on Vercel. The domain is paid separately, to the registrar.'],
  ],
  related: services(['firma', 'app', 'd3', 'odrz']),
  contact: { title: 'Ask for an exact price.', intro: 'Tell me what your business does and what the site needs to do. I’ll get back to you with a proposal, an exact price and a timeline.' },
  schema: [{
    ...service('Web design and development', 'Websites and web apps for businesses, with ballpark prices by package.', '/en/website-cost'),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Packages',
      itemListElement: [P.vizitkarta, P.firma, P.admin, P.app, P.premium, P.odrzavanje].map((pr) => offer(pr)),
    },
  }],
});

/* ---------- Service: business website ---------- */
PAGES.push({
  id: 'svc-firma',
  lang: L,
  file: 'en/services/business-website.html',
  path: '/en/services/business-website',
  section: 'usluge',
  updated: UPDATED,
  title: 'Business Website Design and Development | Stefan Stević',
  description: 'A presentation site or landing page for your business: designed from scratch, built for phones, with call, Viber and WhatsApp buttons and Google Maps.',
  crumbs: [HOME, SERVICES, { name: 'Business website' }],
  hero: {
    eyebrow: 'Service',
    h1: 'Business website',
    lede: 'For businesses that need a site people find them through and call from. A presentation site or landing page, designed from scratch for your business.',
  },
  body: `<h2>A site that sells, not one that just exists</h2>
          <p>When someone needs a plumber, a travel agency or a restaurant, they open the website on their phone first. If they can’t tell what you do or find your number within a few seconds, they go to a competitor. So what matters most to me is that the site loads fast, reads clearly and always has a call button close by.</p>
          <p>Marketing taught me that a website exists to sell. Before I write the first line of code, I ask who your customers are and what would convince them to call you.</p>

          <h2>What you get</h2>
          <ul class="pchecks">
            <li>Design made for your business, no ready-made templates</li>
            <li>A site built for phones and tablets</li>
            <li>Call, WhatsApp and Viber buttons</li>
            <li>Google Maps and a contact form</li>
            <li>A solid base for Google search</li>
            <li>Help with domain and hosting</li>
          </ul>

          <h2>One page or several pages?</h2>
          <p>For tradespeople, salons and cafés, a one-page site is often enough: a single page with everything important, from services and photos to a map and a contact form. If you want people to find each of your services on Google separately, a site with several pages works better, where every service, the gallery of your work and the contact page each get their own page.</p>

          <h2>Example: PRO KLIMA Obrenovac</h2>
          <p>People usually look for an air conditioning company when their AC dies in the middle of summer, so the site has to show the number straight away. In the <a href="/en/work/pro-klima-obrenovac">PRO KLIMA Obrenovac redesign</a>, call, WhatsApp and Viber are on every screen, services and photos from real jobs are right below, and services, work and contact each have their own page.</p>
          ${ifPrices(`
          <h2>Price and timeline</h2>
          <p>A one-page site costs ${P.vizitkarta.label} and is ready in ${P.vizitkarta.time}. A business website with 4 to 7 pages costs ${P.firma.label}, and the timeline is ${P.firma.time}.</p>
          ${priceLink()}`)}`,
  aside: {
    facts: [
      ['What it is', 'A presentation site or landing page'],
      ['Timeline', '2 to 4 weeks'],
      ...(SHOW_PRICES ? [['Price', `From €${P.vizitkarta.min}`]] : []),
      ['For', 'Trades, salons, service companies, agencies'],
    ],
    button: ['#kontakt', 'Ask about a website'],
  },
  related: services(['app', 'odrz', 'd3', 'cene']),
  schema: [{
    ...service('Business website', 'A presentation site or landing page with a custom design, built for phones, with call, Viber and WhatsApp buttons.', '/en/services/business-website'),
    ...(SHOW_PRICES ? { offers: [offer(P.vizitkarta), offer(P.firma)] } : {}),
  }],
});

/* ---------- Service: web apps ---------- */
PAGES.push({
  id: 'svc-app',
  lang: L,
  file: 'en/services/web-app-development.html',
  path: '/en/services/web-app-development',
  section: 'usluge',
  updated: UPDATED,
  title: 'Web App Development for Businesses | Stefan Stević',
  description: 'Web apps that do part of the work for you: bookings, calendars, an admin panel, user accounts and a database. Built with Next.js, React, TypeScript and Supabase.',
  crumbs: [HOME, SERVICES, { name: 'Web app development' }],
  hero: {
    eyebrow: 'Service',
    h1: 'Web app development',
    lede: 'When your site needs to do part of the work for you. Bookings, calendars, an admin panel for prices and offers, user accounts and a database.',
  },
  body: `<h2>When you need an app, not just a site</h2>
          <p>If you answer the same enquiries by hand every day, send the same documents over and over or wait for someone to change a price on your site, the site can take that work over. Anything that repeats can move into an admin panel, a calendar or an automatic email.</p>

          <h2>What it can do</h2>
          <ul class="pchecks">
            <li>Bookings and calendars for appointments or departures</li>
            <li>An admin panel in Serbian or English for prices, offers and dates</li>
            <li>User accounts and sign-in</li>
            <li>A database</li>
            <li>PDF documents and email notifications</li>
            <li>Training on how to use it, so you don’t need a developer for every change</li>
          </ul>

          <h2>Example: the Na Izlet agency</h2>
          <p>The old WordPress site of the <a href="/en/work/na-izlet">Na Izlet</a> agency was slow on phones and hard to keep up to date with new departures. The new site has an admin panel where the agency adds trips, dates and prices on its own, a departure calendar, trip sign-ups and a booking system with a bus seat map.</p>
          ${quote('naizlet')}

          <h2>Technologies</h2>
          <p>I build apps with Next.js, React and TypeScript, with the database and user sign-in handled by Supabase. For you that means a site that’s fast on phones, secure sign-in and easy to extend with new features later.</p>
          ${ifPrices(`
          <h2>Price and timeline</h2>
          <p>A web application costs ${P.app.label}, and the timeline is ${P.app.time}, depending on the features. If you only need a site you can edit yourself, without bookings and user accounts, that’s ${P.admin.label}.</p>
          ${priceLink()}`)}`,
  aside: {
    facts: [
      ['What it is', 'A site that does part of the work'],
      ['Timeline', P.app.time],
      ...(SHOW_PRICES ? [['Price', 'From €1,200']] : []),
      ['Tools', 'Next.js, React, TypeScript, Supabase'],
    ],
    button: ['#kontakt', 'Describe your app'],
  },
  related: services(['firma', 'd3', 'odrz', 'cene']),
  schema: [{
    ...service('Web app development', 'Bookings, calendars, an admin panel, user accounts and a database.', '/en/services/web-app-development'),
    ...(SHOW_PRICES ? { offers: [offer(P.admin), offer(P.app)] } : {}),
  }],
});

/* ---------- Service: 3D and motion ---------- */
PAGES.push({
  id: 'svc-3d',
  lang: L,
  file: 'en/services/3d-configurator-and-animation.html',
  path: '/en/services/3d-configurator-and-animation',
  section: 'usluge',
  updated: UPDATED,
  title: '3D Configurators and Web Animation | Stefan Stević',
  description: '3D configurators in Three.js and scroll-driven animation for property, products and brands. Optimised to run smoothly on phones too.',
  crumbs: [HOME, SERVICES, { name: '3D and motion' }],
  hero: {
    eyebrow: 'Service',
    h1: '3D views and animation for your site',
    lede: 'When a product or a space needs to be seen from every angle. 3D configurators, scroll-driven animation and interactive views.',
  },
  body: `<h2>When a photo isn’t enough</h2>
          <p>An apartment, a product or a space sometimes sells best when buyers can explore it themselves. A 3D view lets them do that right in the browser, without installing anything.</p>

          <h2>Example: the 3D building for Modus Gradnja</h2>
          <p>The <a href="/en/work/modus-gradnja">Modus Gradnja</a> site is built around a 3D model of the building. Buyers rotate it, pick a floor and an apartment, and instantly see the layout, floor area and price. The model is generated in code with Three.js, with no heavy 3D files, and the 2D floor plan is linked to the 3D view both ways.</p>
          ${quote('modus')}

          <h2>Example: rakija that pours as you scroll</h2>
          <p>For <a href="/en/work/tomasevacka">Tomaševačka rakija</a> I built a landing page where video frames change as the visitor scrolls. There are 121 of them, from the bottle to the first sip, and the background colour changes along with each frame.</p>

          <h2>Fast on phones too</h2>
          <p>3D and animation can slow a site down. So I generate models in code wherever possible, make lighter versions for phones, and animations switch off on their own for visitors who have reduced motion turned on in their settings.</p>
          ${ifPrices(`
          <h2>Price</h2>
          <p>Premium 3D and motion work starts at €${P.premium.min}, depending on the scope, and the timeline is agreed per project.</p>
          ${priceLink()}`)}`,
  aside: {
    facts: [
      ['Tools', 'Three.js, GSAP'],
      ['For', 'Property, products, brands'],
      ...(SHOW_PRICES ? [['Price', `From €${P.premium.min}`]] : []),
    ],
    button: ['#kontakt', 'Ask about a 3D view'],
  },
  related: services(['firma', 'app', 'odrz', 'cene']),
  schema: [{
    ...service('3D views and animation for websites', '3D configurators and scroll-driven animation for property, products and brands.', '/en/services/3d-configurator-and-animation'),
    ...(SHOW_PRICES ? { offers: [offer(P.premium)] } : {}),
  }],
});

/* ---------- Service: maintenance ---------- */
PAGES.push({
  id: 'svc-odrz',
  lang: L,
  file: 'en/services/website-maintenance.html',
  path: '/en/services/website-maintenance',
  section: 'usluge',
  updated: UPDATED,
  title: 'Website Maintenance: Updates, Fixes, Speed | Stefan Stević',
  description: 'Monthly website maintenance: text, image and price updates, fixes, technical support and speed checks. For sites I built or take over from others.',
  crumbs: [HOME, SERVICES, { name: 'Website maintenance' }],
  hero: {
    eyebrow: 'Service',
    h1: 'Website maintenance',
    lede: 'You send me a message and I make the change. Monthly maintenance for sites I built or take over from others.',
  },
  body: `<h2>What maintenance covers</h2>
          <ul class="pchecks">
            <li>Text, image and price updates</li>
            <li>Fixes and technical support</li>
            <li>Speed and health checks</li>
          </ul>

          <h2>What it looks like in practice</h2>
          <p>For <a href="/en/work/modus-gradnja">Modus Gradnja</a> I update apartment prices and availability every month. When they sell an apartment, they let me know, and it’s sorted the same day.</p>
          ${quote('modus')}

          <h2>I also take over sites I didn’t build</h2>
          <p>If your site was built by someone who is no longer available, I can take it over. I take a look first and tell you honestly whether it’s enough to speed it up and fix it, or whether a new one makes more sense.</p>
          ${ifPrices(`
          <h2>Price</h2>
          <p>Maintenance costs ${P.odrzavanje.label}, depending on how often something needs to change.</p>
          ${priceLink()}`)}`,
  aside: {
    facts: [
      ['How', 'You send a message, I make the change'],
      ...(SHOW_PRICES ? [['Price', P.odrzavanje.label]] : []),
      ['For', 'My sites and ones I take over'],
    ],
    button: ['#kontakt', 'Ask about maintenance'],
  },
  related: services(['firma', 'app', 'd3', 'cene']),
  schema: [{
    ...service('Website maintenance', 'Monthly content and price updates, fixes and speed checks.', '/en/services/website-maintenance'),
    ...(SHOW_PRICES ? { offers: [offer(P.odrzavanje)] } : {}),
  }],
});

/* ---------- Work ---------- */
PAGES.push({
  id: 'w-modus',
  lang: L,
  file: 'en/work/modus-gradnja.html',
  path: '/en/work/modus-gradnja',
  section: 'radovi',
  updated: UPDATED,
  title: 'Modus Gradnja: 3D Apartment Configurator | Stefan Stević',
  description: 'How the Modus Gradnja site was built: a 3D model of the building in Three.js, choosing a floor and an apartment, 70 apartments with sales sheets and enquiry forms.',
  crumbs: [HOME, WORK, { name: 'Modus Gradnja' }],
  hero: {
    eyebrow: PROJECTS.modus.en.kind,
    h1: 'Modus Gradnja: a site built around a 3D model of the building',
    lede: 'Buyers rotate the building, pick a floor and an apartment, and instantly see the layout, floor area and price.',
    after: projectMeta('modus', [['Year', '2026'], ['Role', 'Design, development and maintenance'], ['Technologies', tags(['Three.js', 'JavaScript', 'HTML', 'CSS', 'JSON-LD'])]]),
    actions: false,
  },
  media: media('modus'),
  body: `<h2>The brief</h2>
          <p>The company sells apartments from its own developments. Until then, every buyer had to be sent PDFs, and buyers waited for a reply before they could even see an apartment. Buyers needed to find the right apartment on their own, with all the details in one place.</p>

          <h2>The solution</h2>
          <p>I built the site around a 3D model of the building. Buyers rotate it, pick a floor and an apartment, and instantly see the layout, floor area and price. The 3D model is generated in code with Three.js, with no heavy 3D files, so it loads fast. The 2D floor plan is linked to the 3D view both ways: what you pick on the plan shows up on the building, and the other way round.</p>
          <p>Each of the 70 apartments has its own page with a sales sheet and an enquiry form, so buyers call once they’ve already picked an apartment.</p>

          <h2>What was done</h2>
          <ul class="pchecks">
            <li>3D model generated in code with Three.js, no heavy 3D files</li>
            <li>2D floor plan synced with the 3D view, both ways</li>
            <li>70 apartments, each with its own page, sales sheet and enquiry form</li>
            <li>Monthly maintenance: I keep prices and availability up to date</li>
          </ul>

          <h2>What the client says</h2>
          ${quote('modus')}`,
  aside: {
    title: 'About the project',
    facts: [['Client', 'Modus Gradnja'], ['Industry', 'Residential construction'], ['Year', '2026'], ['Site', '<a href="https://modusgradnja.rs" target="_blank" rel="noopener">modusgradnja.rs</a>']],
    note: 'Need something similar? See <a href="/en/services/3d-configurator-and-animation">3D views and animation</a>.',
    button: ['#kontakt', 'I want a site like this'],
  },
  related: others('modus'),
  schema: [work('modus', '3D apartment configurator', 'The Modus Gradnja property developer’s site, built around a 3D model of the building, with floor and apartment selection and a page for each of the 70 apartments.')],
});

PAGES.push({
  id: 'w-naizlet',
  lang: L,
  file: 'en/work/na-izlet.html',
  path: '/en/work/na-izlet',
  section: 'radovi',
  updated: UPDATED,
  title: 'Na Izlet: Travel Agency Website Redesign | Stefan Stević',
  description: 'Na Izlet travel agency redesign, Belgrade: Next.js instead of old WordPress, an admin panel for trips and prices, a departure calendar and bus seat booking.',
  crumbs: [HOME, WORK, { name: 'Na Izlet' }],
  hero: {
    eyebrow: PROJECTS.naizlet.en.kind,
    h1: 'Na Izlet: a site the agency updates on its own',
    lede: 'A new travel agency site, built from scratch in Next.js, with an admin panel where the agency adds trips, dates and prices itself.',
    after: projectMeta('naizlet', [['Year', '2026'], ['Role', 'Redesign and development'], ['Technologies', tags(['Next.js', 'React', 'TypeScript', 'Supabase', 'Vercel'])]]),
    actions: false,
  },
  media: media('naizlet'),
  body: `<h2>The brief</h2>
          <p>Na Izlet is a Belgrade travel agency that runs day trips and tours across Europe. Its old WordPress site was slow on phones and hard to keep up to date with new departures.</p>

          <h2>The solution</h2>
          <p>I built the new site from scratch in Next.js, with an admin panel where the agency adds trips, dates and prices on its own, without waiting for a developer. The site has a departure calendar, trip sign-ups and a booking system with a bus seat map.</p>
          <p>Every trip has its own page with the itinerary, price, next departure and sign-up in one place. The site also has PDF documents, a blog and destination pages.</p>

          <h2>For Google</h2>
          <p>The site has structured data for Google, images in AVIF format and a sitemap that’s generated automatically.</p>

          <h2>What was done</h2>
          <ul class="pchecks">
            <li>Departure calendar and trip sign-ups</li>
            <li>Booking system with a bus seat map</li>
            <li>PDF documents, blog and destination pages</li>
            <li>Structured data for Google, AVIF images, automatic sitemap</li>
          </ul>

          <h2>What the client says</h2>
          ${quote('naizlet')}`,
  aside: {
    title: 'About the project',
    facts: [['Client', 'Na Izlet'], ['Industry', 'Travel agency'], ['City', 'Belgrade'], ['Year', '2026'], ['Site', '<a href="https://naizlet.rs" target="_blank" rel="noopener">naizlet.rs</a>']],
    note: 'Need something similar? See <a href="/en/services/web-app-development">web app development</a>.',
    button: ['#kontakt', 'I want a site like this'],
  },
  related: others('naizlet'),
  schema: [work('naizlet', 'Travel agency website with bookings', 'Redesign of the Na Izlet travel agency site in Belgrade, with an admin panel, a departure calendar and bus seat booking.')],
});

PAGES.push({
  id: 'w-leto',
  lang: L,
  file: 'en/work/leto-u-turskoj.html',
  path: '/en/work/leto-u-turskoj',
  section: 'radovi',
  updated: UPDATED,
  title: 'Leto u Turskoj: Bilingual Travel Agency Site | Stefan Stević',
  description: 'Bilingual site for the Leto u Turskoj agency: last-minute offers showing the days left until departure, destinations with filters and a blog. Lighthouse SEO 100.',
  crumbs: [HOME, WORK, { name: 'Leto u Turskoj' }],
  hero: {
    eyebrow: PROJECTS.leto.en.kind,
    h1: 'Leto u Turskoj: offers that are quick to find',
    lede: 'A bilingual site for an agency that sells only Turkey, with last-minute offers and destinations you can filter.',
    after: projectMeta('leto', [['Year', '2026'], ['Role', 'Design and development'], ['Technologies', tags(['Next.js', 'React', 'Vercel'])]]),
    actions: false,
  },
  media: media('leto'),
  body: `<h2>The brief</h2>
          <p>The agency sells Turkey only, so the site has to surface offers and dates fast. On top of that, the site had to be in both Serbian and English.</p>

          <h2>The solution</h2>
          <p>The home screen has one message, one button and a choice between flying or taking the bus. Last-minute offers show how many days are left until departure, and destinations can be filtered by type of holiday. The site also has a blog.</p>
          <p>The site has a Lighthouse SEO score of 100 on mobile.</p>

          <h2>What was done</h2>
          <ul class="pchecks">
            <li>Serbian and English on one site</li>
            <li>Offers that show how many days are left until departure</li>
            <li>Destinations filtered by type of holiday, and a blog</li>
            <li>Lighthouse SEO score of 100 on mobile</li>
          </ul>

          <h2>What the client says</h2>
          ${quote('leto')}`,
  aside: {
    title: 'About the project',
    facts: [['Client', 'Leto u Turskoj'], ['Industry', 'Travel agency'], ['Languages', 'Serbian and English'], ['Year', '2026'], ['Site', '<a href="https://letouturskoj.rs" target="_blank" rel="noopener">letouturskoj.rs</a>']],
    note: 'Need something similar? See <a href="/en/services/business-website">business websites</a>.',
    button: ['#kontakt', 'I want a site like this'],
  },
  related: others('leto'),
  schema: [work('leto', 'Bilingual travel agency website', 'A bilingual site for the Leto u Turskoj agency, with last-minute offers and destinations you can filter.')],
});

PAGES.push({
  id: 'w-toma',
  lang: L,
  file: 'en/work/tomasevacka.html',
  path: '/en/work/tomasevacka',
  section: 'radovi',
  updated: UPDATED,
  title: 'Tomaševačka: Rakija Landing Page | Stefan Stević',
  description: 'A Cyrillic landing page for homemade rakija from Tomaševac: 121 frames that change as you scroll, a background that follows each frame, orders by phone and Viber.',
  crumbs: [HOME, WORK, { name: 'Tomaševačka' }],
  hero: {
    eyebrow: PROJECTS.toma.en.kind,
    h1: 'Tomaševačka: rakija that pours as you scroll',
    lede: 'A Cyrillic landing page. Instead of a regular video, the frames change as you scroll, from the bottle to the first sip.',
    after: projectMeta('toma', [['Year', '2026'], ['Role', 'Concept, design and development'], ['Technologies', tags(['JavaScript', 'Canvas', 'HTML', 'CSS', 'ffmpeg'])]], 'View the site'),
    actions: false,
  },
  media: media('toma'),
  body: `<h2>The idea</h2>
          <p>Homemade fruit rakija from Tomaševac deserves more than a photo of a bottle. Instead of a regular video, I built a page where visitors play the frames themselves by scrolling: there are 121 of them, from the bottle to the first sip, and the background colour changes along with each frame.</p>

          <h2>How it works</h2>
          <p>The frames are pulled from a video and drawn onto a canvas as the visitor scrolls. Phones get a separate, lighter sequence, so the page runs smoothly on weaker devices too.</p>

          <h2>Content</h2>
          <p>The whole site is in Cyrillic, including navigation and buttons. It has seven flavours with details copied from the labels, and orders are taken by phone and Viber.</p>

          <h2>What was done</h2>
          <ul class="pchecks">
            <li>121 frames pulled from video, with a lighter sequence for phones</li>
            <li>Seven flavours, with details copied from the labels</li>
            <li>Orders by phone and Viber</li>
          </ul>`,
  aside: {
    title: 'About the project',
    facts: [['Product', 'Homemade fruit rakija'], ['Script', 'Cyrillic'], ['Year', '2026'], ['Site', '<a href="https://cheef30.github.io/tomasevacka/" target="_blank" rel="noopener">View the site</a>']],
    note: 'Need something similar? See <a href="/en/services/3d-configurator-and-animation">3D views and animation</a>.',
    button: ['#kontakt', 'I want a site like this'],
  },
  related: others('toma'),
  schema: [work('toma', 'Landing page with scroll-driven animation', 'A Cyrillic landing page for homemade rakija, with 121 frames that change as the visitor scrolls.')],
});

PAGES.push({
  id: 'w-pro',
  lang: L,
  file: 'en/work/pro-klima-obrenovac.html',
  path: '/en/work/pro-klima-obrenovac',
  section: 'radovi',
  updated: UPDATED,
  title: 'PRO KLIMA Obrenovac: Website Redesign | Stefan Stević',
  description: 'Website redesign for an air conditioning company in Obrenovac: call, WhatsApp and Viber on every screen, a gallery of 41 jobs and separate pages for services.',
  crumbs: [HOME, WORK, { name: 'PRO KLIMA Obrenovac' }],
  hero: {
    eyebrow: PROJECTS.pro.en.kind,
    h1: 'PRO KLIMA Obrenovac: the number on every screen',
    lede: 'A website redesign for an Obrenovac company that installs and services air conditioners. People look them up when their AC dies in the middle of summer, so the site has to show the number straight away.',
    after: projectMeta('pro', [['Year', '2026'], ['Role', 'Website redesign, in progress'], ['Technologies', tags(['HTML', 'CSS', 'JavaScript'])]], 'View the redesign preview'),
    actions: false,
  },
  media: media('pro'),
  body: `<h2>The brief</h2>
          <p>PRO KLIMA Obrenovac installs and services air conditioners. People usually look them up when their AC stops working in the middle of summer, on their phone and in a hurry. If they don’t see the number straight away, they call someone else.</p>

          <h2>The solution</h2>
          <p>The redesign puts call, WhatsApp and Viber on every screen, in one tap. Services and photos from real jobs are right below. The gallery has 41 completed jobs, filterable by type of work, and services, work and contact each have their own page.</p>
          <p>The redesign is still in progress.</p>

          <h2>What was done</h2>
          <ul class="pchecks">
            <li>Call, WhatsApp and Viber in one tap</li>
            <li>Gallery of real jobs, filterable by type of work</li>
            <li>Separate pages for services, work and contact</li>
          </ul>`,
  aside: {
    title: 'About the project',
    facts: [['Client', 'PRO KLIMA'], ['Industry', 'AC installation and service'], ['City', 'Obrenovac'], ['Status', 'In progress']],
    note: 'Run a local business? See <a href="/en/web-design-obrenovac">web design in Obrenovac</a>.',
    button: ['#kontakt', 'I want a site like this'],
  },
  related: others('pro'),
  schema: [work('pro', 'Website for an air conditioning company', 'Website redesign for PRO KLIMA in Obrenovac, with call, WhatsApp and Viber on every screen.')],
});
