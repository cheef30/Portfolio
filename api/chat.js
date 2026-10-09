// Vercel funkcija: prima poruke iz chata na sajtu i vraća odgovor od Gemini-ja.
// Potrebne promenljive na Vercelu (Settings → Environment Variables):
//   GEMINI_API_KEY   ključ sa https://aistudio.google.com/apikey  (obavezno)
//   GEMINI_MODEL     npr. gemini-flash-latest                     (nije obavezno)

const { SYSTEM_PROMPT } = require('../lib/assistant-prompt');

const MODEL = process.env.GEMINI_MODEL || 'gemini-flash-latest';
const MAX_TURNS = 24; // koliko poruka iz razgovora šaljemo modelu
const MAX_USER_CHARS = 700;
const PER_IP_PER_HOUR = 40; // zaštita od zloupotrebe (po instanci funkcije)

const hits = new Map();
function tooMany(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 3600e3);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > PER_IP_PER_HOUR;
}

function originAllowed(origin) {
  if (!origin) return true;
  try {
    const host = new URL(origin).hostname;
    return (
      host === 'stefanstevic.rs' ||
      host.endsWith('.stefanstevic.rs') ||
      host.endsWith('.vercel.app') ||
      host === 'localhost' ||
      host === '127.0.0.1'
    );
  } catch (e) {
    return false;
  }
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  if (!originAllowed(req.headers.origin)) return res.status(403).json({ error: 'origin' });

  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(503).json({ error: 'not_configured' });

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (tooMany(ip)) return res.status(429).json({ error: 'rate_limited' });

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = null; }
  }
  const raw = body && Array.isArray(body.messages) ? body.messages : null;
  if (!raw || !raw.length) return res.status(400).json({ error: 'bad_request' });

  const messages = raw
    .slice(-MAX_TURNS)
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.text === 'string' && m.text.trim())
    .map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.role === 'user' ? m.text.slice(0, MAX_USER_CHARS) : m.text.slice(0, 2000) }],
    }));
  while (messages.length && messages[0].role !== 'user') messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'bad_request' });
  }

  const lang = body.lang === 'en' ? 'en' : 'sr';
  const hint = lang === 'en'
    ? '\n\nThe visitor is browsing the English version of the site. Reply in English unless they write in Serbian.'
    : '\n\nPosetilac gleda srpsku verziju sajta.';

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25000);
  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL)}:generateContent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT + hint }] },
          contents: messages,
          generationConfig: { temperature: 0.5, maxOutputTokens: 2048 },
        }),
        signal: controller.signal,
      }
    );
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      console.error('gemini error', r.status, JSON.stringify(data).slice(0, 500));
      return res.status(r.status === 429 ? 429 : 502).json({ error: r.status === 429 ? 'busy' : 'upstream' });
    }
    const parts = (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) || [];
    const reply = parts.filter((p) => !p.thought).map((p) => p.text || '').join('').trim();
    if (!reply) return res.status(502).json({ error: 'empty' });
    return res.status(200).json({ reply });
  } catch (e) {
    console.error('chat failed', e && e.message);
    return res.status(504).json({ error: 'timeout' });
  } finally {
    clearTimeout(timer);
  }
};
