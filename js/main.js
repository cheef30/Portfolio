/* ==========================================================================
   Stefan Stević, portfolio
   Vanilla JS. GSAP + ScrollTrigger i Lenis se učitavaju lokalno iz /vendor.
   Sve radi i bez njih (i bez animacija ako je uključen "reduce motion").
   ========================================================================== */
(() => {
  'use strict';

  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const gsap = window.gsap;
  const ST = window.ScrollTrigger;
  const hasGSAP = Boolean(gsap && ST);
  if (hasGSAP) gsap.registerPlugin(ST);

  const EMAIL = 'stefanstevicoz30@gmail.com';
  // telefon za WhatsApp, Viber i poziv: +381 64 558 0188

  /* ------------------------------------------------------------------------
     Prevodi (srpski je u HTML-u, engleski je ovde)
     ------------------------------------------------------------------------ */
  const EN = {
    'meta.title': 'Web design and development in Belgrade, Serbia | Stefan Stević',
    skip: 'Skip to content',
    'nav.brandLabel': 'Stefan Stević, back to top',
    'nav.label': 'Main navigation',
    'nav.work': 'Work',
    'nav.services': 'Services',
    'nav.process': 'Process',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.faq': 'Questions',
    'nav.cta': 'Get in touch',
    'nav.menu': 'Menu',
    'lang.label': 'Language',

    'hero.h1': 'Stefan Stević, websites and web apps, Obrenovac and Belgrade, Serbia',
    'hero.alt': 'Stefan Stević in a blue blazer',
    'hero.lede': 'I build websites and web apps for businesses in Obrenovac, Belgrade and beyond. They load fast on a phone, say clearly what you do and make it easy for people to call you.',
    'hero.cta': 'Get a quote',
    'quick.label': 'Quick contact',
    'quick.wa': 'WhatsApp, +381 64 558 0188',
    'quick.viber': 'Viber, +381 64 558 0188',
    'wa.href': 'https://wa.me/381645580188?text=Hi%20Stefan%2C%20I%20found%20you%20through%20your%20website.%20I%27d%20like%20to%20talk%20about%20a%20website.',
    'hero.cta2': 'See the work',
    'hero.status': 'Taking on new projects',
    'hero.where': 'Obrenovac and Belgrade, in person or remote',

    'intro.title': 'I build websites that <mark class="hl" data-hl>get people to call you.</mark>',
    'intro.p1': 'When someone needs a plumber, a travel agency or a restaurant, they open the website on their phone first. If they can’t tell what you do or find your number within a few seconds, they go to a competitor. So what matters most to me is that the site loads fast, reads clearly and always has a call button close by.',
    'intro.p2': 'On top of that I write tidy code, set up the basics for Google from day one and build sites you can easily change later.',
    'intro.clients': 'I’ve built sites for',

    'work.title': 'Selected work',
    'work.sub': 'Each of these sites solved a different problem. Click a screen to open the live site.',
    'meta.year': 'Year',
    'meta.role': 'Role',
    'meta.stack': 'Technologies',

    'modus.kind': 'Residential property developer',
    'modus.role': 'Design, development and maintenance',
    'modus.text': 'The company sells apartments from its own developments and needed buyers to find their apartment on their own, without PDFs going back and forth. I built the site around a 3D model of the building: buyers rotate it, pick a floor and an apartment, and instantly see the layout, floor area and price.',
    'modus.f1': '3D model generated in code with Three.js, no heavy 3D files',
    'modus.f2': '2D floor plan synced with the 3D view, both ways',
    'modus.f3': '70 apartments, each with its own page, sales sheet and enquiry form',
    'modus.f4': 'Monthly maintenance: I keep prices and availability up to date',
    'modus.alt1': 'Modus Gradnja home page',
    'modus.alt2': 'Modus Gradnja on a phone',
    'modus.alt3': '3D apartment configurator with a floor plan',
    'modus.cap': 'Configurator: second floor selected, with a schematic floor plan and an apartment list with prices.',

    'naizlet.kind': 'Travel agency, Belgrade',
    'naizlet.role': 'Redesign and development',
    'naizlet.text': 'The agency runs day trips and tours across Europe, and its old WordPress site was slow on phones and hard to keep up to date. The new site was built from scratch in Next.js, with an admin panel where the agency adds trips, dates and prices on its own.',
    'naizlet.f1': 'Departure calendar and trip sign-ups',
    'naizlet.f2': 'Booking system with a bus seat map',
    'naizlet.f3': 'PDF documents, blog and destination pages',
    'naizlet.f4': 'Structured data for Google, AVIF images, automatic sitemap',
    'naizlet.alt1': 'Trip calendar on the Na Izlet website',
    'naizlet.alt2': 'Na Izlet on a phone',
    'naizlet.alt3': 'Trip page with price and next departure',
    'naizlet.cap': 'Trip page: itinerary, price, next departure and sign-up in one place.',

    'leto.kind': 'Travel agency specialising in Turkey',
    'leto.role': 'Design and development',
    'leto.text': 'The agency sells Turkey only, so the site has to surface offers and dates fast. The bilingual site has last-minute offers showing the days left until departure, destinations filtered by type of holiday, and a blog.',
    'leto.f1': 'Serbian and English on one site',
    'leto.f2': 'Offers that show how many days are left until departure',
    'leto.f3': 'Lighthouse SEO score of 100 on mobile',
    'leto.alt1': 'Destinations with filters on the Leto u Turskoj website',
    'leto.alt2': 'Leto u Turskoj on a phone',
    'leto.alt3': 'Leto u Turskoj home screen',
    'leto.cap': 'Home screen: one message, one button, and a choice between flying or taking the bus.',

    'toma.kind': 'Homemade fruit rakija from Tomaševac',
    'toma.role': 'Concept, design and development',
    'toma.text': 'A Cyrillic landing page for a homemade rakija. Instead of a regular video, the frames change as you scroll. There are 121 of them, from the bottle to the first sip, and the background colour changes along with each frame.',
    'toma.f1': '121 frames pulled from video, with a lighter sequence for phones',
    'toma.f2': 'Seven flavours, with details copied from the labels',
    'toma.f3': 'Orders by phone and Viber',
    'toma.link': 'View the site',
    'toma.alt1': 'Frame 68 of 121: rakija being poured into a glass',
    'toma.alt2': 'Tomaševačka on a phone',
    'toma.alt3': 'Opening screen with the name in Cyrillic',
    'toma.cap': 'Opening screen. The whole site is in Cyrillic, including navigation and buttons.',

    'pro.kind': 'Air conditioning installation and service',
    'pro.role': 'Website redesign, in progress',
    'pro.text': 'An Obrenovac company that installs and services air conditioners. People usually look them up when their AC dies in the middle of summer, so the site has to show the number straight away. The redesign puts call, WhatsApp and Viber on every screen, with services and photos from real jobs right below.',
    'pro.f1': 'Call, WhatsApp and Viber in one tap',
    'pro.f2': 'Gallery of real jobs',
    'pro.f3': 'Separate pages for services, work and contact',
    'pro.link': 'View the redesign preview',
    'pro.alt1': 'Home page of the PRO KLIMA redesign',
    'pro.alt2': 'PRO KLIMA on a phone, with a call button',
    'pro.alt3': 'Gallery of jobs with filters by type of work',
    'pro.cap': 'Gallery from real jobs: 41 completed jobs, filterable by type of work.',

    'archive.title': 'More work',
    'archive.sub': 'Smaller projects, concepts and things I built for myself.',
    'arch.misters': 'Bilingual site for an event venue in central Belgrade',
    'arch.rotten': 'Photographer portfolio with an admin panel, the subject of my thesis',
    'arch.auto': 'Proposed new site for a driving school in Obrenovac',
    'arch.ember': 'Café website concept with a menu and table bookings',
    'arch.sistem': 'Personal training tracker app that also works offline',
    'tag.progress': 'In progress',
    'tag.thesis': 'Thesis',
    'tag.concept': 'Concept',

    'voices.title': 'What clients say',
    'voices.sub': 'People I’ve worked with, in their own words.',
    'voices.q1': 'People call us now once they’ve already picked an apartment, so we don’t have to send PDFs to everyone anymore. And when we sell one, we just tell Stefan and it’s sorted the same day.',
    'voices.q2': 'What we like most is that we add new departures and prices ourselves and don’t wait on anyone. And the site finally opens properly on a phone.',
    'voices.q3': 'We explained what we wanted in one call and that was it, no back and forth. The site is exactly what we had in mind, in both Serbian and English.',

    'services.title': 'Websites and web apps',
    'services.sub': 'From a simple business site to an app with bookings. Before I start, we agree on the price and the timeline, so you know where you stand.',
    'svc.ask': 'Ask about this service',
    's1.title': 'Business website',
    's1.sum': 'For businesses that need a site people find them through and call from.',
    's1.body': 'A presentation site or a landing page. I design every one from scratch and don’t use ready-made templates.',
    's1.l1': 'Design made for your business',
    's1.l2': 'Built for phones and tablets',
    's1.l3': 'Call, WhatsApp and Viber buttons',
    's1.l4': 'Google Maps and a contact form',
    's1.l5': 'A solid base for Google search',
    's1.l6': 'Help with domain and hosting',
    's2.title': 'Web application',
    's2.sum': 'When your site needs to do part of the work for you.',
    's2.body': 'Bookings, calendars, an admin panel for prices and offers, user accounts and a database. Like the Na Izlet agency, where trips and dates are added without a developer.',
    's2.l1': 'Next.js, React and TypeScript',
    's2.l2': 'Database and sign-in with Supabase',
    's2.l3': 'Admin panel in Serbian or English',
    's2.l4': 'PDF documents and email notifications',
    's2.l5': 'Training on how to use it',
    's3.title': '3D and motion',
    's3.sum': 'When a product or a space needs to be seen from every angle.',
    's3.body': '3D configurators, scroll-driven animation and interactive views. Examples are the Modus Gradnja building and the rakija that pours as you scroll.',
    's3.l1': '3D models in Three.js',
    's3.l2': 'Animation with GSAP',
    's3.l3': 'Optimised to run smoothly on phones',
    's4.title': 'Maintenance',
    's4.sum': 'You send me a message and I make the change.',
    's4.body': 'Monthly maintenance for sites I built or take over from others: content and price updates, fixes and regular checks.',
    's4.l1': 'Text, image and price updates',
    's4.l2': 'Fixes and technical support',
    's4.l3': 'Speed and health checks',

    'process.title': 'How I work',
    'process.sub': 'This is what working together looks like, from the first call to the site on your domain.',
    'process.ctaText': 'The call is free and doesn’t commit you to anything.',
    'process.cta': 'Book a call',
    'p1.time': 'Free',
    'p2.time': 'About a week',
    'p3.time': '1 to 3 weeks',
    'p4.time': 'One day',
    'p1.title': 'Conversation',
    'p1.text': 'A short call or a coffee in Obrenovac or Belgrade. You tell me what your business does and what you expect from the site, and afterwards I send you a proposal with a price and a timeline.',
    'p2.title': 'Design',
    'p2.text': 'I put together the layout and the look and send you a link to check it in your browser. You tell me what you don’t like, I fix it, and only then do I start building.',
    'p3.title': 'Build',
    'p3.text': 'I code the site, add your copy and photos and test it on a phone, a tablet and a desktop.',
    'p4.title': 'Launch',
    'p4.text': 'I connect the domain, submit the site to Google and give you all the logins. If something needs changing later, I’m around.',

    'about.alt1': 'Stefan Stević at the Phygital Sports Summit in Abu Dhabi',
    'about.cap1': 'Phygital Sports Summit, Abu Dhabi, December 2025.',
    'about.title': 'Hi, I’m Stefan.',
    'about.p1': 'I’m a web developer from Obrenovac, Serbia. Before focusing on building websites, I worked at the marketing agency Hero Advertising and at the SESE esports federation, where I took part in international events and congresses, from Abu Dhabi to Malaysia.',
    'about.p2': 'Marketing taught me that a website exists to sell. So before I write the first line of code, I ask who your customers are and what would convince them to call you.',
    'about.p3': 'Now I build websites and web apps for businesses, from 3D apartment viewers to booking systems. I do everything myself, so you deal with me directly.',
    'about.k1': 'Location',
    'about.v1': 'Obrenovac, Belgrade',
    'about.k2': 'Languages',
    'about.v2': 'Serbian, English',
    'about.k3': 'Studies',
    'about.v3': 'Academy of Technical and Art Applied Studies, Belgrade (VIŠER)',
    'about.k4': 'Tools',
    'about.k5': 'Online',
    'about.alt2': 'Stefan Stević at an international esports congress',
    'about.cap2': 'At an international esports congress in Malaysia, 2025.',

    'faq.title': 'Questions',
    'faq.sub': 'If your question isn’t here, message me on Viber or WhatsApp.',
    'faq.q1': 'How much does a website cost?',
    'faq.a1': 'It depends on how many pages and features you need. A simple business site costs far less than a web app with bookings and an admin panel. After a short call you get an exact price, and it doesn’t change unless we change the plan.',
    'faq.q2': 'How long does it take?',
    'faq.a2': 'A business site is usually ready two to four weeks after I get the copy and photos. Bigger web apps take longer, and you know the timeline before I start.',
    'faq.q3': 'Do you only work with businesses in Obrenovac?',
    'faq.a3': 'No. I mostly work with businesses in Obrenovac and Belgrade, where we can also meet in person, but I work with people from all over Serbia and abroad by phone and video call.',
    'faq.q4': 'Will I be able to edit the site myself?',
    'faq.a4': 'If you need to, you get an admin panel where you change prices, offers or dates yourself, like the Na Izlet agency does. If you’d rather not deal with it, send me a message and I’ll make the change.',
    'faq.q5': 'Do you help with the domain, hosting and Google?',
    'faq.a5': 'Yes. I help you pick and buy a domain, put the site on fast hosting, connect it to Google Search Console and set up your Google Business Profile, so people find you more easily in search and on the map.',
    'faq.q6': 'I already have a website. Can you fix it?',
    'faq.a6': 'Yes. Sometimes it’s enough to speed it up and fix what visitors see first, and sometimes a new site makes more sense, like it did for the Na Izlet agency. I’ll take a look and tell you honestly what’s worth doing.',

    'contact.title': 'Tell me what you need.',
    'contact.intro': 'Tell me briefly what your business does and what you need. I’ll get back to you with a proposal, a ballpark price and a timeline.',
    'contact.copy': 'Copy address',
    'contact.fast': 'I reply fastest on WhatsApp and Viber, usually the same day.',
    'contact.mailLabel': 'Or by email:',
    'contact.formTitle': 'Send an enquiry',
    'phone.display': '+381 64 558 0188',
    'ch.call': 'Call',
    'form.name': 'Name',
    'form.company': 'Company (optional)',
    'form.contact': 'Email or phone',
    'form.type': 'What do you need',
    'form.other': 'Something else',
    'form.msg': 'Message',
    'form.msgPh': 'E.g. we install air conditioners and need a site people will call us from.',
    'form.send': 'Send message',

    'footer.role': 'Web development, Obrenovac and Belgrade',
    'footer.time': 'Local time in Obrenovac',
    'footer.top': 'Back to top',
    'footer.social': 'Social and contact',
    'fab.label': 'Message me',
    'fab.form': 'Send an enquiry',
  };

  const STR = {
    sr: {
      open: 'Otvori sajt',
      copied: 'Kopirano',
      sending: 'Šaljem…',
      sent: 'Hvala! Poruka je poslata, javljam se uskoro.',
      failed: `Poruka nije poslata. Pišite mi direktno na <a href="mailto:${EMAIL}">${EMAIL}</a>.`,
      errName: 'Upišite ime.',
      errContact: 'Upišite mejl ili broj telefona.',
      errContactBad: 'Proverite mejl ili broj telefona.',
      errMsg: 'Napišite par reči o projektu.',
    },
    en: {
      open: 'Open site',
      copied: 'Copied',
      sending: 'Sending…',
      sent: 'Thanks! Your message is on its way, I’ll be in touch soon.',
      failed: `The message didn’t go through. Email me directly at <a href="mailto:${EMAIL}">${EMAIL}</a>.`,
      errName: 'Enter your name.',
      errContact: 'Enter an email or a phone number.',
      errContactBad: 'Check the email or phone number.',
      errMsg: 'Write a few words about the project.',
    },
  };

  const TITLE_SR = document.title;
  let lang = 'sr';
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'en' || saved === 'sr') lang = saved;
  } catch (e) { /* storage unavailable */ }

  // keep the Serbian originals so we can switch back
  $$('[data-i18n]').forEach((el) => { el.dataset.sr = el.innerHTML; });
  $$('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split('|').forEach((pair) => {
      const attr = pair.split(':')[0];
      el.dataset['sr' + attr.replace(/[^a-z]/gi, '')] = el.getAttribute(attr) || '';
    });
  });

  const cursorLabel = $('[data-cursor-label]');

  function applyLang(next, save = true) {
    lang = next;
    $$('[data-i18n]').forEach((el) => {
      const v = next === 'en' ? EN[el.dataset.i18n] : el.dataset.sr;
      if (v !== undefined && el.innerHTML !== v) el.innerHTML = v;
    });
    $$('[data-i18n-attr]').forEach((el) => {
      el.dataset.i18nAttr.split('|').forEach((pair) => {
        const [attr, key] = pair.split(':');
        const v = next === 'en' ? EN[key] : el.dataset['sr' + attr.replace(/[^a-z]/gi, '')];
        if (v !== undefined) el.setAttribute(attr, v);
      });
    });
    root.lang = next === 'en' ? 'en' : 'sr-Latn';
    document.title = next === 'en' ? EN['meta.title'] : TITLE_SR;
    $$('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === next)));
    if (cursorLabel) cursorLabel.textContent = STR[next].open;
    if (save) {
      try { localStorage.setItem('lang', next); } catch (e) { /* ignore */ }
    }
    document.dispatchEvent(new CustomEvent('langchange'));
    if (hasGSAP) requestAnimationFrame(() => ST.refresh());
  }

  $$('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.dataset.lang !== lang) applyLang(btn.dataset.lang);
    });
  });
  if (lang !== 'sr') applyLang(lang, false);

  /* ------------------------------------------------------------------------
     Smooth scroll (Lenis)
     ------------------------------------------------------------------------ */
  let lenis = null;
  if (!reduceMotion && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
    if (hasGSAP) {
      lenis.on('scroll', ST.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  function scrollToTarget(target) {
    if (lenis) {
      // content may have grown (an open accordion), so let Lenis re-measure first
      if (typeof lenis.resize === 'function') lenis.resize();
      lenis.scrollTo(target, { duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4) });
      return;
    }
    const behavior = reduceMotion ? 'auto' : 'smooth';
    if (typeof target === 'number') window.scrollTo({ top: target, behavior });
    else target.scrollIntoView({ behavior });
  }

  /* ------------------------------------------------------------------------
     Navigation, menu, anchors
     ------------------------------------------------------------------------ */
  const nav = $('[data-nav]');
  const menu = $('[data-menu]');
  const menuToggle = $('[data-menu-toggle]');
  let menuOpen = false;

  function setMenu(open) {
    menuOpen = open;
    menu.classList.toggle('is-open', open);
    nav.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    if (open) {
      nav.classList.remove('is-hidden');
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';
      const first = menu.querySelector('a');
      if (first) setTimeout(() => first.focus({ preventScroll: true }), 300);
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
    }
  }
  menuToggle.addEventListener('click', () => setMenu(!menuOpen));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) {
      setMenu(false);
      menuToggle.focus();
    }
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
    if (e.matches && menuOpen) setMenu(false);
  });

  // Clean addresses: stefanstevic.rs/radovi instead of /#radovi or /index.html.
  // On Vercel every route below is rewritten to index.html (vercel.json).
  // On github.io (no rewrites) the address only loses the #hash.
  const ROUTES = { radovi: 'radovi', usluge: 'usluge', 'kako-radim': 'proces', 'o-meni': 'o-meni', pitanja: 'pitanja', kontakt: 'kontakt' };
  const ROUTE_OF = {};
  Object.keys(ROUTES).forEach((slug) => { ROUTE_OF[ROUTES[slug]] = slug; });
  const pathRouting = !/github\.io$/.test(location.hostname);
  const slugNow = location.pathname.replace(/^.*\//, '').replace(/\.html$/, '');
  const BASE = location.pathname.replace(/[^/]*$/, '');

  function setCleanUrl(id) {
    if (!history.replaceState) return;
    const slug = pathRouting ? ROUTE_OF[id] : null;
    history.replaceState(null, '', BASE + (slug || '') + location.search);
  }

  // arriving on /radovi, /kontakt ... (or an old #hash link): jump to that section
  (function openDeepLink() {
    const id = ROUTES[slugNow] || (location.hash ? decodeURIComponent(location.hash.slice(1)) : '');
    const target = id && document.getElementById(id);
    if (!target) {
      if (slugNow === 'index') setCleanUrl('top');
      return;
    }
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    setCleanUrl(id);
    const jump = () => {
      if (lenis) {
        if (typeof lenis.resize === 'function') lenis.resize();
        lenis.scrollTo(target, { immediate: true, force: true });
      } else {
        target.scrollIntoView();
      }
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
      setCleanUrl(id);
    };
    if (document.readyState === 'complete') setTimeout(jump, 300);
    else window.addEventListener('load', () => setTimeout(jump, 300), { once: true });
  })();

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const target = id === 'top' ? null : document.getElementById(id);
    if (id !== 'top' && !target) return;
    e.preventDefault();
    const go = () => {
      scrollToTarget(id === 'top' ? 0 : target);
      if (target) {
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        setTimeout(() => target.focus({ preventScroll: true }), reduceMotion ? 0 : 900);
      }
      setCleanUrl(id);
    };
    if (menuOpen) {
      setMenu(false);
      setTimeout(go, 120);
    } else {
      go();
    }
  });

  const toTop = $('[data-to-top]');
  if (toTop) toTop.addEventListener('click', () => scrollToTarget(0));

  // theme-color for mobile browser chrome
  const themeMeta = $('meta[name="theme-color"]');
  let themeNow = '#fec834';
  function setThemeColor(c) {
    if (!themeMeta || !c || c === themeNow) return;
    themeNow = c;
    themeMeta.setAttribute('content', c);
  }

  const hero = $('[data-hero]');
  let lastY = window.scrollY;
  function onScroll() {
    const y = window.scrollY;
    const vh = window.innerHeight;
    nav.classList.toggle('is-solid', y > 40);
    if (!menuOpen) {
      if (y > vh * 1.1 && y > lastY + 4) nav.classList.add('is-hidden');
      else if (y < lastY - 4 || y < vh * 1.1) nav.classList.remove('is-hidden');
    }
    if (y < vh * 0.5) setThemeColor('#fec834');
    lastY = y;
    heroInView = y < hero.offsetHeight + 4;
  }
  let heroInView = true;
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // active link + browser theme color per section
  const navLinks = $$('.nav__links a');
  const work = $('[data-work]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((a) => {
          if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
        if (entry.target !== work && entry.target.dataset.theme && window.scrollY > window.innerHeight * 0.5) {
          setThemeColor(entry.target.dataset.theme);
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main > section[id]:not([data-hero])').forEach((s) => io.observe(s));
  }

  /* ------------------------------------------------------------------------
     Hero: kinetic name (variable width) + portrait
     ------------------------------------------------------------------------ */
  const heroInner = $('[data-hero-inner]');
  const heroShade = $('[data-hero-shade]');
  const curtain = $('[data-curtain]');
  const figure = $('[data-hero-figure]');
  const figureMove = $('[data-figure-move]');
  const figureImg = figure.querySelector('img');
  const heroBottom = $('.hero__bottom', hero);
  const intros = $$('[data-intro]', hero);

  // Archivo metrics with line-height: 1 (em fractions)
  const CAP_TOP = 0.148;
  const CAP_H = 0.686;
  // cutout geometry, in source pixels
  const FIG = { w: 890, h: 1660, hair: 131, chin: 352 };
  const WMIN = 62;
  const WMAX = 125;
  const WEIGHT = 830;

  class KineticLine {
    constructor(el) {
      this.el = el;
      this.chars = Array.from(el.textContent.trim().toUpperCase());
      el.textContent = '';
      this.spans = this.chars.map((ch) => {
        const s = document.createElement('span');
        s.className = 'k';
        s.textContent = ch;
        el.appendChild(s);
        return s;
      });
      this.n = this.spans.length;
      this.base = 92;
      this.cur = new Float64Array(this.n).fill(this.base);
      this.tgt = new Float64Array(this.n).fill(this.base);
      this.lastW = new Float64Array(this.n).fill(-1);
      this.lastT = new Array(this.n).fill('');
      this.centers = new Float64Array(this.n);
      this.p = new Float64Array(this.n);
      this.tmp = new Array(this.n).fill(this.base);
      this.widths = new Float64Array(this.n);
      this.kern = new Float64Array(Math.max(0, this.n - 1));
      this.rise = this.chars.map(() => ({ v: 0 }));
      this.adv = [];
      this.fs = 100;
      this.width = 0;
      this.intro = 1;
      this.influence = 0;
      this.y = 0;
      this.dx = 0;
      this.dy = 0;
    }

    // measure every glyph once at 100px; widths scale linearly with font size
    measure() {
      const host = document.createElement('div');
      host.setAttribute('aria-hidden', 'true');
      host.style.cssText = `position:absolute;left:-99999px;top:0;visibility:hidden;white-space:pre;font-family:var(--font);font-size:100px;font-weight:${WEIGHT};line-height:1;letter-spacing:0;`;
      const add = (str, wd) => {
        const sp = document.createElement('span');
        sp.style.display = 'inline-block';
        sp.style.fontStretch = wd + '%';
        sp.textContent = str;
        host.appendChild(sp);
        return sp;
      };
      const singles = this.chars.map((ch) => [add(ch, WMIN), add(ch, 100), add(ch, WMAX)]);
      const pairs = [];
      for (let i = 0; i < this.n - 1; i++) pairs.push(add(this.chars[i] + this.chars[i + 1], 100));
      document.body.appendChild(host);
      this.m = singles.map((t) => ({ a: t[0].getBoundingClientRect().width, b: t[1].getBoundingClientRect().width, c: t[2].getBoundingClientRect().width }));
      this.mk = pairs.map((sp, i) => sp.getBoundingClientRect().width - this.m[i].b - this.m[i + 1].b);
      host.remove();
      this.setSize(this.fs);
    }

    setSize(fs) {
      this.fs = fs;
      const k = fs / 100;
      this.adv = this.m.map((v) => ({ a: v.a * k, b: v.b * k, c: v.c * k }));
      for (let i = 0; i < this.n - 1; i++) this.kern[i] = this.mk[i] * k;
    }

    advAt(i, wd) {
      const m = this.adv[i];
      return wd <= 100 ? m.a + ((m.b - m.a) * (wd - WMIN)) / (100 - WMIN) : m.b + ((m.c - m.b) * (wd - 100)) / (WMAX - 100);
    }

    total(arr) {
      let s = 0;
      for (let i = 0; i < this.n; i++) s += this.advAt(i, arr[i]);
      for (let i = 0; i < this.n - 1; i++) s += this.kern[i];
      return s;
    }

    uniform(wd) {
      this.tmp.fill(wd);
      return this.total(this.tmp);
    }

    solveBase(width) {
      if (this.uniform(WMAX) <= width) return WMAX;
      if (this.uniform(WMIN) >= width) return WMIN;
      let lo = WMIN;
      let hi = WMAX;
      for (let k = 0; k < 30; k++) {
        const m = (lo + hi) / 2;
        if (this.uniform(m) > width) hi = m;
        else lo = m;
      }
      return (lo + hi) / 2;
    }

    setBase(base) {
      this.base = base;
      this.cur.fill(base);
      this.tgt.fill(base);
      this.lastW.fill(-1);
      this.lastT.fill('');
    }

    aim(px, amp) {
      const n = this.n;
      const base = this.base;
      const inf = this.influence;
      if (inf < 0.002) {
        this.tgt.fill(base);
        return;
      }
      const sigma = Math.max(this.width * 0.12, this.fs * 0.55);
      for (let i = 0; i < n; i++) {
        const d = this.centers[i] - px;
        this.p[i] = Math.exp(-(d * d) / (2 * sigma * sigma)) * inf;
      }
      const want = this.uniform(base);
      const head = WMAX - base;
      const fill = (k) => {
        for (let i = 0; i < n; i++) this.tmp[i] = clamp(base + head * this.p[i] * amp - k * (1 - this.p[i]), WMIN, WMAX);
        return this.total(this.tmp);
      };
      if (fill(0) > want) {
        let lo = 0;
        let hi = base - WMIN;
        for (let it = 0; it < 18; it++) {
          const m = (lo + hi) / 2;
          if (fill(m) > want) lo = m;
          else hi = m;
        }
        fill(hi);
      }
      for (let i = 0; i < n; i++) this.tgt[i] = this.tmp[i];
    }

    step(dt) {
      const k = 1 - Math.exp(-dt * 8.5);
      for (let i = 0; i < this.n; i++) this.cur[i] += (this.tgt[i] - this.cur[i]) * k;
    }

    render() {
      const n = this.n;
      let sum = 0;
      for (let i = 0; i < n; i++) {
        const wd = this.intro >= 1 ? this.cur[i] : WMIN + (this.cur[i] - WMIN) * this.intro;
        this.widths[i] = wd;
        sum += this.advAt(i, wd);
      }
      let kernSum = 0;
      for (let i = 0; i < n - 1; i++) kernSum += this.kern[i];
      const natural = sum + kernSum;
      const gap = this.intro >= 1 && n > 1 ? (this.width - natural) / (n - 1) : 0;
      let x = 0;
      for (let i = 0; i < n; i++) {
        const a = this.advAt(i, this.widths[i]);
        this.centers[i] = x + a / 2;
        const s = this.spans[i];
        const wd = this.widths[i];
        if (Math.abs(wd - this.lastW[i]) > 0.04) {
          s.style.fontStretch = wd.toFixed(2) + '%';
          this.lastW[i] = wd;
        }
        const ty = this.rise[i].v * this.fs;
        const t = `translate3d(${x.toFixed(1)}px,${ty.toFixed(1)}px,0)`;
        if (t !== this.lastT[i]) {
          s.style.transform = t;
          this.lastT[i] = t;
        }
        x += a + (i < n - 1 ? this.kern[i] + gap : 0);
      }
      this.el.style.transform = `translate3d(${this.dx.toFixed(1)}px,${(this.y + this.dy).toFixed(1)}px,0)`;
    }
  }

  const lineEls = $$('[data-kinetic]', hero);
  const lines = lineEls.map((el) => new KineticLine(el));
  const heroState = {
    ready: false,
    interactive: false,
    left: 0,
    lineW: 0,
    fs: 0,
    figX: 0,
    figW: 0,
    pointer: { x: 0, y: 0, active: false, touchUntil: 0 },
    par: { x: 0, y: 0, tx: 0, ty: 0 },
  };

  function gutterPx() {
    // the copy block carries the page gutter (capped on ultra-wide screens)
    return Math.max(12, heroBottom.offsetLeft);
  }

  function layoutHero() {
    const W = hero.clientWidth;
    const H = hero.clientHeight;
    const g = gutterPx();
    const contentW = W - g * 2;
    const aspect = W / H;
    const mobileLike = W < 768 || (W < 1024 && aspect < 1);
    const navH = W < 768 ? 64 : 76;

    // 1) font size that fits the width at a medium width axis
    lines.forEach((l) => l.setSize(100));
    const ref = Math.max(...lines.map((l) => l.uniform(92)));
    const fsW = (100 * contentW) / ref;

    // 2) font size that fits the height: line 1 + head + line 2 above the copy block
    const capTop1 = navH + (mobileLike ? 16 : Math.max(8, H * 0.018));
    // head between the lines; never below 0.86 so the accent on Ć clears line 1
    const headRatio = clamp(2.6 - 1.4 * aspect, 0.86, 1.85);
    const bottomTop = heroBottom.offsetTop;
    const avail = bottomTop - (mobileLike ? 30 : 34) - capTop1;
    const fsH = avail / (CAP_H * (1.5 + headRatio) + 0.03);
    const fs = Math.max(44, Math.min(fsW, fsH));

    lines.forEach((l) => l.setSize(fs));
    // shared line width: as wide as the content box allows
    const lineW = Math.min(contentW, Math.max(...lines.map((l) => l.uniform(122))));
    const narrow = lineW < contentW - 1;
    const left = narrow && !mobileLike ? g : g + (contentW - lineW) / 2;

    lines.forEach((l) => {
      l.width = lineW;
      l.setBase(l.solveBase(lineW));
    });

    const capH = CAP_H * fs;
    const hairY = capTop1 + capH * 0.5;
    const headH = capH * headRatio;
    const cap2Top = hairY + headH + fs * 0.03;
    lines[0].y = capTop1 - CAP_TOP * fs;
    if (lines[1]) lines[1].y = cap2Top - CAP_TOP * fs;

    const figH = headH / ((FIG.chin - FIG.hair) / FIG.h);
    const figW = (figH * FIG.w) / FIG.h;
    const figTop = hairY - (FIG.hair / FIG.h) * figH;
    let centerX;
    if (mobileLike) centerX = W / 2;
    else if (narrow || W < 1180 || H < 760) centerX = left + lineW * 0.71;
    else centerX = left + lineW * 0.6;
    const figX = clamp(centerX - figW / 2, -figW * 0.25, W - figW * 0.75);

    hero.style.setProperty('--fs', fs.toFixed(2) + 'px');
    hero.style.setProperty('--line-w', lineW.toFixed(1) + 'px');
    hero.style.setProperty('--fig-w', figW.toFixed(1) + 'px');
    hero.style.setProperty('--fig-x', figX.toFixed(1) + 'px');
    hero.style.setProperty('--fig-y', figTop.toFixed(1) + 'px');
    lineEls.forEach((el) => { el.style.left = left.toFixed(1) + 'px'; });

    Object.assign(heroState, { left, lineW, fs, figX, figW });
    lines.forEach((l) => l.render());
  }

  // pointer
  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    const p = heroState.pointer;
    p.x = e.clientX - r.left;
    p.y = e.clientY - r.top;
    p.active = true;
    if (e.pointerType !== 'mouse') p.touchUntil = performance.now() + 2200;
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { heroState.pointer.active = false; });

  let rafId = 0;
  let lastT = performance.now();
  function tick(now) {
    rafId = requestAnimationFrame(tick);
    if (!heroState.ready || !heroInView) {
      lastT = now;
      return;
    }
    // touch screens: ~30 fps is plenty for the slow sweep
    if (!finePointer && heroState.interactive) {
      tick.skip = !tick.skip;
      if (tick.skip) return;
    }
    const dt = Math.min(0.066, (now - lastT) / 1000);
    lastT = now;

    const W = hero.clientWidth;
    const H = hero.clientHeight;
    const p = heroState.pointer;
    const usingTouch = !finePointer || now < p.touchUntil;
    const auto = heroState.interactive && (!finePointer && now >= p.touchUntil);

    lines.forEach((l, i) => {
      let px;
      let targetInf = 0;
      if (heroState.interactive && !reduceMotion) {
        if (auto) {
          // gentle autonomous sweep on touch screens
          const t = now / 1000;
          px = l.width * (0.5 + 0.46 * Math.sin(t * 0.55 + i * 2.1));
          targetInf = 0.85;
        } else if (p.active || usingTouch) {
          px = p.x - heroState.left;
          const lineMid = l.y + l.fs * 0.49;
          const dy = (p.y - lineMid) / (l.fs * 0.95);
          targetInf = Math.exp(-dy * dy * 0.5);
        }
      }
      l.influence += (targetInf - l.influence) * (1 - Math.exp(-dt * 6));
      if (px === undefined) px = l.width / 2;
      l.aim(px, 1);
      l.step(dt);
    });

    // parallax depth
    const par = heroState.par;
    if (heroState.interactive && !reduceMotion && finePointer && p.active) {
      par.tx = (p.x / W - 0.5) * 2;
      par.ty = (p.y / H - 0.5) * 2;
    } else {
      par.tx = 0;
      par.ty = 0;
    }
    const k = 1 - Math.exp(-dt * 4);
    par.x += (par.tx - par.x) * k;
    par.y += (par.ty - par.y) * k;
    lines[0].dx = par.x * -7;
    lines[0].dy = par.y * -4;
    if (lines[1]) {
      lines[1].dx = par.x * 12;
      lines[1].dy = par.y * 6;
    }
    figureImg.style.transform = `translate3d(${(par.x * -14).toFixed(2)}px,${(par.y * -8).toFixed(2)}px,0)`;

    lines.forEach((l) => l.render());
  }

  function revealHeroStatic() {
    hero.classList.add('is-started');
    hero.classList.remove('is-intro');
    if (curtain) curtain.style.display = 'none';
    intros.forEach((el) => { el.style.opacity = '1'; });
    lines.forEach((l) => { l.intro = 1; l.rise.forEach((r) => { r.v = 0; }); l.render(); });
    heroState.interactive = !reduceMotion;
  }

  function playIntro() {
    hero.classList.add('is-started', 'is-intro');
    if (reduceMotion || !hasGSAP) {
      revealHeroStatic();
      return;
    }
    lines.forEach((l) => { l.intro = 0; l.rise.forEach((r) => { r.v = 1.12; }); });
    const allRise = lines.flatMap((l) => l.rise);
    const tl = gsap.timeline({
      defaults: { ease: 'expo.out' },
      onComplete: () => {
        hero.classList.remove('is-intro');
        heroState.interactive = true;
      },
    });
    tl.to(curtain, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, 0)
      .set(curtain, { display: 'none' })
      .to(allRise, { v: 0, duration: 1.2, stagger: 0.04 }, 0.3)
      .to(lines, { intro: 1, duration: 1.6, ease: 'expo.inOut' }, 0.42)
      .fromTo(figureMove, { yPercent: 8, clipPath: 'inset(100% 0% 0% 0%)' }, { yPercent: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out', clearProps: 'clipPath' }, 0.38)
      .fromTo(intros, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.85)
      .fromTo(nav, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 1, clearProps: 'opacity,transform' }, 0.8);
  }

  async function initHero() {
    const fontsReady = document.fonts && document.fonts.load
      ? Promise.all([
          document.fonts.load(`${WEIGHT} 100px Archivo`, 'STEFAN STEVIĆ'),
          document.fonts.load('400 16px Archivo', 'a'),
        ]).catch(() => {})
      : Promise.resolve();
    await Promise.race([fontsReady, wait(1400)]);

    lines.forEach((l) => l.measure());
    hero.classList.add('is-kinetic');
    layoutHero();
    heroState.ready = true;
    rafId = requestAnimationFrame(tick);
    playIntro();
    // if the webfont arrives late, re-measure once it does
    if (document.fonts && document.fonts.status !== 'loaded') {
      document.fonts.ready.then(() => { lines.forEach((l) => l.measure()); layoutHero(); });
    }
  }
  initHero();
  document.addEventListener('langchange', () => { if (heroState.ready) layoutHero(); });

  let resizeTimer = 0;
  let lastW = window.innerWidth;
  let lastH = window.innerHeight;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // mobile browsers resize on scroll (URL bar); ignore tiny height-only changes
      if (w === lastW && Math.abs(h - lastH) < 120) return;
      lastW = w;
      lastH = h;
      if (heroState.ready) layoutHero();
      if (hasGSAP) ST.refresh();
    }, 160);
  });

  /* ------------------------------------------------------------------------
     Scroll-driven pieces (GSAP)
     ------------------------------------------------------------------------ */
  const projects = $$('[data-project]');
  const workState = { bg: projects[0] ? projects[0].dataset.bg : '#141518', accent: projects[0] ? projects[0].dataset.accent : '#c9a86a', tween: null };

  function setProject(p) {
    const bg = p.dataset.bg;
    const accent = p.dataset.accent;
    setThemeColor(bg);
    if (!hasGSAP || reduceMotion) {
      work.style.setProperty('--work-bg', bg);
      work.style.setProperty('--accent', accent);
      workState.bg = bg;
      workState.accent = accent;
      return;
    }
    if (workState.tween) workState.tween.kill();
    const fromBg = workState.bg;
    const fromAc = workState.accent;
    const ib = gsap.utils.interpolate(fromBg, bg);
    const ia = gsap.utils.interpolate(fromAc, accent);
    const prog = { t: 0 };
    workState.tween = gsap.to(prog, {
      t: 1,
      duration: 0.9,
      ease: 'power2.out',
      onUpdate: () => {
        workState.bg = ib(prog.t);
        workState.accent = ia(prog.t);
        work.style.setProperty('--work-bg', workState.bg);
        work.style.setProperty('--accent', workState.accent);
      },
    });
  }

  if (projects.length) {
    work.style.setProperty('--work-bg', workState.bg);
    work.style.setProperty('--accent', workState.accent);
  }

  /* ------------------------------------------------------------------------
     Process: progress line
     ------------------------------------------------------------------------ */
  const stepsBody = $('[data-steps]');
  const steps = $$('[data-step]');
  let stepMarks = null;
  function measureSteps() {
    if (!stepsBody) return;
    const track = $('.process__track', stepsBody).getBoundingClientRect();
    const vertical = track.height > track.width;
    const len = vertical ? track.height : track.width;
    stepMarks = steps.map((s) => {
      const num = $('.step__dot', s).getBoundingClientRect();
      const pos = vertical ? num.top + num.height / 2 - track.top : num.left + num.width / 2 - track.left;
      return len ? pos / len : 0;
    });
  }
  function updateSteps(progress) {
    if (!stepsBody) return;
    if (!stepMarks) measureSteps();
    stepsBody.style.setProperty('--progress', progress.toFixed(4));
    steps.forEach((s, i) => s.classList.toggle('is-active', progress >= stepMarks[i] - 0.004));
  }

  // Everything below measures the page, so it waits until the browser is idle
  function initScroll() {
    if (hasGSAP) {
      // the paper section slides over the sticky hero
      const intro = $('#uvod');
      if (!reduceMotion) {
        gsap.timeline({
          scrollTrigger: { trigger: intro, start: 'top bottom', end: 'top top', scrub: true },
        })
          .to(heroInner, { scale: 0.93, yPercent: -4, ease: 'none' }, 0)
          .to(heroShade, { opacity: 0.55, ease: 'none' }, 0);
      }
      ST.create({
        trigger: intro,
        start: 'top -2%',
        onEnter: () => { hero.style.visibility = 'hidden'; },
        onLeaveBack: () => { hero.style.visibility = ''; },
      });

      // project colour morph
      projects.forEach((p) => {
        ST.create({
          trigger: p,
          start: 'top 62%',
          end: 'bottom 62%',
          onToggle: (self) => { if (self.isActive) setProject(p); },
        });
      });
      ST.create({
        trigger: work,
        start: 'top 62%',
        onEnter: () => setThemeColor(workState.bg),
      });

      if (!reduceMotion) {
        // phone mockups float slightly faster than the screens next to them
        gsap.matchMedia().add('(min-width: 1024px)', () => {
          $$('[data-depth]').forEach((el) => {
            gsap.fromTo(el, { y: 60 }, {
              y: -60,
              ease: 'none',
              scrollTrigger: { trigger: el.closest('[data-project]'), start: 'top bottom', end: 'bottom top', scrub: true },
            });
          });
        });

        // about photo drifts inside its frame
        $$('[data-parallax]').forEach((img) => {
          gsap.fromTo(img, { yPercent: -4 }, {
            yPercent: 4,
            ease: 'none',
            scrollTrigger: { trigger: img.closest('.about__frame'), start: 'top bottom', end: 'bottom top', scrub: true },
          });
        });
      }

      if (stepsBody) {
        if (!reduceMotion) {
          ST.addEventListener('refresh', measureSteps);
          ST.create({
            trigger: stepsBody,
            start: 'top 72%',
            end: 'bottom 58%',
            scrub: 0.6,
            onUpdate: (self) => updateSteps(self.progress),
          });
          updateSteps(0);
        } else {
          updateSteps(1);
        }
      }
    } else {
      if (projects.length && 'IntersectionObserver' in window) {
        const pio = new IntersectionObserver((entries) => {
          entries.forEach((en) => { if (en.isIntersecting) setProject(en.target); });
        }, { rootMargin: '-40% 0px -55% 0px' });
        projects.forEach((p) => pio.observe(p));
      }
      updateSteps(1);
    }
  }
  if ('requestIdleCallback' in window) requestIdleCallback(initScroll, { timeout: 1200 });
  else setTimeout(initScroll, 600);

  /* ------------------------------------------------------------------------
     Services accordion
     ------------------------------------------------------------------------ */
  $$('[data-service]').forEach((item, i) => {
    const btn = $('.service__toggle', item);
    const set = (open) => {
      item.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    };
    set(i === 0);
    btn.addEventListener('click', () => {
      set(!item.classList.contains('is-open'));
      if (hasGSAP) setTimeout(() => ST.refresh(), 650);
    });
  });

  /* ------------------------------------------------------------------------
     FAQ accordion (one open at a time)
     ------------------------------------------------------------------------ */
  const faqItems = $$('[data-faq]');
  faqItems.forEach((item) => {
    const btn = $('.faq__q', item);
    btn.addEventListener('click', () => {
      const open = !item.classList.contains('is-open');
      faqItems.forEach((other) => {
        const on = other === item ? open : false;
        other.classList.toggle('is-open', on);
        $('.faq__q', other).setAttribute('aria-expanded', String(on));
      });
      setTimeout(() => {
        if (lenis && typeof lenis.resize === 'function') lenis.resize();
        if (hasGSAP) ST.refresh();
      }, 600);
    });
  });

  /* ------------------------------------------------------------------------
     Cursor label over live screens + archive preview (mouse only)
     ------------------------------------------------------------------------ */
  if (finePointer && !reduceMotion) {
    const cl = { x: -100, y: -100, tx: -100, ty: -100, s: 0.4, on: false };
    $$('[data-cursor]').forEach((el) => {
      el.style.cursor = 'none';
      el.addEventListener('pointerenter', (e) => {
        cl.on = true;
        cl.x = cl.tx = e.clientX;
        cl.y = cl.ty = e.clientY;
        cursorLabel.classList.add('is-visible');
      });
      el.addEventListener('pointerleave', () => {
        cl.on = false;
        cursorLabel.classList.remove('is-visible');
      });
    });

    const box = $('[data-preview-box]');
    const boxImg = box ? $('img', box) : null;
    const pv = { x: 0, y: 0, tx: 0, ty: 0, s: 0.6, r: 0, on: false };
    const rows = $$('[data-preview]');
    rows.forEach((row) => {
      row.addEventListener('pointerenter', (e) => {
        if (!box) return;
        if (boxImg.getAttribute('src') !== row.dataset.preview) boxImg.src = row.dataset.preview;
        box.classList.toggle('is-tall', row.hasAttribute('data-preview-tall'));
        if (!pv.on) {
          pv.x = pv.tx = e.clientX;
          pv.y = pv.ty = e.clientY;
        }
        pv.on = true;
        box.classList.add('is-visible');
      });
      row.addEventListener('pointerleave', () => {
        pv.on = false;
        if (box) box.classList.remove('is-visible');
      });
    });
    // warm the preview images once the page is idle
    const warm = () => rows.forEach((r) => { const im = new Image(); im.src = r.dataset.preview; });
    if ('requestIdleCallback' in window) requestIdleCallback(warm, { timeout: 4000 });
    else setTimeout(warm, 3000);

    document.addEventListener('pointermove', (e) => {
      cl.tx = e.clientX;
      cl.ty = e.clientY;
      pv.tx = e.clientX;
      pv.ty = e.clientY;
    }, { passive: true });

    let prev = performance.now();
    const loop = (now) => {
      requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      const k1 = 1 - Math.exp(-dt * 18);
      cl.x += (cl.tx - cl.x) * k1;
      cl.y += (cl.ty - cl.y) * k1;
      cl.s += ((cl.on ? 1 : 0.4) - cl.s) * (1 - Math.exp(-dt * 12));
      cursorLabel.style.transform = `translate3d(${cl.x.toFixed(1)}px,${cl.y.toFixed(1)}px,0) translate(-50%,-50%) scale(${cl.s.toFixed(3)})`;

      if (box) {
        const k2 = 1 - Math.exp(-dt * 9);
        const vx = pv.tx - pv.x;
        pv.x += vx * k2;
        pv.y += (pv.ty - pv.y) * k2;
        pv.s += ((pv.on ? 1 : 0.6) - pv.s) * (1 - Math.exp(-dt * 10));
        pv.r += (clamp(vx * 0.06, -7, 7) - pv.r) * (1 - Math.exp(-dt * 8));
        box.style.transform = `translate3d(${pv.x.toFixed(1)}px,${pv.y.toFixed(1)}px,0) translate(-50%,-50%) rotate(${pv.r.toFixed(2)}deg) scale(${pv.s.toFixed(3)})`;
      }
    };
    requestAnimationFrame(loop);
  }

  /* ------------------------------------------------------------------------
     Contact: copy address, form
     ------------------------------------------------------------------------ */
  $$('[data-copy]').forEach((btn) => {
    let timer = 0;
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
      } catch (e) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;opacity:0;';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (err) { /* ignore */ }
        ta.remove();
      }
      btn.innerHTML = STR[lang].copied;
      clearTimeout(timer);
      timer = setTimeout(() => {
        btn.innerHTML = lang === 'en' ? EN[btn.dataset.i18n] : btn.dataset.sr;
      }, 1800);
    });
  });

  const form = $('[data-form]');
  if (form) {
    const status = $('[data-form-status]', form);
    const submit = $('button[type="submit"]', form);
    const fields = {
      name: $('#f-name', form),
      contact: $('#f-contact', form),
      msg: $('#f-msg', form),
    };
    const setError = (input, msg) => {
      const field = input.closest('.field');
      const out = $(`[data-error-for="${input.id}"]`, form);
      field.classList.toggle('is-invalid', Boolean(msg));
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (out) out.textContent = msg || '';
    };
    Object.values(fields).forEach((input) => {
      input.addEventListener('input', () => {
        if (input.closest('.field').classList.contains('is-invalid')) setError(input, '');
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const t = STR[lang];
      const honey = form.querySelector('[name="_honey"]');
      if (honey && honey.value) return;

      const name = fields.name.value.trim();
      const contact = fields.contact.value.trim();
      const msg = fields.msg.value.trim();
      let firstBad = null;
      const flag = (input, m) => { setError(input, m); if (m && !firstBad) firstBad = input; };

      flag(fields.name, name ? '' : t.errName);
      if (!contact) flag(fields.contact, t.errContact);
      else if (!/^\S+@\S+\.\S+$/.test(contact) && !/^\+?[\d\s/().-]{6,}$/.test(contact)) flag(fields.contact, t.errContactBad);
      else flag(fields.contact, '');
      flag(fields.msg, msg.length >= 3 ? '' : t.errMsg);
      if (firstBad) {
        firstBad.focus();
        return;
      }

      status.textContent = t.sending;
      submit.disabled = true;
      const payload = {
        Ime: name,
        Firma: form.querySelector('#f-company').value.trim() || '-',
        Kontakt: contact,
        Usluga: form.querySelector('#f-type').value,
        Poruka: msg,
        Jezik: lang.toUpperCase(),
        _subject: `Novi upit sa portfolija: ${name}`,
        _template: 'table',
        _captcha: 'false',
      };
      try {
        const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || 'send failed');
        form.reset();
        status.textContent = STR[lang].sent;
      } catch (err) {
        status.innerHTML = STR[lang].failed;
      } finally {
        submit.disabled = false;
      }
    });
  }

  /* ------------------------------------------------------------------------
     Marker highlight in the intro statement
     ------------------------------------------------------------------------ */
  let hlObserver = null;
  function watchHighlights() {
    const els = $$('[data-hl]');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    if (!hlObserver) {
      hlObserver = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add('is-in');
          hlObserver.unobserve(en.target);
        });
      }, { rootMargin: '0px 0px -22% 0px' });
    }
    els.forEach((el) => { if (!el.classList.contains('is-in')) hlObserver.observe(el); });
  }
  watchHighlights();
  document.addEventListener('langchange', watchHighlights);

  /* ------------------------------------------------------------------------
     Magnetic buttons (mouse only)
     ------------------------------------------------------------------------ */
  if (finePointer && !reduceMotion) {
    $$('[data-magnetic]').forEach((el) => {
      const m = { x: 0, y: 0, tx: 0, ty: 0, raf: 0 };
      const step = () => {
        m.x += (m.tx - m.x) * 0.2;
        m.y += (m.ty - m.y) * 0.2;
        el.style.transform = `translate3d(${m.x.toFixed(2)}px,${m.y.toFixed(2)}px,0)`;
        m.raf = Math.abs(m.tx - m.x) + Math.abs(m.ty - m.y) > 0.05 ? requestAnimationFrame(step) : 0;
        if (!m.raf && !m.tx && !m.ty) el.style.transform = '';
      };
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        m.tx = clamp((e.clientX - (r.left + r.width / 2)) * 0.22, -14, 14);
        m.ty = clamp((e.clientY - (r.top + r.height / 2)) * 0.32, -9, 9);
        if (!m.raf) m.raf = requestAnimationFrame(step);
      });
      el.addEventListener('pointerleave', () => {
        m.tx = 0;
        m.ty = 0;
        if (!m.raf) m.raf = requestAnimationFrame(step);
      });
    });
  }

  /* ------------------------------------------------------------------------
     "Ask about this service" pre-selects the service in the form
     ------------------------------------------------------------------------ */
  const typeSelect = $('#f-type');
  $$('[data-pick]').forEach((a) => {
    a.addEventListener('click', () => {
      if (!typeSelect) return;
      typeSelect.value = a.dataset.pick;
      const field = typeSelect.closest('.field');
      if (field) {
        field.classList.remove('is-picked');
        void field.offsetWidth;
        field.classList.add('is-picked');
      }
    });
  });

  /* ------------------------------------------------------------------------
     Floating quick contact: shows after the hero, hides at the contact section
     ------------------------------------------------------------------------ */
  const fab = $('[data-fab]');
  if (fab) {
    const fabBtn = $('[data-fab-toggle]', fab);
    let fabOpen = false;
    let nearContact = false;
    const setFab = (open) => {
      fabOpen = open;
      fab.classList.toggle('is-open', open);
      fabBtn.setAttribute('aria-expanded', String(open));
    };
    const updateFab = () => {
      const show = window.scrollY > window.innerHeight * 0.9 && !nearContact;
      fab.classList.toggle('is-shown', show);
      if (!show && fabOpen) setFab(false);
    };
    fabBtn.addEventListener('click', () => setFab(!fabOpen));
    $$('a', fab).forEach((a) => a.addEventListener('click', () => setFab(false)));
    document.addEventListener('click', (e) => {
      if (fabOpen && !fab.contains(e.target)) setFab(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && fabOpen) {
        setFab(false);
        fabBtn.focus();
      }
    });
    const ends = [$('#kontakt'), $('.footer'), $('.process__cta')].filter(Boolean);
    if ('IntersectionObserver' in window) {
      const seen = new Set();
      const fio = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) seen.add(en.target); else seen.delete(en.target); });
        nearContact = seen.size > 0;
        updateFab();
      }, { rootMargin: '0px 0px -35% 0px' });
      ends.forEach((el) => fio.observe(el));
    }
    window.addEventListener('scroll', updateFab, { passive: true });
    updateFab();
  }

  /* ------------------------------------------------------------------------
     Footer clock (Obrenovac = Europe/Belgrade)
     ------------------------------------------------------------------------ */
  const clock = $('[data-clock]');
  if (clock) {
    let fmt;
    try {
      fmt = new Intl.DateTimeFormat('sr-RS', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Belgrade' });
    } catch (e) {
      fmt = null;
    }
    const tickClock = () => {
      if (fmt) clock.textContent = fmt.format(new Date());
    };
    tickClock();
    setInterval(tickClock, 15000);
  }

  /* ------------------------------------------------------------------------
     A note for curious developers
     ------------------------------------------------------------------------ */
  try {
    console.log(
      '%cStefan Stević%c  web developer\nGledate kod? Javite se: ' + EMAIL,
      'background:#fec834;color:#121628;font:800 15px/1.6 Archivo,Arial,sans-serif;padding:4px 10px;border-radius:4px;',
      'color:inherit;font:13px/1.6 Archivo,Arial,sans-serif;'
    );
  } catch (e) { /* ignore */ }
})();
