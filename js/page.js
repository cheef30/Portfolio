/* ==========================================================================
   Podstranice (usluge, radovi, cene, Obrenovac, Beograd).
   Mali deo main.js-a: meni, navigacija na skrol, česta pitanja i sat u futeru.
   ========================================================================== */
(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Meni na telefonu ---------- */
  const nav = $('[data-nav]');
  const menu = $('[data-menu]');
  const menuToggle = $('[data-menu-toggle]');
  let menuOpen = false;

  function setMenu(open) {
    menuOpen = open;
    menu.classList.toggle('is-open', open);
    nav.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      nav.classList.remove('is-hidden');
      const first = menu.querySelector('a');
      if (first) setTimeout(() => first.focus({ preventScroll: true }), 300);
    }
  }
  menuToggle.addEventListener('click', () => setMenu(!menuOpen));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) {
      setMenu(false);
      menuToggle.focus();
    }
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
    if (e.matches && menuOpen) setMenu(false);
  });

  /* ---------- Navigacija: puna traka posle skrola, sakriva se dok skrolujete na dole ---------- */
  let lastY = window.scrollY;
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('is-solid', y > 40);
    if (!menuOpen) {
      if (y > window.innerHeight * 0.8 && y > lastY + 4) nav.classList.add('is-hidden');
      else if (y < lastY - 4 || y < window.innerHeight * 0.8) nav.classList.remove('is-hidden');
    }
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Česta pitanja (jedno otvoreno) ---------- */
  const faqItems = $$('[data-faq]');
  faqItems.forEach((item) => {
    $('.faq__q', item).addEventListener('click', () => {
      const open = !item.classList.contains('is-open');
      faqItems.forEach((other) => {
        const on = other === item ? open : false;
        other.classList.toggle('is-open', on);
        $('.faq__q', other).setAttribute('aria-expanded', String(on));
      });
    });
  });

  /* ---------- Nazad na vrh ---------- */
  const toTop = $('[data-to-top]');
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  /* ---------- Sat u futeru (Obrenovac = Europe/Belgrade) ---------- */
  const clock = $('[data-clock]');
  if (clock) {
    try {
      const fmt = new Intl.DateTimeFormat('sr-RS', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Belgrade' });
      const tick = () => { clock.textContent = fmt.format(new Date()); };
      tick();
      setInterval(tick, 15000);
    } catch (e) { /* ignore */ }
  }
})();
