"""Dodaje ?v=<hash> na css/style.css i js/main.js u index.html.
Pokreni posle svake izmene CSS-a ili JS-a: python3 tools/bump-version.py
Tako browser uvek učita novu verziju umesto stare iz keša."""
import hashlib, re, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
html_path = root / 'index.html'
html = html_path.read_text(encoding='utf-8')
for rel in ('css/style.css', 'js/main.js'):
    h = hashlib.sha1((root / rel).read_bytes()).hexdigest()[:8]
    html, n = re.subn(re.escape(rel) + r'(\?v=[0-9a-f]+)?"', f'{rel}?v={h}"', html)
    assert n == 1, rel
    print(rel, h)
html_path.write_text(html, encoding='utf-8')
