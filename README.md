# Stefan Stević — portfolio

Statički sajt: HTML, CSS i JavaScript, bez build koraka. Sve biblioteke i fontovi
su u projektu (nema CDN-a ni Google Fonts linka), pa sajt radi brzo i bez spoljnih zavisnosti.

## Pokretanje lokalno

Fontovi i skripte se ne učitavaju pouzdano kad se `index.html` otvori duplim klikom,
zato pokreni mali server u ovom folderu:

```bash
npx serve .
# ili
python -m http.server 8000
```

pa otvori `http://localhost:3000` (odnosno `:8000`). U VS Code-u radi i Live Server.

## Objavljivanje na Vercel

1. Repo je već na GitHubu (`cheef30/Portfolio`).
2. Na vercel.com → **Add New Project** → izaberi repo → **Deploy** (framework: Other, bez build komande).
3. `vercel.json` već podešava keširanje fontova, slika i skripti.

Kad povežeš domen, u `<head>` dodaj `<link rel="canonical" href="https://tvojdomen.rs/">`
i u `og:image` upiši pun URL (`https://tvojdomen.rs/og-image.jpg`) da bi se slika
pojavila kad link podeliš na Vajberu, Fejsbuku i LinkedInu.

## Kontakt forma

Forma šalje poruke preko FormSubmit-a na `stefanstevicoz30@gmail.com`.
**Prvi put kad neko pošalje poruku, FormSubmit ti šalje mejl za aktivaciju** —
klikni na link u tom mejlu i od tada poruke stižu direktno. Dok forma nije aktivirana,
posetilac dobija poruku da ti piše direktno na mejl.

Da promeniš adresu: zameni `stefanstevicoz30@gmail.com` u `index.html` i u
konstanti `EMAIL` na vrhu `js/main.js`.

## Šta gde menjaš

| Šta | Gde |
|---|---|
| Svi tekstovi na srpskom | `index.html` |
| Engleski prevod | objekat `EN` na vrhu `js/main.js` (ključ = `data-i18n` iz HTML-a) |
| Boje, razmaci, fontovi | promenljive u `:root` na vrhu `css/style.css` |
| Slike projekata | `img/work/` (svaka slika ima veliku i malu verziju) |
| Tvoja fotografija | `img/stefan-hero-*.avif/.webp` (izrezana), `img/stefan-summit-*.webp`, `img/stefan-congress-*.webp` |

### Dodavanje novog projekta

Kopiraj jedan `<article class="project">` blok u `index.html`, promeni tekstove,
linkove i slike. Atributi `data-bg` i `data-accent` određuju boju pozadine i akcenta
dok je projekat na ekranu. Za svaki novi `data-i18n` ključ dodaj engleski tekst u `EN`.

Manji radovi idu u listu „Još radova” (`<li>` sa klasom `archive__row`); `data-preview`
je slika koja prati kursor.

### Telefon, WhatsApp, Viber i Instagram

Broj **064 558 0188** i Instagram **@stevke30** stoje na više mesta: dugmad u heroju,
kartice u sekciji Kontakt, plutajuće dugme dole desno, meni na telefonu i futer.
Ako promeniš broj, u `index.html` zameni sve pojave:

- `381645580188` (linkovi za WhatsApp, Viber, poziv i JSON-LD),
- `064 558 0188` (tekst koji posetilac vidi),

a u `js/main.js` ključeve `wa.href`, `quick.wa`, `quick.viber` i `phone.display` (engleska verzija).
WhatsApp link otvara razgovor sa već upisanom porukom, na srpskom ili engleskom, zavisno od jezika sajta.

Trajanje koraka u sekciji „Kako radim” (Besplatno, Oko nedelju dana, Od 1 do 3 nedelje, Jedan dan)
je okvirno: ako radiš drugačije, izmeni `p1.time` do `p4.time` u `index.html` i u `EN` u `js/main.js`.

## Tehnički detalji

- **Hero**: ime se slaže slovo po slovo u Archivo fontu sa promenljivom širinom.
  Slova bliže kursoru se šire, ostala se sužavaju, a red uvek ostaje iste širine.
  Na telefonu talas ide sam od sebe. Fotografija je „između” dva reda imena.
- **GSAP + ScrollTrigger** (`vendor/`) za uvodnu animaciju i animacije na skrol,
  **Lenis** za glatko skrolovanje. Sve se isključuje ako korisnik ima uključeno
  „smanji animacije” u sistemu.
- **Fontovi** su smanjeni na znakove koji se koriste: osnovni latinični (80 KB)
  i poseban mali fajl samo za č, ć, š, ž, đ (7 KB).
- **Slike**: hero je u AVIF formatu (WebP kao rezerva), ostalo WebP sa `srcset`.
- **Dvojezičnost**: SR/EN prekidač pamti izbor u pregledaču.
- **Brz kontakt**: WhatsApp, Viber i Instagram dugmad u heroju, kartice u kontaktu i plutajuće
  dugme koje se pojavljuje posle hero sekcije, a skriva se kod velikih CTA dugmadi i kontakta.
- **CTA dugmad**: krug sa strelicom se razliva preko celog dugmeta, a na računaru se dugme
  blago „lepi” za kursor.
- Lighthouse (lokalno, sa gzip kompresijom kao na Vercelu):
  desktop 100 / 100 / 100 / 100, mobilni 97 / 100 / 100 / 100
  (performanse / pristupačnost / dobre prakse / SEO).
