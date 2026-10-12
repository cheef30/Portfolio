// Sadržaj srpskih podstranica. Posle izmene pokreni: node tools/build.mjs
// Svaka stranica postaje .html fajl na adresi iz `path` (Vercel skida .html sa adrese).
// Engleska verzija svake stranice je u pages.en.mjs, pod istim `id`.
// Cene, projekti i slike su u shared.mjs.

import {
  SHOW_PRICES, UPDATED, prices, PROJECTS, workPath, quote as q, media as m,
  tags, projectMeta, otherProjects, serviceSchema, offer, workSchema,
} from './shared.mjs';

export { SHOW_PRICES };

const L = 'sr';
const P = prices(L);
const quote = (key) => q(key, L);
const media = (key) => m(key, L);

const ifPrices = (html) => (SHOW_PRICES ? html : '');
const priceLink = () => ifPrices(`<p><a href="/cena-izrade-sajta">Sve cene i paketi</a></p>`);

const HOME = { name: 'Početna', url: '/' };
const USLUGE = { name: 'Usluge', url: '/usluge' };
const RADOVI = { name: 'Radovi', url: '/radovi' };

const CARD_TEXT = {
  modus: '3D model zgrade u kom kupac sam bira sprat i stan.',
  naizlet: 'Novi sajt agencije sa admin panelom i rezervacijama sedišta.',
  leto: 'Dvojezični sajt sa ponudama u poslednjem trenutku.',
  toma: 'Landing stranica na ćirilici, rakija se sipa dok skrolujete.',
  pro: 'Redizajn sa pozivom i Viberom na svakom ekranu.',
};
const others = (except) => otherProjects(except, L, 'Još radova', 'Svaki od ovih sajtova je rešavao drugačiji problem.', CARD_TEXT);

const SERVICE_CARDS = {
  firma: { url: '/usluge/izrada-sajta-za-firmu', kicker: 'Usluga', title: 'Sajt za firmu', text: 'Prezentacioni sajt ili landing stranica preko koje vas ljudi nalaze i zovu.' },
  app: { url: '/usluge/izrada-web-aplikacija', kicker: 'Usluga', title: 'Web aplikacija', text: 'Rezervacije, kalendari, admin panel i baza, kad sajt treba da radi deo posla.' },
  d3: { url: '/usluge/3d-konfigurator-i-animacije', kicker: 'Usluga', title: '3D i animacije', text: '3D konfiguratori i animacije koje prate skrol.' },
  odrz: { url: '/usluge/odrzavanje-sajta', kicker: 'Usluga', title: 'Održavanje', text: 'Pošaljete mi poruku i ja izmenim tekst, sliku ili cenu.' },
  cene: { url: '/cena-izrade-sajta', kicker: 'Cene', title: 'Cena izrade sajta', text: 'Okvirne cene po paketima, rokovi i šta ulazi u cenu.' },
};

const services = (keys, title = 'Šta još radim') => ({
  title,
  items: keys.filter((k) => k !== 'cene' || SHOW_PRICES).map((k) => SERVICE_CARDS[k]),
});

const steps = (where = 'u Obrenovcu ili Beogradu') => `<ol class="psteps">
            <li><strong>Razgovor</strong> <span>Besplatno</span><p>Kratak poziv ili kafa ${where}. Ispričate mi čime se bavite i šta očekujete od sajta, a ja vam pošaljem predlog sa cenom i rokom.</p></li>
            <li><strong>Dizajn</strong> <span>Oko nedelju dana</span><p>Pravim raspored i izgled i šaljem vam link da ga pogledate u browseru. Kažete šta vam se ne sviđa, ispravim, pa tek onda krećem u izradu.</p></li>
            <li><strong>Izrada</strong> <span>Od 1 do 3 nedelje</span><p>Programiram sajt, ubacujem vaše tekstove i slike i proveravam ga na telefonu, tabletu i računaru.</p></li>
            <li><strong>Lansiranje</strong> <span>Jedan dan</span><p>Povezujem domen, prijavljujem sajt Google-u i dajem vam sve pristupe.</p></li>
          </ol>`;

const service = (name, description, path, area) => serviceSchema(L, name, description, path, area);
const work = (key, about, description) => workSchema(key, L, about, description);

/* ==========================================================================
   Stranice
   ========================================================================== */
export const PAGES = [];

/* ---------- Izrada sajta Obrenovac ---------- */
PAGES.push({
  id: 'obrenovac',
  lang: L,
  file: 'izrada-sajta-obrenovac.html',
  path: '/izrada-sajta-obrenovac',
  updated: UPDATED,
  title: 'Izrada sajta u Obrenovcu, web dizajn | Stefan Stević',
  description: 'Izrada sajta za firme iz Obrenovca: dizajn po meri, brz na telefonu, poziv i Viber na jedan dodir, Google mapa. Sastanak uživo u Obrenovcu, cena unapred.',
  crumbs: [HOME, { name: 'Izrada sajta Obrenovac' }],
  hero: {
    eyebrow: 'Web dizajn i izrada sajtova, Obrenovac',
    h1: 'Izrada sajta u Obrenovcu',
    lede: 'Pravim sajtove za firme iz Obrenovca i okoline: majstore, servise, salone, škole i lokalne radnje. Sajt se brzo otvara na telefonu, jasno kaže čime se bavite i ima broj telefona tamo gde ga ljudi traže.',
  },
  body: `<h2>Web developer iz Obrenovca, ne agencija iz drugog grada</h2>
          <p>Živim i radim u Obrenovcu. Kad vam treba sajt, ne razgovarate sa prodavcem iz agencije nego sa osobom koja će sajt i napraviti. Možemo da se nađemo na kafi, da mi pokažete radnju ili lokal i da zajedno vidimo šta vašim kupcima zapravo treba.</p>
          <p>Sve radim sam, od dizajna do povezivanja domena. Zato uvek znate kome da se javite kad nešto treba da se promeni.</p>

          <h2>Šta lokalnoj firmi treba od sajta</h2>
          <p>Većina ljudi firmu u Obrenovcu traži na telefonu, i to obično kad im nešto hitno treba: klima koja ne radi, termin kod frizera, auto škola za dete. Za par sekundi odluče da li će vas pozvati ili otići kod nekog drugog. Zato sajt za lokalnu firmu pravim oko nekoliko jednostavnih stvari:</p>
          <ul class="pchecks">
            <li>Poziv, Viber i WhatsApp na svakom ekranu, na jedan dodir</li>
            <li>Na prvom ekranu jasno piše čime se bavite i gde ste</li>
            <li>Usluge opisane rečima kojima ih ljudi traže na Google-u</li>
            <li>Slike vaših pravih radova umesto fotografija sa interneta</li>
            <li>Google mapa i kontakt forma</li>
            <li>Sajt koji se brzo otvara i na slabijem mobilnom internetu</li>
          </ul>

          <h2>Da vas nađu na Google-u i na mapi</h2>
          <p>Kad neko ukuca „klima servis Obrenovac” ili „frizer Obrenovac”, Google pokazuje dve stvari: mapu sa firmama i listu sajtova. Za obe je bitno da sajt bude tehnički sređen i da na njemu jasno piše gde radite. Zato na svakom sajtu od prvog dana sređujem naslove, opise i strukturirane podatke za Google, povezujem sajt sa Google Search Console i pomažem vam oko Google Business profila.</p>
          <p>Prvo mesto na Google-u vam niko pošten ne može garantovati. Ali brz, jasan i tehnički ispravan sajt ima mnogo bolju šansu od sajta koji to nije.</p>

          <h2>Sajtovi za firme iz Obrenovca</h2>
          <p><a href="/radovi/pro-klima-obrenovac">PRO KLIMA Obrenovac</a> ugrađuje i servisira klima uređaje. Ljudi ih najčešće traže kad im klima stane usred leta, pa su u redizajnu poziv, WhatsApp i Viber na svakom ekranu, a odmah ispod su usluge i galerija sa 41 urađenim poslom sa terena.</p>
          <p>Za Auto školu START iz Obrenovca napravio sam <a href="https://cheef30.github.io/auto-skola-start/" target="_blank" rel="noopener">predlog novog sajta</a>. Radim i sa firmama iz Beograda, kao što je turistička agencija <a href="/radovi/na-izlet">Na Izlet</a>.</p>

          <h2>Kako izgleda saradnja</h2>
          ${steps('u Obrenovcu')}
          ${ifPrices(`
          <h2>Koliko košta sajt za firmu iz Obrenovca</h2>
          <p>Jednostavan sajt na jednoj stranici, kakav je dovoljan većini majstora, salona i kafića, košta ${P.vizitkarta.label} i gotov je za ${P.vizitkarta.time}. Sajt sa posebnim stranicama za usluge, galeriju radova i kontakt košta ${P.firma.label}. Tačnu cenu dobijate posle kratkog razgovora i ona se ne menja ako ne menjamo dogovor.</p>
          ${priceLink()}`)}`,
  aside: {
    facts: [
      ['Lokacija', 'Obrenovac'],
      ['Sastanak', 'Uživo ili telefonom'],
      ['Rok', '2 do 4 nedelje za sajt za firmu'],
      ...(SHOW_PRICES ? [['Cena', `Od ${P.vizitkarta.min} €`]] : []),
    ],
  },
  faq: [
    ['Da li možemo da se nađemo uživo?', 'Da. Prvi razgovor može da bude uz kafu u Obrenovcu ili kod vas u radnji. Posle toga se većina stvari dogovara telefonom, preko Vibera ili WhatsApp-a.'],
    ['Koliko brzo sajt može da bude gotov?', 'Jednostavan sajt na jednoj stranici je obično gotov za 5 do 10 dana, a sajt sa više stranica za 2 do 3 nedelje od dana kad dobijem tekstove i slike.'],
    ['Da li ću moći sam da menjam sajt?', 'Ako vam je to potrebno, dobijate admin panel na srpskom u kom sami menjate cene, ponude ili termine. Ako ne želite da se bavite time, pošaljete mi poruku i ja izmenim.'],
    ['Da li pomažete oko Google Business profila?', 'Da. Pomognem vam da izaberete i kupite domen, postavim sajt na brz hosting, povežem ga sa Google Search Console i sredim Google Business profil, da vas ljudi lakše nađu u pretrazi i na mapi.'],
    ['Da li radite i za firme van Obrenovca?', 'Da. Najviše radim sa firmama iz Obrenovca i Beograda, ali i sa ljudima iz cele Srbije i inostranstva preko telefona i video poziva.'],
  ],
  related: services(['firma', 'cene', 'odrz', 'app'], 'Usluge'),
  contact: { title: 'Treba vam sajt u Obrenovcu?', intro: 'Napišite mi ukratko čime se bavite i šta vam treba. Javiću se sa predlogom, okvirnom cenom i rokom, a možemo i na kafu.' },
  schema: [service('Izrada sajta u Obrenovcu', 'Izrada sajtova i web aplikacija za firme iz Obrenovca i okoline.', '/izrada-sajta-obrenovac', [{ '@type': 'City', name: 'Obrenovac' }])],
});

/* ---------- Izrada sajta Beograd ---------- */
PAGES.push({
  id: 'beograd',
  lang: L,
  file: 'izrada-sajta-beograd.html',
  path: '/izrada-sajta-beograd',
  updated: UPDATED,
  title: 'Izrada sajta Beograd, web dizajn za firme | Stefan Stević',
  description: 'Izrada sajtova i web aplikacija za firme iz Beograda: dizajn od nule, brz na telefonu, admin panel na srpskom. Direktno sa developerom, cena i rok unapred.',
  crumbs: [HOME, { name: 'Izrada sajta Beograd' }],
  hero: {
    eyebrow: 'Web dizajn i izrada sajtova, Beograd',
    h1: 'Izrada sajta za firme iz Beograda',
    lede: 'Pravim sajtove i web aplikacije za beogradske firme, od turističkih agencija do prostora za događaje. Razgovarate direktno sa osobom koja pravi sajt, a cenu i rok znate pre nego što krenemo.',
  },
  body: `<h2>Bez agencije između vas i sajta</h2>
          <p>U Beogradu ima mnogo agencija i još više ponuda. Kod mene je razlika jednostavna: sve radim sam, od prvog razgovora i dizajna do programiranja i održavanja. Ne prenosite želje preko trećeg čoveka i ne plaćate tim koji vam ne treba.</p>
          <p>Iz Obrenovca sam, pa se u Beogradu lako nađemo uživo. Posle prvog sastanka većinu stvari rešavamo telefonom, preko Vibera ili video poziva.</p>

          <h2>Primer iz Beograda: agencija Na Izlet</h2>
          <p><a href="/radovi/na-izlet">Na Izlet</a> je turistička agencija iz Beograda koja organizuje izlete i putovanja po Evropi. Stari WordPress sajt je bio spor na telefonu i težak za ažuriranje polazaka. Novi sajt sam napravio od nule u Next.js-u, sa admin panelom u kom agencija sama unosi izlete, termine i cene, kalendarom polazaka i sistemom rezervacija sa rasporedom sedišta u autobusu.</p>
          ${quote('naizlet')}
          <p>Trenutno radim i sajt za Mister S Tailored Events, prostor za događaje u centru Beograda.</p>

          <h2>Šta mogu da napravim za vašu firmu</h2>
          <ul class="pchecks">
            <li><a href="/usluge/izrada-sajta-za-firmu">Sajt za firmu</a>: prezentacioni sajt ili landing stranica, sa pozivom, Viberom, WhatsApp-om, Google mapom i kontakt formom</li>
            <li><a href="/usluge/izrada-web-aplikacija">Web aplikaciju</a>: rezervacije, kalendare, admin panel, naloge korisnika i bazu podataka</li>
            <li><a href="/usluge/3d-konfigurator-i-animacije">3D prikaze i animacije</a>: za nekretnine, proizvode i brendove</li>
            <li><a href="/usluge/odrzavanje-sajta">Održavanje</a>: izmene teksta, slika i cena, ispravke i provera brzine</li>
          </ul>

          <h2>Sajt na srpskom i engleskom</h2>
          <p>Mnoge beogradske firme rade i sa strancima: agencije, smeštaj, prostori za događaje. Dvojezične sajtove sam radio za agenciju <a href="/radovi/leto-u-turskoj">Leto u Turskoj</a> i za Mister S Tailored Events. Svaka verzija treba da ima svoju adresu, da bi Google mogao da prikaže srpsku verziju onima koji traže na srpskom, a englesku onima koji traže na engleskom.</p>

          <h2>Brz sajt, jer ga ljudi otvaraju na telefonu</h2>
          <p>Većina posetilaca vaš sajt prvi put otvori na telefonu, često u prevozu ili u pauzi. Zato slike pripremam u modernim formatima (AVIF i WebP), fontove i skripte držim na samom sajtu i proveravam brzinu pre predaje. Sajt Leto u Turskoj ima Lighthouse SEO ocenu 100 na mobilnom.</p>

          <h2>Kako izgleda saradnja</h2>
          ${steps('u Beogradu ili Obrenovcu')}
          ${ifPrices(`
          <h2>Cena i rok</h2>
          <p>Sajt za firmu sa 4 do 7 stranica košta ${P.firma.label} i gotov je za ${P.firma.time}. Sajt sa admin panelom u kom sami menjate ponude i cene je ${P.admin.label}, a web aplikacija sa rezervacijama i nalozima korisnika ${P.app.label}. Tačnu cenu dobijate posle kratkog razgovora, bez obaveze.</p>
          ${priceLink()}`)}`,
  aside: {
    facts: [
      ['Grad', 'Beograd i okolina'],
      ['Sastanak', 'Uživo ili video pozivom'],
      ['Jezici', 'Srpski i engleski'],
      ['Odgovor', 'Obično istog dana'],
    ],
  },
  faq: [
    ['Da li dolazite na sastanak u Beograd?', 'Da. Prvi razgovor može da bude uživo u Beogradu ili Obrenovcu, a posle toga se uglavnom čujemo telefonom, preko Vibera ili video poziva.'],
    ['Imam stari sajt. Možete li da ga sredite?', 'Mogu. Nekad je dovoljno ubrzati ga i srediti ono što posetilac prvo vidi, a nekad je isplativije napraviti novi, kao što je bilo sa sajtom agencije Na Izlet. Pogledam ga i kažem vam iskreno šta ima smisla.'],
    ['Da li dobijam admin panel na srpskom?', 'Ako vam treba da sami menjate cene, ponude ili termine, dobijate admin panel na srpskom. Ako ne želite da se bavite time, pošaljete mi poruku i ja izmenim.'],
    ['Da li dobijam sve pristupe sajtu?', 'Da. Kad sajt bude gotov, povezujem domen, prijavljujem sajt Google-u i predajem vam sve pristupe.'],
  ],
  related: others('none'),
  contact: { title: 'Treba vam sajt u Beogradu?', intro: 'Napišite mi ukratko čime se bavite i šta vam treba. Javiću se sa predlogom, okvirnom cenom i rokom.' },
  schema: [service('Izrada sajta u Beogradu', 'Izrada sajtova i web aplikacija za firme iz Beograda.', '/izrada-sajta-beograd', [{ '@type': 'City', name: 'Beograd' }])],
});

/* ---------- Cena izrade sajta ---------- */
const tier = (pr, desc, who, featured = false) => `<li class="ptier${featured ? ' ptier--hot' : ''}">
            <h3 class="ptier__name">${pr.name}</h3>
            <p class="ptier__price">${(pr.short || pr.label).replace(/^od /, 'od&nbsp;')}</p>
            ${pr.time ? `<p class="ptier__time">Rok: ${pr.time}</p>` : ''}
            <p class="ptier__desc">${desc}</p>
            ${who ? `<p class="ptier__who">${who}</p>` : ''}
          </li>`;

if (SHOW_PRICES) PAGES.push({
  id: 'cene',
  lang: L,
  file: 'cena-izrade-sajta.html',
  path: '/cena-izrade-sajta',
  updated: UPDATED,
  title: 'Cena izrade sajta 2026: paketi i rokovi | Stefan Stević',
  description: 'Koliko košta izrada sajta: vizitkarta od 150 €, sajt za firmu od 300 €, web aplikacija od 1.200 €. Šta ulazi u cenu, rokovi i šta se plaća posebno.',
  crumbs: [HOME, { name: 'Cena izrade sajta' }],
  hero: {
    eyebrow: 'Cene i paketi, 2026',
    h1: 'Koliko košta izrada sajta',
    lede: 'Okvirne cene za sajtove i web aplikacije, sa rokovima i onim što ulazi u cenu. Tačnu cenu dobijate posle kratkog razgovora i ona se ne menja ako ne menjamo dogovor.',
  },
  extraFirst: true,
  extra: `    <section class="section ptiers-wrap" id="paketi">
      <div class="wrap">
        <h2 class="sr-only">Paketi</h2>
        <ul class="ptiers">
          ${tier(P.vizitkarta, 'Sve bitno na jednoj stranici: ko ste, šta radite, usluge, slike, poziv, WhatsApp i Viber, mapa i kontakt forma.', 'Za majstore, salone, kafiće i lokalne firme.')}
          ${tier(P.firma, 'Sve iz vizitkarte, plus posebne stranice za usluge, galeriju radova, o nama i kontakt. Osnovni SEO, pomoć oko Google Business profila i povezivanje domena.', 'Za firme koje žele da ih ljudi nađu na Google-u po svakoj usluzi.', true)}
          ${tier(P.admin, 'Sajt za firmu sa admin panelom u kom sami menjate ponude, cene, galeriju ili blog. Ovde spada i dvojezični sajt, na srpskom i engleskom.', 'Za firme kojima se ponuda često menja.')}
          ${tier(P.app, 'Rezervacije, kalendari, nalozi korisnika, baza podataka, PDF dokumenta i obaveštenja mejlom.', 'Za agencije, škole, servise i sve kojima sajt treba da radi deo posla.')}
          ${tier(P.premium, '3D konfiguratori i animacije vezane za skrol. Cena zavisi od obima.', 'Za nekretnine, proizvode i brendove.')}
          <li class="ptier ptier--plain">
            <h3 class="ptier__name">Dodatno</h3>
            <p class="ptier__desc"><strong>Održavanje:</strong> ${P.odrzavanje.label}, za izmene teksta, slika i cena, proveru brzine i ispravke.</p>
            <p class="ptier__desc"><strong>Redizajn:</strong> po ceni paketa u koji spada, a može biti jeftinije ako se nešto od starog sajta može iskoristiti.</p>
          </li>
        </ul>
        <p class="ptiers__note">Cene su okvirne i u evrima. Domen se plaća posebno, kod registra.</p>
      </div>
    </section>`,
  body: `<h2>Od čega zavisi cena</h2>
          <p>Najviše od broja stranica i od toga šta sajt treba da radi. Sajt koji predstavlja firmu je jednostavniji od sajta na kom kupci rezervišu termin ili se prijavljuju na putovanje. Cenu podižu i admin panel, više jezika i 3D prikazi.</p>
          <p>Zato ne dajem cenu napamet. Posle kratkog razgovora znam šta vam treba i šaljem vam predlog sa tačnom cenom i rokom, bez obaveze.</p>

          <h2>Šta dobijate u svakom paketu</h2>
          <ul class="pchecks">
            <li>Dizajn od nule, bez gotovih šablona</li>
            <li>Sajt prilagođen telefonu, tabletu i računaru</li>
            <li>Dugmad za poziv, WhatsApp i Viber</li>
            <li>Osnovu za Google pretragu: naslove, opise i strukturirane podatke</li>
            <li>Povezivanje domena i prijavu sajta Google-u</li>
            <li>Sve pristupe sajtu kad bude gotov</li>
          </ul>

          <h2>Šta se plaća posebno</h2>
          <p>Domen, na primer vasafirma.rs, plaća se posebno, kod registra. Hosting je za većinu sajtova besplatan, jer sajtove postavljam na Vercel. Ako vam posle predaje treba neko ko će menjati tekstove, slike i cene, održavanje je ${P.odrzavanje.label}.</p>

          <h2>Koliko traje izrada</h2>
          <p>Vizitkarta je obično gotova za ${P.vizitkarta.time}, a sajt za firmu za ${P.firma.time} od dana kad dobijem tekstove i slike. Web aplikacije traju ${P.app.time}, zavisno od funkcija. Rok znate pre nego što počnem.</p>`,
  aside: {
    title: 'Ne znate koji paket vam treba?',
    note: 'Pošaljite mi par reči o firmi i šta sajt treba da radi. Reći ću vam u koji paket spadate i okvirnu cenu, bez obaveze.',
    button: ['#kontakt', 'Pitajte za cenu'],
  },
  faq: [
    ['Da li je cena konačna?', 'Tačnu cenu dobijate posle kratkog razgovora, pre nego što počnem. Ona se ne menja ako ne menjamo dogovor.'],
    ['Koliko traje izrada sajta?', 'Sajt za firmu je obično gotov za dve do četiri nedelje od dana kad dobijem tekstove i slike. Veće web aplikacije traju duže, a rok znate pre nego što počnem.'],
    ['Da li je redizajn jeftiniji od novog sajta?', 'Redizajn se računa po ceni paketa u koji spada, a može biti jeftiniji ako se nešto od starog sajta može iskoristiti. Pogledam postojeći sajt i kažem vam iskreno da li je dovoljno da se ubrza i sredi ili je isplativije napraviti novi.'],
    ['Koliko košta održavanje sajta?', 'Od 20 do 50 € mesečno, zavisno od toga koliko često treba nešto da se menja. U to ulaze izmene teksta, slika i cena, ispravke i provera brzine.'],
    ['Da li se hosting plaća?', 'Za većinu sajtova ne, jer ih postavljam na Vercel. Domen se plaća posebno, kod registra.'],
  ],
  related: services(['firma', 'app', 'd3', 'odrz']),
  contact: { title: 'Pitajte za tačnu cenu.', intro: 'Napišite mi čime se bavite i šta sajt treba da radi. Javiću se sa predlogom, tačnom cenom i rokom.' },
  schema: [{
    ...service('Izrada sajta', 'Izrada sajtova i web aplikacija za firme, sa okvirnim cenama po paketima.', '/cena-izrade-sajta'),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Paketi',
      itemListElement: [P.vizitkarta, P.firma, P.admin, P.app, P.premium, P.odrzavanje].map((pr) => offer(pr)),
    },
  }],
});

/* ---------- Usluga: sajt za firmu ---------- */
PAGES.push({
  id: 'svc-firma',
  lang: L,
  file: 'usluge/izrada-sajta-za-firmu.html',
  path: '/usluge/izrada-sajta-za-firmu',
  section: 'usluge',
  updated: UPDATED,
  title: 'Izrada sajta za firmu, prezentacioni sajt | Stefan Stević',
  description: 'Prezentacioni sajt ili landing stranica za vašu firmu: dizajn od nule, prilagođen telefonu, poziv, Viber i WhatsApp, Google mapa i osnova za Google pretragu.',
  crumbs: [HOME, USLUGE, { name: 'Sajt za firmu' }],
  hero: {
    eyebrow: 'Usluga',
    h1: 'Izrada sajta za firmu',
    lede: 'Za firme kojima treba sajt preko kog ih ljudi nalaze i zovu. Prezentacioni sajt ili landing stranica, dizajniran od nule baš za vašu firmu.',
  },
  body: `<h2>Sajt koji prodaje, a ne samo da postoji</h2>
          <p>Kad neko traži majstora, agenciju ili restoran, prvo otvori sajt na telefonu. Ako za par sekundi ne shvati čime se bavite ili ne nađe broj, ode kod konkurencije. Zato mi je najbitnije da se sajt brzo učita, da je jasan i da je dugme za poziv uvek blizu.</p>
          <p>U marketingu sam naučio da sajt postoji da bi prodavao. Pre nego što napišem prvu liniju koda, pitam ko su vaši kupci i šta bi ih ubedilo da vas pozovu.</p>

          <h2>Šta dobijate</h2>
          <ul class="pchecks">
            <li>Dizajn po meri vaše firme, bez gotovih šablona</li>
            <li>Sajt prilagođen telefonima i tabletima</li>
            <li>Dugmad za poziv, WhatsApp i Viber</li>
            <li>Google mapu i kontakt formu</li>
            <li>Osnovu za Google pretragu</li>
            <li>Pomoć oko domena i hostinga</li>
          </ul>

          <h2>Jedna stranica ili više stranica?</h2>
          <p>Majstorima, salonima i kafićima često je dovoljna vizitkarta: jedna stranica na kojoj je sve bitno, od usluga i slika do mape i kontakt forme. Ako želite da vas ljudi nalaze na Google-u po svakoj usluzi posebno, bolji je sajt sa više stranica, gde svaka usluga, galerija radova i kontakt imaju svoju stranicu.</p>

          <h2>Primer: PRO KLIMA Obrenovac</h2>
          <p>Ljudi firmu za klime najčešće traže kad im klima stane usred leta, pa sajt mora odmah da pokaže broj. U <a href="/radovi/pro-klima-obrenovac">redizajnu za PRO KLIMA Obrenovac</a> su poziv, WhatsApp i Viber na svakom ekranu, odmah ispod su usluge i slike sa terena, a usluge, radovi i kontakt imaju posebne stranice.</p>
          ${ifPrices(`
          <h2>Cena i rok</h2>
          <p>Vizitkarta na jednoj stranici košta ${P.vizitkarta.label} i gotova je za ${P.vizitkarta.time}. Sajt za firmu sa 4 do 7 stranica košta ${P.firma.label}, a rok je ${P.firma.time}.</p>
          ${priceLink()}`)}`,
  aside: {
    facts: [
      ['Šta je', 'Prezentacioni sajt ili landing stranica'],
      ['Rok', '2 do 4 nedelje'],
      ...(SHOW_PRICES ? [['Cena', `Od ${P.vizitkarta.min} €`]] : []),
      ['Za koga', 'Majstori, saloni, servisi, agencije'],
    ],
    button: ['#kontakt', 'Pitajte za sajt'],
  },
  related: services(['app', 'odrz', 'd3', 'cene']),
  schema: [{
    ...service('Izrada sajta za firmu', 'Prezentacioni sajt ili landing stranica, dizajn po meri, prilagođen telefonima, sa pozivom, Viberom i WhatsApp-om.', '/usluge/izrada-sajta-za-firmu'),
    ...(SHOW_PRICES ? { offers: [offer(P.vizitkarta), offer(P.firma)] } : {}),
  }],
});

/* ---------- Usluga: web aplikacije ---------- */
PAGES.push({
  id: 'svc-app',
  lang: L,
  file: 'usluge/izrada-web-aplikacija.html',
  path: '/usluge/izrada-web-aplikacija',
  section: 'usluge',
  updated: UPDATED,
  title: 'Izrada web aplikacija za firme | Stefan Stević',
  description: 'Web aplikacije koje rade deo posla umesto vas: rezervacije, kalendari, admin panel na srpskom, nalozi korisnika i baza. Next.js, React, TypeScript i Supabase.',
  crumbs: [HOME, USLUGE, { name: 'Web aplikacije' }],
  hero: {
    eyebrow: 'Usluga',
    h1: 'Izrada web aplikacija',
    lede: 'Kada sajt treba da radi deo posla umesto vas. Rezervacije, kalendari, admin panel za cene i ponude, nalozi korisnika i baza podataka.',
  },
  body: `<h2>Kada vam treba aplikacija, a ne samo sajt</h2>
          <p>Ako svaki dan ručno odgovarate na iste upite, šaljete iste dokumente ili čekate nekog da vam promeni cenu na sajtu, sajt može taj posao da preuzme. Sve što se ponavlja može da ode u admin panel, kalendar ili automatsko obaveštenje mejlom.</p>

          <h2>Šta može da radi</h2>
          <ul class="pchecks">
            <li>Rezervacije i kalendari termina ili polazaka</li>
            <li>Admin panel na srpskom za cene, ponude i termine</li>
            <li>Nalozi korisnika i prijava</li>
            <li>Baza podataka</li>
            <li>PDF dokumenta i obaveštenja mejlom</li>
            <li>Obuka za korišćenje, da vam ne treba programer za svaku izmenu</li>
          </ul>

          <h2>Primer: agencija Na Izlet</h2>
          <p>Stari WordPress sajt agencije <a href="/radovi/na-izlet">Na Izlet</a> je bio spor na telefonu i težak za ažuriranje polazaka. Novi sajt ima admin panel u kom agencija sama unosi izlete, termine i cene, kalendar polazaka, prijave za putovanja i sistem rezervacija sa rasporedom sedišta u autobusu.</p>
          ${quote('naizlet')}

          <h2>Tehnologije</h2>
          <p>Aplikacije pravim u Next.js-u, React-u i TypeScript-u, a bazu i prijavu korisnika rešavam preko Supabase-a. Za vas to znači brz sajt na telefonu, sigurnu prijavu i lako dodavanje novih funkcija kasnije.</p>
          ${ifPrices(`
          <h2>Cena i rok</h2>
          <p>Web aplikacija košta ${P.app.label}, a rok je ${P.app.time}, zavisno od funkcija. Ako vam treba samo sajt koji sami menjate, bez rezervacija i naloga korisnika, to je ${P.admin.label}.</p>
          ${priceLink()}`)}`,
  aside: {
    facts: [
      ['Šta je', 'Sajt koji radi deo posla'],
      ['Rok', P.app.time],
      ...(SHOW_PRICES ? [['Cena', 'Od 1.200 €']] : []),
      ['Alati', 'Next.js, React, TypeScript, Supabase'],
    ],
    button: ['#kontakt', 'Opišite mi aplikaciju'],
  },
  related: services(['firma', 'd3', 'odrz', 'cene']),
  schema: [{
    ...service('Izrada web aplikacija', 'Rezervacije, kalendari, admin panel, nalozi korisnika i baza podataka.', '/usluge/izrada-web-aplikacija'),
    ...(SHOW_PRICES ? { offers: [offer(P.admin), offer(P.app)] } : {}),
  }],
});

/* ---------- Usluga: 3D i animacije ---------- */
PAGES.push({
  id: 'svc-3d',
  lang: L,
  file: 'usluge/3d-konfigurator-i-animacije.html',
  path: '/usluge/3d-konfigurator-i-animacije',
  section: 'usluge',
  updated: UPDATED,
  title: '3D konfigurator i animacije za sajt | Stefan Stević',
  description: '3D konfiguratori u Three.js-u i animacije koje prate skrol, za nekretnine, proizvode i brendove. Optimizovano da radi glatko i na telefonu.',
  crumbs: [HOME, USLUGE, { name: '3D i animacije' }],
  hero: {
    eyebrow: 'Usluga',
    h1: '3D prikazi i animacije za sajt',
    lede: 'Kad proizvod ili prostor treba da se vidi iz svih uglova. 3D konfiguratori, animacije koje prate skrol i interaktivni prikazi.',
  },
  body: `<h2>Kad slika nije dovoljna</h2>
          <p>Stan, proizvod ili prostor se nekad najbolje prodaje kad kupac može sam da ga razgleda. 3D prikaz mu to omogućava direktno u browseru, bez instaliranja bilo čega.</p>

          <h2>Primer: 3D zgrada za Modus Gradnju</h2>
          <p>Sajt <a href="/radovi/modus-gradnja">Modus Gradnje</a> je napravljen oko 3D modela zgrade. Kupac okreće objekat, bira sprat i stan i odmah vidi strukturu, kvadraturu i cenu. Model je generisan kodom u Three.js-u, bez teških 3D fajlova, a 2D osnova sprata je povezana sa 3D prikazom u oba smera.</p>
          ${quote('modus')}

          <h2>Primer: rakija koja se sipa dok skrolujete</h2>
          <p>Za <a href="/radovi/tomasevacka">Tomaševačku rakiju</a> sam napravio landing stranicu na kojoj se kadrovi videa menjaju dok posetilac skroluje. Ima ih 121, od flaše do gutljaja, a boja pozadine se menja zajedno sa kadrom.</p>

          <h2>Brzo i na telefonu</h2>
          <p>3D i animacije umeju da uspore sajt. Zato modele generišem kodom gde god može, za telefone pravim lakše verzije, a animacije se same gase kod posetilaca koji su u podešavanjima uključili smanjene animacije.</p>
          ${ifPrices(`
          <h2>Cena</h2>
          <p>Premium prikaz sa 3D-om i animacijama je ${P.premium.label}, a rok se dogovara.</p>
          ${priceLink()}`)}`,
  aside: {
    facts: [
      ['Alati', 'Three.js, GSAP'],
      ['Za koga', 'Nekretnine, proizvodi, brendovi'],
      ...(SHOW_PRICES ? [['Cena', `Od ${P.premium.min} €`]] : []),
    ],
    button: ['#kontakt', 'Pitajte za 3D prikaz'],
  },
  related: services(['firma', 'app', 'odrz', 'cene']),
  schema: [{
    ...service('3D prikazi i animacije za sajt', '3D konfiguratori i animacije vezane za skrol, za nekretnine, proizvode i brendove.', '/usluge/3d-konfigurator-i-animacije'),
    ...(SHOW_PRICES ? { offers: [offer(P.premium)] } : {}),
  }],
});

/* ---------- Usluga: održavanje ---------- */
PAGES.push({
  id: 'svc-odrz',
  lang: L,
  file: 'usluge/odrzavanje-sajta.html',
  path: '/usluge/odrzavanje-sajta',
  section: 'usluge',
  updated: UPDATED,
  title: 'Održavanje sajta: izmene, ispravke, brzina | Stefan Stević',
  description: 'Mesečno održavanje sajta: izmene teksta, slika i cena, ispravke, tehnička podrška i provera brzine. Za sajtove koje sam napravio ili preuzimam od drugih.',
  crumbs: [HOME, USLUGE, { name: 'Održavanje sajta' }],
  hero: {
    eyebrow: 'Usluga',
    h1: 'Održavanje sajta',
    lede: 'Pošaljete mi poruku i ja to izmenim. Mesečno održavanje za sajtove koje sam napravio ili koje preuzimam od drugih.',
  },
  body: `<h2>Šta ulazi u održavanje</h2>
          <ul class="pchecks">
            <li>Izmene teksta, slika i cena</li>
            <li>Ispravke i tehnička podrška</li>
            <li>Provera brzine i ispravnosti sajta</li>
          </ul>

          <h2>Kako to izgleda u praksi</h2>
          <p>Za <a href="/radovi/modus-gradnja">Modus Gradnju</a> mesečno ažuriram cene i dostupnost stanova. Kad prodaju stan, jave mi, i to bude sređeno isti dan.</p>
          ${quote('modus')}

          <h2>Preuzimam i sajtove koje nisam ja pravio</h2>
          <p>Ako vam je sajt napravio neko ko više nije dostupan, mogu da ga preuzmem. Prvo ga pogledam i kažem vam iskreno da li je dovoljno da se ubrza i sredi ili je isplativije napraviti novi.</p>
          ${ifPrices(`
          <h2>Cena</h2>
          <p>Održavanje je ${P.odrzavanje.label}, zavisno od toga koliko često treba nešto da se menja.</p>
          ${priceLink()}`)}`,
  aside: {
    facts: [
      ['Kako', 'Pošaljete poruku, ja izmenim'],
      ...(SHOW_PRICES ? [['Cena', P.odrzavanje.label.replace(/^od/, 'Od')]] : []),
      ['Za', 'Moje sajtove i one koje preuzimam'],
    ],
    button: ['#kontakt', 'Pitajte za održavanje'],
  },
  related: services(['firma', 'app', 'd3', 'cene']),
  schema: [{
    ...service('Održavanje sajta', 'Mesečne izmene sadržaja i cena, ispravke i provere brzine.', '/usluge/odrzavanje-sajta'),
    ...(SHOW_PRICES ? { offers: [offer(P.odrzavanje)] } : {}),
  }],
});

/* ---------- Radovi ---------- */
PAGES.push({
  id: 'w-modus',
  lang: L,
  file: 'radovi/modus-gradnja.html',
  path: '/radovi/modus-gradnja',
  section: 'radovi',
  updated: UPDATED,
  title: 'Modus Gradnja: 3D konfigurator stanova | Stefan Stević',
  description: 'Kako je nastao sajt Modus Gradnje: 3D model zgrade u Three.js-u, izbor sprata i stana, 70 stanova sa prodajnim listom i formom za upit.',
  crumbs: [HOME, RADOVI, { name: 'Modus Gradnja' }],
  hero: {
    eyebrow: PROJECTS.modus.sr.kind,
    h1: 'Modus Gradnja: sajt oko 3D modela zgrade',
    lede: 'Kupac okreće zgradu, bira sprat i stan i odmah vidi strukturu, kvadraturu i cenu.',
    after: projectMeta('modus', [['Godina', '2026'], ['Uloga', 'Dizajn, razvoj i održavanje'], ['Tehnologije', tags(['Three.js', 'JavaScript', 'HTML', 'CSS', 'JSON-LD'])]]),
    actions: false,
  },
  media: media('modus'),
  body: `<h2>Zadatak</h2>
          <p>Firma prodaje stanove iz sopstvene investicije. Do tada je svakom kupcu trebalo slati PDF-ove, a kupac je čekao odgovor pre nego što uopšte vidi stan. Trebalo je da kupac sam pronađe stan koji mu odgovara, sa svim podacima na jednom mestu.</p>

          <h2>Rešenje</h2>
          <p>Napravio sam sajt oko 3D modela zgrade. Kupac okreće objekat, bira sprat i stan i odmah vidi strukturu, kvadraturu i cenu. 3D model je generisan kodom u Three.js-u, bez teških 3D fajlova, pa se brzo učitava. 2D osnova sprata je povezana sa 3D prikazom u oba smera: šta izaberete na osnovi, vidi se i na zgradi, i obrnuto.</p>
          <p>Svaki od 70 stanova ima svoju stranicu sa prodajnim listom i formom za upit, pa kupac zove kad je već izabrao stan.</p>

          <h2>Šta je urađeno</h2>
          <ul class="pchecks">
            <li>3D model generisan kodom u Three.js-u, bez teških 3D fajlova</li>
            <li>2D osnova sprata sinhronizovana sa 3D prikazom, u oba smera</li>
            <li>70 stanova, svaki sa svojom stranicom, prodajnim listom i formom za upit</li>
            <li>Mesečno održavanje: ažuriram cene i dostupnost stanova</li>
          </ul>

          <h2>Šta kaže klijent</h2>
          ${quote('modus')}`,
  aside: {
    title: 'O projektu',
    facts: [['Klijent', 'Modus Gradnja'], ['Delatnost', 'Stambena gradnja'], ['Godina', '2026'], ['Sajt', '<a href="https://modusgradnja.rs" target="_blank" rel="noopener">modusgradnja.rs</a>']],
    note: 'Treba vam nešto slično? Pogledajte <a href="/usluge/3d-konfigurator-i-animacije">3D prikaze i animacije</a>.',
    button: ['#kontakt', 'Hoću sličan sajt'],
  },
  related: others('modus'),
  schema: [work('modus', '3D konfigurator stanova', 'Sajt investitora Modus Gradnja napravljen oko 3D modela zgrade, sa izborom sprata i stana i stranicom za svaki od 70 stanova.')],
});

PAGES.push({
  id: 'w-naizlet',
  lang: L,
  file: 'radovi/na-izlet.html',
  path: '/radovi/na-izlet',
  section: 'radovi',
  updated: UPDATED,
  title: 'Na Izlet: redizajn sajta turističke agencije | Stefan Stević',
  description: 'Redizajn sajta agencije Na Izlet iz Beograda: Next.js umesto starog WordPress-a, admin panel za izlete i cene, kalendar polazaka i rezervacije sedišta.',
  crumbs: [HOME, RADOVI, { name: 'Na Izlet' }],
  hero: {
    eyebrow: PROJECTS.naizlet.sr.kind,
    h1: 'Na Izlet: sajt koji agencija sama ažurira',
    lede: 'Novi sajt turističke agencije, napravljen od nule u Next.js-u, sa admin panelom u kom agencija sama unosi izlete, termine i cene.',
    after: projectMeta('naizlet', [['Godina', '2026'], ['Uloga', 'Redizajn i razvoj'], ['Tehnologije', tags(['Next.js', 'React', 'TypeScript', 'Supabase', 'Vercel'])]]),
    actions: false,
  },
  media: media('naizlet'),
  body: `<h2>Zadatak</h2>
          <p>Na Izlet je turistička agencija iz Beograda koja organizuje izlete i putovanja po Evropi. Stari WordPress sajt je bio spor na telefonu i težak za ažuriranje polazaka.</p>

          <h2>Rešenje</h2>
          <p>Novi sajt sam napravio od nule u Next.js-u, sa admin panelom u kom agencija sama unosi izlete, termine i cene, bez čekanja na programera. Na sajtu su kalendar polazaka, prijave za putovanja i sistem rezervacija sa rasporedom sedišta u autobusu.</p>
          <p>Svako putovanje ima svoju stranicu sa programom, cenom, sledećim terminom i prijavom na jednom mestu. Uz to sajt ima PDF dokumenta, blog i stranice destinacija.</p>

          <h2>Za Google</h2>
          <p>Sajt ima strukturirane podatke za Google, slike u AVIF formatu i mapu sajta koja se pravi automatski.</p>

          <h2>Šta je urađeno</h2>
          <ul class="pchecks">
            <li>Kalendar polazaka i prijave za putovanja</li>
            <li>Sistem rezervacija sa rasporedom sedišta u autobusu</li>
            <li>PDF dokumenta, blog i stranice destinacija</li>
            <li>Strukturirani podaci za Google, AVIF slike, automatska mapa sajta</li>
          </ul>

          <h2>Šta kaže klijent</h2>
          ${quote('naizlet')}`,
  aside: {
    title: 'O projektu',
    facts: [['Klijent', 'Na Izlet'], ['Delatnost', 'Turistička agencija'], ['Grad', 'Beograd'], ['Godina', '2026'], ['Sajt', '<a href="https://naizlet.rs" target="_blank" rel="noopener">naizlet.rs</a>']],
    note: 'Treba vam nešto slično? Pogledajte <a href="/usluge/izrada-web-aplikacija">izradu web aplikacija</a>.',
    button: ['#kontakt', 'Hoću sličan sajt'],
  },
  related: others('naizlet'),
  schema: [work('naizlet', 'Sajt turističke agencije sa rezervacijama', 'Redizajn sajta turističke agencije Na Izlet iz Beograda, sa admin panelom, kalendarom polazaka i rezervacijama sedišta.')],
});

PAGES.push({
  id: 'w-leto',
  lang: L,
  file: 'radovi/leto-u-turskoj.html',
  path: '/radovi/leto-u-turskoj',
  section: 'radovi',
  updated: UPDATED,
  title: 'Leto u Turskoj: dvojezični sajt agencije | Stefan Stević',
  description: 'Dvojezični sajt agencije Leto u Turskoj: ponude u poslednjem trenutku sa brojem dana do polaska, destinacije sa filterima i blog. Lighthouse SEO 100.',
  crumbs: [HOME, RADOVI, { name: 'Leto u Turskoj' }],
  hero: {
    eyebrow: PROJECTS.leto.sr.kind,
    h1: 'Leto u Turskoj: ponude koje se brzo nađu',
    lede: 'Dvojezični sajt za agenciju koja prodaje samo Tursku, sa ponudama u poslednjem trenutku i destinacijama sa filterima.',
    after: projectMeta('leto', [['Godina', '2026'], ['Uloga', 'Dizajn i razvoj'], ['Tehnologije', tags(['Next.js', 'React', 'Vercel'])]]),
    actions: false,
  },
  media: media('leto'),
  body: `<h2>Zadatak</h2>
          <p>Agencija prodaje samo Tursku, pa sajt mora brzo da pokaže ponude i termine. Uz to, sajt je trebalo da bude na srpskom i na engleskom.</p>

          <h2>Rešenje</h2>
          <p>Početni ekran ima jednu poruku, jedno dugme i izbor letovanja avionom ili autobusom. Ponude u poslednjem trenutku pokazuju koliko je dana ostalo do polaska, a destinacije se filtriraju po tipu odmora. Uz to sajt ima i blog.</p>
          <p>Sajt ima Lighthouse SEO ocenu 100 na mobilnom.</p>

          <h2>Šta je urađeno</h2>
          <ul class="pchecks">
            <li>Srpski i engleski na istom sajtu</li>
            <li>Ponude koje pokazuju koliko je dana ostalo do polaska</li>
            <li>Destinacije sa filterima po tipu odmora i blog</li>
            <li>Lighthouse SEO ocena 100 na mobilnom</li>
          </ul>

          <h2>Šta kaže klijent</h2>
          ${quote('leto')}`,
  aside: {
    title: 'O projektu',
    facts: [['Klijent', 'Leto u Turskoj'], ['Delatnost', 'Turistička agencija'], ['Jezici', 'Srpski i engleski'], ['Godina', '2026'], ['Sajt', '<a href="https://letouturskoj.rs" target="_blank" rel="noopener">letouturskoj.rs</a>']],
    note: 'Treba vam nešto slično? Pogledajte <a href="/usluge/izrada-sajta-za-firmu">izradu sajta za firmu</a>.',
    button: ['#kontakt', 'Hoću sličan sajt'],
  },
  related: others('leto'),
  schema: [work('leto', 'Dvojezični sajt turističke agencije', 'Dvojezični sajt agencije Leto u Turskoj sa ponudama u poslednjem trenutku i destinacijama sa filterima.')],
});

PAGES.push({
  id: 'w-toma',
  lang: L,
  file: 'radovi/tomasevacka.html',
  path: '/radovi/tomasevacka',
  section: 'radovi',
  updated: UPDATED,
  title: 'Tomaševačka: landing stranica za rakiju | Stefan Stević',
  description: 'Landing stranica na ćirilici za domaću rakiju iz Tomaševca: 121 kadar koji se menja dok skrolujete, boja pozadine prati kadar, poručivanje telefonom i Viberom.',
  crumbs: [HOME, RADOVI, { name: 'Tomaševačka' }],
  hero: {
    eyebrow: PROJECTS.toma.sr.kind,
    h1: 'Tomaševačka: rakija koja se sipa dok skrolujete',
    lede: 'Landing stranica na ćirilici. Umesto klasičnog videa, kadrovi se menjaju dok skrolujete, od flaše do gutljaja.',
    after: projectMeta('toma', [['Godina', '2026'], ['Uloga', 'Koncept, dizajn i razvoj'], ['Tehnologije', tags(['JavaScript', 'Canvas', 'HTML', 'CSS', 'ffmpeg'])]], 'Pogledajte sajt'),
    actions: false,
  },
  media: media('toma'),
  body: `<h2>Ideja</h2>
          <p>Domaća voćna rakija iz Tomaševca zaslužuje više od fotografije flaše. Umesto klasičnog videa, napravio sam stranicu na kojoj posetilac skrolom sam „pušta” kadrove: ima ih 121, od flaše do gutljaja, a boja pozadine se menja zajedno sa kadrom.</p>

          <h2>Kako radi</h2>
          <p>Kadrovi su izvučeni iz videa i crtaju se na canvas dok posetilac skroluje. Za telefone postoji posebna, lakša sekvenca, da stranica radi glatko i na slabijem uređaju.</p>

          <h2>Sadržaj</h2>
          <p>Ceo sajt je na ćirilici, uključujući navigaciju i dugmad. Ima sedam ukusa sa podacima prepisanim sa etiketa, a poručuje se telefonom i preko Vibera.</p>

          <h2>Šta je urađeno</h2>
          <ul class="pchecks">
            <li>121 kadar izvučen iz videa, posebna lakša sekvenca za telefone</li>
            <li>Sedam ukusa sa podacima prepisanim sa etiketa</li>
            <li>Poručivanje telefonom i preko Vibera</li>
          </ul>`,
  aside: {
    title: 'O projektu',
    facts: [['Proizvod', 'Domaća voćna rakija'], ['Pismo', 'Ćirilica'], ['Godina', '2026'], ['Sajt', '<a href="https://cheef30.github.io/tomasevacka/" target="_blank" rel="noopener">Pogledajte sajt</a>']],
    note: 'Treba vam nešto slično? Pogledajte <a href="/usluge/3d-konfigurator-i-animacije">3D prikaze i animacije</a>.',
    button: ['#kontakt', 'Hoću sličan sajt'],
  },
  related: others('toma'),
  schema: [work('toma', 'Landing stranica sa animacijom na skrol', 'Landing stranica na ćirilici za domaću rakiju, sa 121 kadrom koji se menja dok posetilac skroluje.')],
});

PAGES.push({
  id: 'w-pro',
  lang: L,
  file: 'radovi/pro-klima-obrenovac.html',
  path: '/radovi/pro-klima-obrenovac',
  section: 'radovi',
  updated: UPDATED,
  title: 'PRO KLIMA Obrenovac: redizajn sajta | Stefan Stević',
  description: 'Redizajn sajta za ugradnju i servis klima u Obrenovcu: poziv, WhatsApp i Viber na svakom ekranu, galerija sa 41 urađenim poslom i posebne stranice za usluge.',
  crumbs: [HOME, RADOVI, { name: 'PRO KLIMA Obrenovac' }],
  hero: {
    eyebrow: PROJECTS.pro.sr.kind,
    h1: 'PRO KLIMA Obrenovac: broj na svakom ekranu',
    lede: 'Redizajn sajta za firmu iz Obrenovca koja ugrađuje i servisira klime. Ljudi ih traže kad im klima stane usred leta, pa sajt mora odmah da pokaže broj.',
    after: projectMeta('pro', [['Godina', '2026'], ['Uloga', 'Redizajn sajta, u toku'], ['Tehnologije', tags(['HTML', 'CSS', 'JavaScript'])]], 'Pogledajte pregled redizajna'),
    actions: false,
  },
  media: media('pro'),
  body: `<h2>Zadatak</h2>
          <p>PRO KLIMA Obrenovac ugrađuje i servisira klima uređaje. Ljudi ih najčešće traže kad im klima stane usred leta, sa telefona i u žurbi. Ako broj ne vide odmah, zovu nekog drugog.</p>

          <h2>Rešenje</h2>
          <p>U redizajnu su poziv, WhatsApp i Viber na svakom ekranu, na jedan dodir. Odmah ispod su usluge i slike sa terena. Galerija ima 41 urađen posao, sa filterima po vrsti posla, a usluge, radovi i kontakt imaju posebne stranice.</p>
          <p>Redizajn je još u toku.</p>

          <h2>Šta je urađeno</h2>
          <ul class="pchecks">
            <li>Poziv, WhatsApp i Viber na jedan dodir</li>
            <li>Galerija radova sa terena, sa filterima po vrsti posla</li>
            <li>Posebne stranice za usluge, radove i kontakt</li>
          </ul>`,
  aside: {
    title: 'O projektu',
    facts: [['Klijent', 'PRO KLIMA'], ['Delatnost', 'Ugradnja i servis klima'], ['Grad', 'Obrenovac'], ['Status', 'U toku']],
    note: 'Imate lokalnu firmu? Pogledajte <a href="/izrada-sajta-obrenovac">izradu sajta u Obrenovcu</a>.',
    button: ['#kontakt', 'Hoću sličan sajt'],
  },
  related: others('pro'),
  schema: [work('pro', 'Sajt za ugradnju i servis klima', 'Redizajn sajta firme PRO KLIMA iz Obrenovca, sa pozivom, WhatsApp-om i Viberom na svakom ekranu.')],
});
