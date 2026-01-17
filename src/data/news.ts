import { NewsItem } from './types';

const today = new Date();
const subtractDays = (days: number): Date => {
  const date = new Date(today);
  date.setDate(date.getDate() - days);
  return date;
};

export const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Terugblik: Een bijzondere Vredesweek viering',
    excerpt: 'Meer dan 200 mensen kwamen samen in de Bonaventurakerk voor de jaarlijkse oecumenische Vredesweek viering.',
    content: `De Vredesweek 2024 in Woerden was een groot succes. In de prachtige H. Bonaventurakerk kwamen meer dan 200 mensen van verschillende achtergronden samen om stil te staan bij vrede.

Het thema dit jaar was "Vrede verbindt over grenzen". Sprekers van verschillende kerken deelden hun visie op vrede in onze huidige wereld. Het koor van de Hervormde Gemeente zong indrukwekkende vredesliederen.

Na afloop was er gelegenheid om elkaar te ontmoeten bij koffie en cake. "Dit is waar het om gaat," vertelde een bezoeker. "Samen komen, over de grenzen van onze eigen kerk heen."

Volgend jaar hopen we weer zo'n mooie viering te kunnen organiseren. Houd de agenda in de gaten!`,
    date: subtractDays(7),
    image: 'https://images.unsplash.com/photo-1508835277982-1c1b0e205603?w=800&auto=format&fit=crop&q=80',
    author: 'Redactie',
    category: 'Terugblik',
  },
  {
    id: '2',
    title: 'Huis van Hoop zoekt nieuwe vrijwilligers',
    excerpt: 'Het diaconale ontmoetingscentrum groeit en kan extra handen gebruiken.',
    content: `Het Huis van Hoop is een plek waar iedereen welkom is voor een kop koffie, een goed gesprek of praktische hulp. Sinds de opening vorig jaar hebben we steeds meer bezoekers.

Daarom zijn we op zoek naar enthousiaste vrijwilligers! Je hoeft geen ervaring te hebben - een warm hart en een luisterend oor zijn het belangrijkste.

Wat kun je doen?
- Koffie en thee schenken
- Een praatje maken met bezoekers
- Helpen bij praktische zaken
- Activiteiten organiseren

Geïnteresseerd? Neem contact op via commissiediaconie@gmail.com of loop gewoon eens binnen op dinsdag- of donderdagochtend.`,
    date: subtractDays(14),
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80',
    author: 'Team Huis van Hoop',
    category: 'Nieuws',
  },
  {
    id: '3',
    title: 'Interview: "Kerken kunnen zoveel betekenen voor de stad"',
    excerpt: 'In gesprek met wethouder Van den Berg over de samenwerking tussen gemeente en kerken.',
    content: `Wethouder Maria van den Berg is enthousiast over de rol die kerken en religieuze organisaties spelen in Woerden. "Jullie doen werk dat wij als gemeente niet kunnen doen," zegt ze.

In een open gesprek vertelt ze over haar eigen ervaringen. "Ik groeide op in een kerkelijke familie, maar ben zelf niet meer actief. Toch zie ik de enorme waarde van wat kerken doen."

Ze noemt voorbeelden: de voedselbank, het Huis van Hoop, de maatjesprojecten. "Dit zijn plekken waar mensen echt gezien worden. Dat is goud waard."

Over de toekomst is ze hoopvol: "Ik hoop dat dit platform helpt om het mooie werk van kerken en initiatieven zichtbaarder te maken voor alle inwoners van Woerden."`,
    date: subtractDays(21),
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
    author: 'Redactie',
    category: 'Interview',
  },
  {
    id: '4',
    title: 'Nieuw: Taizé-avondgebeden in de Petruskerk',
    excerpt: 'Vanaf oktober kun je elke eerste woensdag van de maand tot rust komen bij verstillende gezangen.',
    content: `Goed nieuws voor wie op zoek is naar momenten van rust en bezinning. De Raad van Kerken start met maandelijkse Taizé-avondgebeden in de sfeervolle Petruskerk.

Taizé is een oecumenische gemeenschap in Frankrijk, bekend om hun meditatieve muziek. De eenvoudige, herhaalde gezangen helpen om tot rust te komen en je te openen voor God.

De avonden duren ongeveer 45 minuten en beginnen om 19:30 uur. Je hoeft niet te kunnen zingen - het gaat om samen stil zijn en je laten dragen door de muziek.

De eerste avond is op woensdag 2 oktober. Iedereen is welkom, ongeacht achtergrond of geloof.`,
    date: subtractDays(5),
    image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&auto=format&fit=crop&q=80',
    author: 'Redactie',
    category: 'Nieuws',
  },
  {
    id: '5',
    title: 'Foto-impressie: Onder de Bomen was een feest',
    excerpt: 'Bij stralend weer kwamen meer dan 150 mensen naar de openluchtdienst in Park Blekerij.',
    content: `Wat een prachtige morgen was het! Bij stralend zomerweer verzamelden zich meer dan 150 mensen in Park Blekerij voor de jaarlijkse openluchtdienst "Onder de Bomen".

Voorganger ds. Pieterse sprak over de schoonheid van de schepping. "Als je hier om je heen kijkt, in dit prachtige park, dan voel je hoe bijzonder het leven is."

Het koor zong bekende liederen en het publiek deed enthousiast mee. Kinderen speelden in het gras terwijl de volwassenen genoten van de dienst.

Na afloop was er picknick. Mensen hadden zelf eten en drinken meegenomen en deelden met elkaar. "Dit moet elk jaar," zei een bezoekster. "Dit is kerk zoals het bedoeld is."`,
    date: subtractDays(30),
    image: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800&auto=format&fit=crop&q=80',
    author: 'Redactie',
    category: 'Terugblik',
  },
];

export function getNewsById(id: string): NewsItem | undefined {
  return newsItems.find(item => item.id === id);
}

export function getRecentNews(limit?: number): NewsItem[] {
  const sorted = [...newsItems].sort((a, b) => b.date.getTime() - a.date.getTime());
  return limit ? sorted.slice(0, limit) : sorted;
}
