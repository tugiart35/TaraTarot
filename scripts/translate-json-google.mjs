import fs from 'node:fs/promises';
import translate from '@vitalets/google-translate-api';

const SRC = process.argv[2];
const DST = process.argv[3];
const TO  = process.argv[4] || 'en';

if (!SRC || !DST) {
  console.error('Usage: node scripts/translate-json-google.mjs <src.json> <dst.json> [to]');
  process.exit(1);
}

const PLACEHOLDER_RE = /(\{[^}]+\}|<[^>]+>|\:[a-zA-Z0-9_+-]+\:|\\n)/g;

async function gTranslate(text, to) {
  const parts = text.split(PLACEHOLDER_RE);
  const out = [];
  for (const seg of parts) {
    if (!seg) { out.push(seg); continue; }
    if (PLACEHOLDER_RE.test(seg) || !/[A-Za-zÇĞİÖŞÜçğıöşü]/.test(seg)) { out.push(seg); continue; }
    try { const res = await translate(seg, { to }); out.push(res.text); }
    catch { out.push(seg); }
    await new Promise(r => setTimeout(r, 150));
  }
  return out.join('');
}

async function walk(n) {
  if (typeof n === 'string') return gTranslate(n, TO);
  if (Array.isArray(n)) return Promise.all(n.map(walk));
  if (n && typeof n === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(n)) out[k] = await walk(v);
    return out;
  }
  return n;
}

const raw = await fs.readFile(SRC, 'utf8');
const json = JSON.parse(raw);
const translated = await walk(json);
await fs.writeFile(DST, JSON.stringify(translated, null, 2), 'utf8');
console.log(`✅ Translated ${SRC} → ${DST} (${TO})`);
