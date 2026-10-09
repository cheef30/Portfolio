/* AI asistent: chat prozor koji priča sa /api/chat (Vercel funkcija + Gemini).
   Svaki razgovor se šalje Stefanu na mejl preko FormSubmit-a. */
(() => {
  'use strict';

  // Na GitHub Pages nema serverske funkcije, pa asistent ostaje sakriven.
  if (/github\.io$/.test(location.hostname) || location.protocol === 'file:') return;

  const EMAIL = 'stefanstevicoz30@gmail.com';
  const WA = 'https://wa.me/381645580188';
  const STORE = 'ss-chat-v1';
  const MAX_USER_MSGS = 20;

  const T = {
    sr: {
      title: 'Stefanov asistent',
      sub: 'AI, odgovara odmah',
      close: 'Zatvori',
      placeholder: 'Napišite pitanje…',
      send: 'Pošalji',
      hello: 'Zdravo! Ja sam Stefanov AI asistent. Pitajte me o izradi sajta, rokovima, projektima ili kako izgleda saradnja.',
      chips: ['Koliko košta izrada sajta?', 'Koliko traje izrada?', 'Koje sajtove je Stefan radio?'],
      note: 'AI može da pogreši. Razgovor vidi i Stefan, da bi mogao da vam se javi.',
      error: 'Asistent trenutno ne može da odgovori. Pišite Stefanu direktno na WhatsApp: ' + WA,
      busy: 'Trenutno je gužva. Probajte ponovo za minut, ili pišite Stefanu na WhatsApp: ' + WA,
      limit: 'Za više detalja najbolje je da se čujete sa Stefanom direktno, na WhatsApp-u ili Viberu: 064 558 0188.',
      thinking: 'Asistent piše',
      reset: 'Nov razgovor',
    },
    en: {
      title: 'Stefan’s assistant',
      sub: 'AI, replies instantly',
      close: 'Close',
      placeholder: 'Type a question…',
      send: 'Send',
      hello: 'Hi! I’m Stefan’s AI assistant. Ask me about building a website, timelines, past projects or what working together looks like.',
      chips: ['How much does a website cost?', 'How long does it take?', 'What sites has Stefan built?'],
      note: 'AI can make mistakes. Stefan can see this chat so he can get back to you.',
      error: 'The assistant can’t reply right now. Message Stefan directly on WhatsApp: ' + WA,
      busy: 'It’s busy right now. Try again in a minute, or message Stefan on WhatsApp: ' + WA,
      limit: 'For more details it’s best to talk to Stefan directly on WhatsApp or Viber: +381 64 558 0188.',
      thinking: 'Assistant is typing',
      reset: 'New chat',
    },
  };
  const lang = () => (document.documentElement.lang === 'en' ? 'en' : 'sr');
  const t = () => T[lang()];

  // ---------- state ----------
  let messages = [];
  let sentCount = 0; // how many messages were already emailed
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORE) || 'null');
    if (saved && Array.isArray(saved.messages)) {
      messages = saved.messages;
      sentCount = saved.sentCount || 0;
    }
  } catch (e) { /* ignore */ }
  const save = () => {
    try { sessionStorage.setItem(STORE, JSON.stringify({ messages, sentCount })); } catch (e) { /* ignore */ }
  };

  // ---------- helpers ----------
  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function format(text) {
    let h = esc(text.trim());
    h = h.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    h = h.replace(/(^|[\s(])(https?:\/\/[^\s<)]+[^\s<).,!?])/g, (m, pre, url) =>
      `${pre}<a href="${url}" target="_blank" rel="noopener">${url.replace(/^https?:\/\/(www\.)?/, '')}</a>`);
    h = h.replace(/(^|[\s(])(\+381[\d\s]{8,13}\d|06\d[\d\s]{6,9}\d)/g, (m, pre, num) =>
      `${pre}<a href="tel:${num.replace(/\s/g, '').replace(/^0/, '+381')}">${num}</a>`);
    h = h.replace(/^\s*[-*•]\s+/gm, '• ');
    return h.replace(/\n/g, '<br>');
  }

  // ---------- DOM ----------
  let panel; let log; let input; let sendBtn; let chips; let opener = null; let busy = false;

  function build() {
    panel = document.createElement('section');
    panel.className = 'chat';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-labelledby', 'chat-title');
    panel.setAttribute('data-lenis-prevent', '');
    panel.hidden = true;
    panel.innerHTML = `
      <header class="chat__head">
        <span class="chat__avatar" aria-hidden="true"><svg class="logo"><use href="#i-logo"/></svg></span>
        <div class="chat__who"><p class="chat__title" id="chat-title"></p><p class="chat__sub"><span class="pulse" aria-hidden="true"></span><span data-c="sub"></span></p></div>
        <button class="chat__reset" type="button" data-c-reset></button>
        <button class="chat__close" type="button" data-c-close><span class="sr-only" data-c="close"></span></button>
      </header>
      <div class="chat__log" aria-live="polite"></div>
      <div class="chat__chips"></div>
      <form class="chat__form" novalidate>
        <label class="sr-only" for="chat-input" data-c="placeholder"></label>
        <textarea id="chat-input" class="chat__input" rows="1" maxlength="700" autocomplete="off"></textarea>
        <button class="chat__send" type="submit"><span class="sr-only" data-c="send"></span><svg aria-hidden="true"><use href="#i-arrow"/></svg></button>
      </form>
      <p class="chat__note" data-c="note"></p>`;
    document.body.appendChild(panel);
    log = panel.querySelector('.chat__log');
    input = panel.querySelector('.chat__input');
    sendBtn = panel.querySelector('.chat__send');
    chips = panel.querySelector('.chat__chips');

    panel.querySelector('[data-c-close]').addEventListener('click', close);
    panel.querySelector('[data-c-reset]').addEventListener('click', () => {
      flushTranscript();
      messages = [];
      sentCount = 0;
      save();
      render();
      input.focus();
    });
    panel.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      ask(input.value);
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        ask(input.value);
      }
    });
    input.addEventListener('input', grow);
    panel.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
    document.addEventListener('langchange', () => { if (panel) texts(); });
    texts();
    render();
  }

  function texts() {
    const s = t();
    panel.querySelector('#chat-title').textContent = s.title;
    panel.querySelectorAll('[data-c]').forEach((el) => { el.textContent = s[el.dataset.c]; });
    panel.querySelector('[data-c-close]').setAttribute('aria-label', s.close);
    panel.querySelector('[data-c-reset]').textContent = s.reset;
    input.placeholder = s.placeholder;
    if (!messages.length) render();
  }

  function grow() {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 140) + 'px';
  }

  function bubble(role, html, extra) {
    const el = document.createElement('div');
    el.className = `chat__msg chat__msg--${role}${extra ? ' ' + extra : ''}`;
    el.innerHTML = html;
    log.appendChild(el);
    return el;
  }

  function render() {
    log.innerHTML = '';
    bubble('assistant', format(t().hello));
    messages.forEach((m) => bubble(m.role, format(m.text)));
    chips.innerHTML = '';
    if (!messages.length) {
      t().chips.forEach((q) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'chat__chip';
        b.textContent = q;
        b.addEventListener('click', () => ask(q));
        chips.appendChild(b);
      });
    }
    chips.hidden = Boolean(messages.length);
    panel.querySelector('[data-c-reset]').hidden = !messages.length;
    scrollDown();
  }

  function scrollDown() {
    requestAnimationFrame(() => { log.scrollTop = log.scrollHeight; });
  }

  // ---------- talking to the server ----------
  async function ask(raw) {
    const text = String(raw || '').trim();
    if (!text || busy) return;
    input.value = '';
    grow();
    chips.hidden = true;

    messages.push({ role: 'user', text: text.slice(0, 700) });
    panel.querySelector('[data-c-reset]').hidden = false;
    bubble('user', format(text));
    save();

    if (messages.filter((m) => m.role === 'user').length > MAX_USER_MSGS) {
      messages.push({ role: 'assistant', text: t().limit });
      bubble('assistant', format(t().limit));
      save();
      scrollDown();
      return;
    }

    busy = true;
    sendBtn.disabled = true;
    const typing = bubble('assistant', `<span class="chat__dots" aria-label="${esc(t().thinking)}"><i></i><i></i><i></i></span>`, 'is-typing');
    scrollDown();

    let reply = '';
    let failed = false;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messages.slice(-24), lang: lang() }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.reply) reply = data.reply;
      else {
        failed = true;
        reply = res.status === 429 ? t().busy : t().error;
      }
    } catch (e) {
      failed = true;
      reply = t().error;
    }
    typing.remove();
    bubble('assistant', format(reply), failed ? 'is-error' : '');
    if (!failed) {
      messages.push({ role: 'assistant', text: reply });
      save();
      scheduleTranscript();
    } else {
      messages.pop(); // let the visitor resend the same question
      save();
    }
    busy = false;
    sendBtn.disabled = false;
    scrollDown();
    if (window.matchMedia('(hover: hover)').matches) input.focus();
  }

  // ---------- transcript to Stefan's inbox ----------
  let transcriptTimer = null;
  function scheduleTranscript() {
    clearTimeout(transcriptTimer);
    transcriptTimer = setTimeout(flushTranscript, 120000);
  }
  function flushTranscript() {
    clearTimeout(transcriptTimer);
    if (messages.length <= sentCount || !messages.some((m) => m.role === 'user')) return;
    const lines = messages.map((m) => `${m.role === 'user' ? 'POSETILAC' : 'ASISTENT'}: ${m.text}`).join('\n\n');
    const firstQ = (messages.find((m) => m.role === 'user') || {}).text || '';
    sentCount = messages.length;
    save();
    try {
      fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: 'POST',
        keepalive: true,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `AI asistent: ${firstQ.slice(0, 60)}`,
          _template: 'box',
          _captcha: 'false',
          Razgovor: lines,
          Jezik: lang().toUpperCase(),
          Stranica: location.href,
        }),
      }).catch(() => {});
    } catch (e) { /* ignore */ }
  }
  window.addEventListener('pagehide', flushTranscript);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushTranscript();
  });

  // ---------- open / close ----------
  function open(from) {
    if (!panel) build();
    opener = from || document.activeElement;
    panel.hidden = false;
    document.documentElement.classList.add('chat-open');
    requestAnimationFrame(() => panel.classList.add('is-open'));
    scrollDown();
    setTimeout(() => input.focus({ preventScroll: true }), 250);
  }
  function close() {
    if (!panel || panel.hidden) return;
    panel.classList.remove('is-open');
    document.documentElement.classList.remove('chat-open');
    flushTranscript();
    setTimeout(() => { panel.hidden = true; }, 300);
    if (opener && opener.focus) opener.focus({ preventScroll: true });
  }

  document.querySelectorAll('[data-chat-open]').forEach((el) => {
    el.hidden = false;
    const li = el.closest('li');
    if (li) li.hidden = false;
  });
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-chat-open]');
    if (!trigger) return;
    e.preventDefault();
    open(trigger);
  });
})();
