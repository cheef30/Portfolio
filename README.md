# Stefan Stević, portfolio

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

Sajt je podešen za domen `https://stefanstevic.rs/` (canonical, slika za deljenje,
`sitemap.xml`, `robots.txt`). Ako se domen promeni, zameni tu adresu na tim mestima.

### Čiste adrese

Adresa u browseru ostaje čista: `stefanstevic.rs`, bez `index.html` i bez `#`.
Klik u meniju menja adresu u `stefanstevic.rs/radovi`, `/usluge`, `/kako-radim`,
`/o-meni` ili `/kontakt`, a te adrese mogu da se šalju ljudima i otvaraju sajt
direktno na toj sekciji. To radi preko `rewrites` u `vercel.json`, pa radi samo na Vercelu.
`/index.html` se automatski preusmerava na `/`.

Engleska verzija je na `stefanstevic.rs/en`, a njene sekcije na `/en/work`, `/en/services`,
`/en/process`, `/en/about`, `/en/questions` i `/en/contact`.

## Posle svake izmene: `node tools/build.mjs`

Pokreni `node tools/build.mjs` (treba samo Node, bez npm paketa). Skripta:

- menja `?v=...` na CSS i JS fajlovima, pa browseri odmah učitaju novu verziju umesto stare iz keša,
- pravi engleski sajt `en/index.html` iz `index.html` i prevoda u `tools/site/en.mjs`,
- pravi srpske podstranice iz `tools/site/pages.mjs` i engleske iz `tools/site/pages.en.mjs`,
- pravi `sitemap.xml` (sa oznakama koja stranica je prevod koje),
- proverava da li svaki interni link vodi na stranicu koja postoji (ako ne, ispiše upozorenje).

Fajlove koje skripta pravi ne menjaj ručno (to piše i na vrhu svakog): sve u `en/`,
`usluge/*.html`, `radovi/*.html`, `cena-izrade-sajta.html`, `izrada-sajta-obrenovac.html`,
`izrada-sajta-beograd.html` i `sitemap.xml`. Spisak je u `tools/site/generated.json`.

## Podstranice

| Srpski | Engleski | Šta je |
|---|---|---|
| `/usluge/izrada-sajta-za-firmu`, `/usluge/izrada-web-aplikacija`, `/usluge/3d-konfigurator-i-animacije`, `/usluge/odrzavanje-sajta` | `/en/services/business-website`, `/en/services/web-app-development`, `/en/services/3d-configurator-and-animation`, `/en/services/website-maintenance` | po jedna stranica za svaku uslugu |
| `/radovi/modus-gradnja`, `/radovi/na-izlet`, `/radovi/leto-u-turskoj`, `/radovi/tomasevacka`, `/radovi/pro-klima-obrenovac` | `/en/work/...` (isti nastavci) | opis svakog projekta |
| `/cena-izrade-sajta` | `/en/website-cost` | paketi i okvirne cene (iste kao u `lib/assistant-prompt.js`) |
| `/izrada-sajta-obrenovac`, `/izrada-sajta-beograd` | `/en/web-design-obrenovac`, `/en/web-design-belgrade` | lokalne stranice za pretrage po gradu |

- Srpski tekst je u `tools/site/pages.mjs`, engleski u `tools/site/pages.en.mjs`. Srpska i engleska
  verzija iste stranice imaju isti `id`, i po tome ih build povezuje (`hreflang`, SR/EN prekidač).
- Cene, projekti, slike i utisci klijenata su na jednom mestu: `tools/site/shared.mjs`.
- Navigacija, kontakt i futer podstranica (na oba jezika) su u `tools/site/layout.mjs`.
- Izgled je u `css/page.css`, a skripta (meni, pitanja, sat) u `js/page.js`.

Ako ne želiš javne cene, stavi `SHOW_PRICES = false` na vrhu `shared.mjs` i pokreni build:
stranica sa cenama nestaje (srpska i engleska), a cene se skidaju i sa ostalih stranica. Link
„Okvirne cene po paketima” i „Cena izrade sajta” u `index.html` onda obriši ručno, build će te upozoriti.

Kad dodaješ novu podstranicu, dodaj njen link i u futer: `footerLinks` za oba jezika u `layout.mjs`
i lista `footer__links` u `index.html` (sa `data-i18n` ključem i prevodom u `en.mjs`).
Linkove ka podstranicama u `index.html` piši sa srpskom adresom. Build ih na `/en` sam menja u engleske.

## AI asistent

Chat na sajtu ("Pitajte mog AI asistenta") odgovara na pitanja o tebi preko Google Gemini-ja.

- `api/chat.js` je Vercel funkcija koja razgovara sa Gemini-jem. Ključ je samo na serveru.
- `lib/assistant-prompt.js` je sve što asistent zna o tebi. **Kad promeniš nešto na sajtu
  (projekte, usluge, rokove), promeni i ovde.**
- `js/chat.js` je chat prozor. Svaki razgovor ti stiže na mejl preko FormSubmit-a.
- Radi samo na Vercelu. Na GitHub Pages dugmad za asistenta su sakrivena.

Podešavanje na Vercelu (Settings → Environment Variables):
- `GEMINI_API_KEY`: ključ sa https://aistudio.google.com/apikey (obavezno)
- `GEMINI_MODEL`: nije obavezno, podrazumevano je `gemini-flash-latest`

Posle dodavanja promenljive uradi **Redeploy** da bi je funkcija videla.

## SEO

- Naslov stranice: "Izrada sajtova Obrenovac i Beograd | Stefan Stević" (do 60 znakova),
  opis do 160 znakova. Oba su u `<head>` u `index.html`.
- Strukturirani podaci (JSON-LD) u `<head>`: WebSite, Person, ProfessionalService
  (usluge, Obrenovac, Beograd, Srbija, koordinate i `priceRange`) i FAQPage. Kad menjaš pitanja
  u sekciji "Česta pitanja", promeni ih i u JSON-LD-u, tekst mora da bude isti. Engleski JSON-LD
  pravi build (pitanja uzima iz `faq.q1` do `faq.a6` u `en.mjs`).
- Srpska i engleska početna su povezane `hreflang` oznakama (`sr-Latn`, `en`, `x-default`),
  i u `<head>` i u `sitemap.xml`.
- Podstranice imaju svoj naslov, opis, canonical, putanju (BreadcrumbList) i JSON-LD
  (Service, CreativeWork, FAQPage). Sve to pravi build iz `pages.mjs`.
- Proveri posle svake veće izmene: https://search.google.com/test/rich-results
  i https://validator.schema.org

## Utisci klijenata

Sekcija "Šta kažu klijenti" (id `utisci`) ima tri utiska koje su klijenti odobrili.
Srpski tekst je u `index.html`, engleski u `js/main.js` pod `voices.q1` do `voices.q3`.
Ako hoćeš i ime osobe, dodaj ga u `<figcaption class="voice__who">` ispred linka firme.

## Logo

Logo je znak `<` iznad znaka `>`, tako da zajedno čine slovo S. Nalazi se u `index.html`
kao simbol `#i-logo` (gornji deo prati boju teksta, donji je žut na tamnoj podlozi).
Favicon je `favicon.svg`, a ikonice za telefon su `apple-touch-icon.png` i `icon-*.png`.

## Kontakt forma

Forma šalje poruke preko FormSubmit-a na `stefanstevicoz30@gmail.com`.
**Prvi put kad neko pošalje poruku, FormSubmit ti šalje mejl za aktivaciju**.
Klikni na link u tom mejlu i od tada poruke stižu direktno. Dok forma nije aktivirana,
posetilac dobija poruku da ti piše direktno na mejl.

Da promeniš adresu: zameni `stefanstevicoz30@gmail.com` u `index.html` i u
konstanti `EMAIL` na vrhu `js/main.js`.

## Šta gde menjaš

| Šta | Gde |
|---|---|
| Svi tekstovi na srpskom | `index.html` |
| Engleski prevod | objekat `EN` u `tools/site/en.mjs` (ključ = `data-i18n` iz HTML-a), pa `node tools/build.mjs` |
| Podstranice (usluge, radovi, cene, gradovi) | `tools/site/pages.mjs` (srpski) i `tools/site/pages.en.mjs` (engleski), pa `node tools/build.mjs` |
| Cene i radno vreme | cene u `tools/site/shared.mjs`; radno vreme u `index.html` (JSON-LD i futer), `layout.mjs` i `lib/assistant-prompt.js` |
| Boje, razmaci, fontovi | promenljive u `:root` na vrhu `css/style.css` |
| Slike projekata | `img/work/` (svaka slika ima veliku i malu verziju) |
| Tvoja fotografija | `img/stefan-hero-*.avif/.webp` (izrezana), `img/stefan-summit-*.webp`, `img/stefan-congress-*.webp` |

### Dodavanje novog projekta

Kopiraj jedan `<article class="project">` blok u `index.html`, promeni tekstove,
linkove i slike. Atributi `data-bg` i `data-accent` određuju boju pozadine i akcenta
dok je projekat na ekranu. Za svaki novi `data-i18n` ključ dodaj engleski tekst u `EN`
(`tools/site/en.mjs`). Element sa `data-only="sr"` postoji samo na srpskoj verziji
(build ga briše sa `/en`). Za novi projekat dodaj i njegovu stranicu u `pages.mjs` i `pages.en.mjs`
i podatke o slikama u `shared.mjs`.

Manji radovi idu u listu „Još radova” (`<li>` sa klasom `archive__row`); `data-preview`
je slika koja prati kursor.

### Telefon, WhatsApp, Viber i Instagram

Broj **064 558 0188** i Instagram **@stevke30** stoje na više mesta: dugmad u heroju,
kartice u sekciji Kontakt, plutajuće dugme dole desno, meni na telefonu i futer.
Ako promeniš broj, u `index.html` zameni sve pojave:

- `381645580188` (linkovi za WhatsApp, Viber, poziv i JSON-LD),
- `064 558 0188` (tekst koji posetilac vidi),

a u `tools/site/en.mjs` ključeve `wa.href`, `quick.wa`, `quick.viber` i `phone.display` (engleska verzija)
i broj na vrhu `tools/site/layout.mjs` (podstranice). Posle toga pokreni build.
WhatsApp link otvara razgovor sa već upisanom porukom, na srpskom ili engleskom, zavisno od jezika sajta.

Trajanje koraka u sekciji „Kako radim” (Besplatno, Oko nedelju dana, Od 1 do 3 nedelje, Jedan dan)
je okvirno: ako radiš drugačije, izmeni `p1.time` do `p4.time` u `index.html` i u `EN` u `tools/site/en.mjs`
(i korake `steps` u `pages.mjs` i `pages.en.mjs`).

## Tehnički detalji

- **Hero**: ime se slaže slovo po slovo u Archivo fontu sa promenljivom širinom.
  Slova bliže kursoru se šire, ostala se sužavaju, a red uvek ostaje iste širine.
  Na telefonu talas ide sam od sebe. Fotografija je „između” dva reda imena.
- **Uvodna animacija** (`playIntro` u `js/main.js`): tamna zavesa se podiže sa mekom ivicom,
  slova izlaze iz reda i ispravljaju se, ime se širi do pune širine bez skoka na kraju, a slika
  se otkriva odozdo. Sve ide preko `transform` i `opacity`, pa radi glatko i na telefonu.
- **GSAP + ScrollTrigger** (`vendor/`) za uvodnu animaciju i animacije na skrol,
  **Lenis** za glatko skrolovanje. Sve se isključuje ako korisnik ima uključeno
  „smanji animacije” u sistemu.
- **Fontovi** su smanjeni na znakove koji se koriste: osnovni latinični (80 KB)
  i poseban mali fajl samo za č, ć, š, ž, đ (7 KB).
- **Slike**: hero je u AVIF formatu (WebP kao rezerva), ostalo WebP sa `srcset`.
- **Dvojezičnost**: srpski je na `/`, engleski na `/en` (posebna stranica koju Google vidi i indeksira).
  SR/EN prekidač je običan link između te dve adrese.
- **Brz kontakt**: WhatsApp, Viber i Instagram dugmad u heroju, kartice u kontaktu i plutajuće
  dugme koje se pojavljuje posle hero sekcije, a skriva se kod velikih CTA dugmadi i kontakta.
- **CTA dugmad**: krug sa strelicom se razliva preko celog dugmeta, a na računaru se dugme
  blago „lepi” za kursor.
- Lighthouse (lokalno, sa gzip kompresijom kao na Vercelu):
  desktop 100 / 100 / 100 / 100, mobilni 97 / 100 / 100 / 100
  (performanse / pristupačnost / dobre prakse / SEO).
