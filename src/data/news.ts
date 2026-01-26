import { NewsItem } from './types';

const today = new Date();
const subtractDays = (days: number): Date => {
  const date = new Date(today);
  date.setDate(date.getDate() - days);
  return date;
};

export const newsItems: NewsItem[] = [
  // ============= TERUGBLIKKEN =============
  {
    id: '1',
    title: 'Terugblik: Een bijzondere Vredesweek viering',
    excerpt: 'Meer dan 200 mensen kwamen samen in de Bonaventurakerk voor de jaarlijkse oecumenische Vredesweek viering.',
    content: `De Vredesweek 2024 in Woerden was een groot succes. In de prachtige H. Bonaventurakerk kwamen meer dan 200 mensen van verschillende achtergronden samen om stil te staan bij vrede.

Het thema dit jaar was "Vrede verbindt over grenzen". Sprekers van verschillende kerken deelden hun visie op vrede in onze huidige wereld. Het koor van de Hervormde Gemeente zong indrukwekkende vredesliederen.

Na afloop was er gelegenheid om elkaar te ontmoeten bij koffie en cake. "Dit is waar het om gaat," vertelde een bezoeker. "Samen komen, over de grenzen van onze eigen kerk heen."`,
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

Ze noemt voorbeelden: de voedselbank, het Huis van Hoop, de maatjesprojecten. "Dit zijn plekken waar mensen echt gezien worden. Dat is goud waard."`,
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

De avonden duren ongeveer 45 minuten en beginnen om 19:30 uur. Je hoeft niet te kunnen zingen - het gaat om samen stil zijn en je laten dragen door de muziek.`,
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

Het koor zong bekende liederen en het publiek deed enthousiast mee. Kinderen speelden in het gras terwijl de volwassenen genoten van de dienst.`,
    date: subtractDays(30),
    image: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800&auto=format&fit=crop&q=80',
    author: 'Redactie',
    category: 'Terugblik',
  },
  // ============= NIEUWE NIEUWSBERICHTEN =============
  {
    id: '6',
    title: 'Alpha Cursus start weer in januari - meld je nu aan!',
    excerpt: 'Ontdek het christelijk geloof in een ontspannen sfeer met maaltijd, video en gesprek.',
    content: `Ben je nieuwsgierig naar het christelijk geloof? Of heb je vragen over zingeving en spiritualiteit? De Alpha Cursus biedt een laagdrempelige kennismaking.

Elke avond begint met een gezamenlijke maaltijd, gevolgd door een korte video en een open groepsgesprek. Er is ruimte voor al je vragen - geen onderwerp is taboe.

De cursus start op 14 januari en duurt 10 weken. Deelname is gratis. Aanmelden kan via de website of door te mailen naar info@gkwoerden.nl.`,
    date: subtractDays(3),
    image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&auto=format&fit=crop&q=80',
    author: 'GK Woerden',
    category: 'Nieuws',
  },
  {
    id: '7',
    title: 'Succesvolle inzamelingsactie voor Noodfonds',
    excerpt: 'Dankzij gulle gevers werd €15.000 opgehaald voor mensen in acute financiële nood.',
    content: `De gezamenlijke kerken van Woerden organiseerden afgelopen maand een inzamelingsactie voor het Noodfonds. Het resultaat overtrof alle verwachtingen: €15.000!

Dit geld wordt gebruikt om mensen in acute financiële nood te helpen. Denk aan het betalen van een energierekening, boodschappen of een onverwachte medische rekening.

"We zijn overweldigd door de vrijgevigheid," zegt diaken Jan de Groot. "Dit laat zien dat Woerden een gemeenschap is die omziet naar elkaar."`,
    date: subtractDays(10),
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&auto=format&fit=crop&q=80',
    author: 'Commissie Diaconie',
    category: 'Nieuws',
  },
  {
    id: '8',
    title: 'Nieuwe predikant voor Hervormde Gemeente N+W',
    excerpt: 'Ds. Marieke Verhoef wordt per 1 maart de nieuwe predikant in Woerden-Noord.',
    content: `De Hervormde Gemeente Noord en West heeft een nieuwe predikant gevonden. Ds. Marieke Verhoef (38) komt over van een gemeente in Gouda.

"Ik kijk er enorm naar uit om in Woerden aan de slag te gaan," zegt ze. "De warmte die ik tijdens de kennismakingsgesprekken ervoer, raakte me diep."

De bevestigingsdienst is op zondag 1 maart om 14:30 uur in de Maranathakerk. Iedereen is van harte welkom!`,
    date: subtractDays(12),
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=80',
    author: 'Redactie',
    category: 'Nieuws',
  },
  {
    id: '9',
    title: 'Kinderkoor zoekt nieuwe stemmetjes',
    excerpt: 'Het kinderkoor van de Gereformeerde Kerk is op zoek naar kinderen die graag zingen.',
    content: `Hou je van zingen? Ben je tussen de 6 en 12 jaar? Dan is het kinderkoor van de Gereformeerde Kerk misschien iets voor jou!

Elke woensdagmiddag om 15:30 uur repeteren we in de kerk. We zingen Nederlandse liederen, psalmen en soms ook Engelse songs.

Hoogtepunten zijn de optredens tijdens kerkdiensten en het jaarlijkse kerstconcert. Kom gerust een keer vrijblijvend kijken!`,
    date: subtractDays(8),
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop&q=80',
    author: 'Kinderkoor GKW',
    category: 'Nieuws',
  },
  {
    id: '10',
    title: 'Terugblik: Prachtig Paasoratorium in Petruskerk',
    excerpt: 'De Matthäus Passion van Bach bracht honderden bezoekers in vervoering.',
    content: `De Petruskerk was tot de laatste stoel bezet voor de uitvoering van Bachs Matthäus Passion. Koren uit heel Woerden werkten samen met een professioneel orkest.

"Dit was een hoogtepunt in mijn muzikale leven," vertelt koorlid Annie van der Wal (72). "Drie maanden hebben we gerepeteerd, en nu dit resultaat. Ongelooflijk."

De organisatie kijkt terug op een geslaagde avond en hoopt volgend jaar opnieuw zo'n groot werk uit te kunnen voeren.`,
    date: subtractDays(45),
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&auto=format&fit=crop&q=80',
    author: 'Redactie',
    category: 'Terugblik',
  },
  {
    id: '11',
    title: 'Voedselbank bedankt alle vrijwilligers',
    excerpt: 'Zonder de inzet van 45 trouwe vrijwilligers zou de voedselbank niet kunnen draaien.',
    content: `De Voedselbank Woerden organiseerde een feestelijke middag om alle vrijwilligers te bedanken. 45 mensen zetten zich wekelijks in om voedselpakketten samen te stellen en uit te delen.

Coördinator Henk Jansen: "Deze mensen zijn het kloppend hart van de voedselbank. Ze komen elke week, weer of geen weer, om anderen te helpen."

Wil jij ook vrijwilliger worden? Er is altijd plek voor nieuwe mensen. Aanmelden kan via de website van de voedselbank.`,
    date: subtractDays(18),
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80',
    author: 'Voedselbank Woerden',
    category: 'Nieuws',
  },
  {
    id: '12',
    title: 'Interview: Pastoor Van Dijk over 40 jaar priesterschap',
    excerpt: 'Een openhartig gesprek over roeping, twijfel en de vreugde van het geloof.',
    content: `Pastoor Wilhelmus van Dijk viert dit jaar zijn 40-jarig priesterschap. In een openhartig gesprek blikt hij terug op een leven in dienst van de kerk.

"Er zijn momenten van twijfel geweest," geeft hij toe. "Maar steeds weer vond ik mijn weg terug. De ontmoetingen met mensen geven mij energie."

Op de vraag wat hij jongeren zou willen meegeven: "Durf te zoeken. Durf vragen te stellen. God houdt van zoekers."`,
    date: subtractDays(25),
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80',
    author: 'Redactie',
    category: 'Interview',
  },
  {
    id: '13',
    title: 'Lighthouse Woerden viert 5-jarig bestaan',
    excerpt: 'Het interkerkelijke jongerencentrum bestaat 5 jaar en viert dat met een groot feest.',
    content: `Lighthouse Woerden, het interkerkelijke jongerencentrum, viert haar 5-jarig jubileum. In die vijf jaar zijn duizenden jongeren bereikt met jeugddiensten en activiteiten.

"We begonnen klein, met twintig jongeren in een zaaltje," herinnert oprichter Mark Hendriksen zich. "Nu hebben we maandelijks 80 tot 100 bezoekers."

Het jubileum wordt gevierd met een speciale Youth Worship Night op zaterdag 28 maart. Iedereen tussen 12 en 25 jaar is welkom!`,
    date: subtractDays(4),
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop&q=80',
    author: 'Lighthouse Woerden',
    category: 'Nieuws',
  },
  {
    id: '14',
    title: 'Kerkklok Lutherse Kerk gerestaureerd',
    excerpt: 'Na maanden van restauratie luidt de historische kerkklok weer over Woerden.',
    content: `De monumentale kerkklok van de Lutherse Kerk is gerestaureerd en luidt weer! De klok uit 1752 was aan een grondige opknapbeurt toe.

"Het was een hele klus," vertelt restaurator Pieter de Vries. "Maar het resultaat mag er zijn. Deze klok kan weer eeuwen mee."

Afgelopen zondag luidde de klok voor het eerst sinds de restauratie. Veel Woerdenaren bleven staan om te luisteren.`,
    date: subtractDays(15),
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80',
    author: 'Lutherse Gemeente',
    category: 'Nieuws',
  },
  {
    id: '15',
    title: 'Nieuw: Wandelen & Praten - samen de natuur in',
    excerpt: 'Elke derde zaterdag van de maand wandelen we door het Groene Hart.',
    content: `De Raad van Kerken start met een nieuw initiatief: Wandelen & Praten. Elke derde zaterdag van de maand trekken we er samen op uit.

De wandelingen zijn ongeveer 5 kilometer lang en geschikt voor iedereen. Onderweg is er ruimte voor gesprek - of gewoon om samen van de natuur te genieten.

Start is om 10:00 uur bij Kasteel Woerden. Aanmelden is niet nodig, gewoon komen!`,
    date: subtractDays(2),
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop&q=80',
    author: 'Raad van Kerken',
    category: 'Nieuws',
  },
  {
    id: '16',
    title: 'Terugblik: Kinderkerstfeest was groot succes',
    excerpt: 'Meer dan 100 kinderen genoten van de kerstmusical en cadeautjes.',
    content: `Het jaarlijkse Kinderkerstfeest in de Maranathakerk was weer een groot succes. Meer dan 100 kinderen, samen met hun ouders, kwamen genieten van een feestelijke middag.

De kinderen van de zondagsschool voerden een prachtige kerstmusical op. Na afloop was er voor elk kind een cadeautje.

"De glinsterende ogen van de kinderen - daar doe je het voor," zegt organisator Liesbeth Bakker.`,
    date: subtractDays(40),
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=800&auto=format&fit=crop&q=80',
    author: 'Redactie',
    category: 'Terugblik',
  },
  {
    id: '17',
    title: 'Cama Parousia start met Alpha Youth voor tieners',
    excerpt: 'Speciaal voor tieners van 13-17 jaar: ontdek geloof met pizza en goede gesprekken.',
    content: `Cama Parousia gaat Alpha Youth organiseren, speciaal voor tieners van 13-17 jaar. De cursus start in januari en duurt 12 weken.

"Tieners hebben andere vragen dan volwassenen," legt jeugdwerker Sandra uit. "Daarom hebben we een programma dat speciaal voor hen is ontwikkeld."

Er is pizza, er zijn korte video's en er is ruimte om al je vragen te stellen. Aanmelden kan via de website van Cama Parousia.`,
    date: subtractDays(6),
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=80',
    author: 'Cama Parousia',
    category: 'Nieuws',
  },
  {
    id: '18',
    title: 'Seniorenmiddag met live muziek van De Vrolijke Noot',
    excerpt: 'De populaire band speelt meezingers uit de jaren \'50 en \'60.',
    content: `De maandelijkse seniorenmiddag in de Bonaventurakerk krijgt dit keer een muzikaal tintje. Band De Vrolijke Noot speelt meezingers uit de jaren '50 en '60.

"Muziek verbindt," zegt organisator Maria Jansen. "En onze senioren genieten er enorm van om samen te zingen."

De middag is op woensdag 12 februari van 14:00 tot 16:00 uur. Koffie en gebak worden verzorgd.`,
    date: subtractDays(9),
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=80',
    author: 'Pax Christi',
    category: 'Nieuws',
  },
  {
    id: '19',
    title: 'Vakantiebijbelweek komt eraan - thema: Avontuur met God',
    excerpt: 'In juli weer een week vol Bijbelverhalen, spelletjes en knutselen voor kinderen.',
    content: `De Vakantiebijbelweek is elk jaar een hoogtepunt voor kinderen in Woerden. Dit jaar is het thema "Avontuur met God".

Van 7 tot 11 juli zijn kinderen van 4-12 jaar elke ochtend welkom bij Cama Parousia. Er zijn spannende Bijbelverhalen, leuke spelletjes en creatief knutselen.

Deelname is gratis. Opgeven kan vanaf mei via de website.`,
    date: subtractDays(11),
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&auto=format&fit=crop&q=80',
    author: 'Cama Parousia',
    category: 'Nieuws',
  },
  {
    id: '20',
    title: 'Interview: Jonge diaken over zijn roeping',
    excerpt: 'Thomas (28) vertelt waarom hij koos voor een leven als diaken.',
    content: `Thomas Bakker (28) is een van de jongste diakens van Nederland. In een openhartig gesprek vertelt hij over zijn roeping.

"Mensen vragen me vaak: waarom? Je bent jong, je had alles kunnen doen." Thomas lacht. "Dat klopt. Maar ik voelde een sterke roeping om mensen te helpen."

Als diaken bezoekt hij zieken, organiseert hij hulpacties en is hij een luisterend oor. "Dit is geen baan, dit is mijn leven."`,
    date: subtractDays(28),
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    author: 'Redactie',
    category: 'Interview',
  },
  {
    id: '21',
    title: 'Petruskerk viert 500 jaar reformatie',
    excerpt: 'Een feestelijk programma met lezingen, muziek en een historische tentoonstelling.',
    content: `De Petruskerk organiseert een speciaal programma rond 500 jaar reformatie. Met lezingen door historici, muziek uit de reformatietijd en een kleine tentoonstelling.

"De reformatie heeft Woerden veranderd," vertelt kerkhistoricus dr. Van Leeuwen. "Het is goed om daar bij stil te staan."

Het programma is verspreid over meerdere weekenden in oktober en november. Toegang is gratis.`,
    date: subtractDays(20),
    image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800&auto=format&fit=crop&q=80',
    author: 'Hervormde Gemeente C-O',
    category: 'Nieuws',
  },
  {
    id: '22',
    title: 'Mannenontbijt: samen eten, samen praten',
    excerpt: 'Elke laatste zaterdag van de maand ontbijten mannen samen bij Het Baken.',
    content: `Het Baken organiseert maandelijks een mannenontbijt. Een moment voor mannen om samen te eten en te praten over het leven.

"Mannen hebben soms moeite om over gevoelens te praten," zegt organisator Kees. "Bij het ontbijt gaat dat vanzelf."

Er is een stevig ontbijt en een kort thema-gesprek. Aanmelden is niet nodig, gewoon langskomen op de laatste zaterdag van de maand om 8:30 uur.`,
    date: subtractDays(13),
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&auto=format&fit=crop&q=80',
    author: 'Het Baken',
    category: 'Nieuws',
  },
  {
    id: '23',
    title: 'Terugblik: Geslaagde Week van Gebed',
    excerpt: 'Zeven avonden lang kwamen christenen uit alle kerken samen om te bidden.',
    content: `De Week van Gebed was dit jaar weer een bijzonder moment van verbinding. Zeven avonden lang kwamen christenen uit alle Woerdense kerken samen.

Elke avond was in een andere kerk, met een ander thema. "Het mooie is dat je zo elkaars kerken leert kennen," vertelt een deelnemer.

De organisatie kijkt terug op een geslaagde week en hoopt volgend jaar nog meer mensen te mogen verwelkomen.`,
    date: subtractDays(35),
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    author: 'Raad van Kerken',
    category: 'Terugblik',
  },
  {
    id: '24',
    title: 'Nieuwe rouwverwerkingsgroep start in februari',
    excerpt: 'Voor mensen die een dierbare verloren hebben en behoefte hebben aan steun.',
    content: `In februari start een nieuwe rouwverwerkingsgroep in de Bonaventurakerk. De groep is bedoeld voor mensen die een dierbare verloren hebben.

"Rouw is een proces," legt pastoraal werker Annemarie uit. "In de groep delen we ervaringen en steunen we elkaar."

De groep komt acht weken bij elkaar op donderdagavond. Aanmelden kan via het parochiekantoor.`,
    date: subtractDays(16),
    image: 'https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=800&auto=format&fit=crop&q=80',
    author: 'Pax Christi',
    category: 'Nieuws',
  },
  {
    id: '25',
    title: 'Gamenight voor jongeren: Mario Kart toernooi!',
    excerpt: 'Wie wordt de Mario Kart-kampioen van Woerden?',
    content: `Het Baken organiseert een speciale gamenight met een Mario Kart toernooi. Jongeren van 14-20 jaar kunnen strijden om de titel "Mario Kart-kampioen van Woerden".

Er zijn prijzen voor de top 3. En natuurlijk gewoon veel gezelligheid, snacks en games.

De avond is op vrijdag 31 januari van 19:30 tot 22:00 uur. Meedoen is gratis.`,
    date: subtractDays(1),
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80',
    author: 'Het Baken',
    category: 'Nieuws',
  },
  {
    id: '26',
    title: 'Vrouwenkring: thema-avond over zelfzorg',
    excerpt: 'Hoe zorg je goed voor jezelf in een druk leven?',
    content: `De vrouwenkring van de Maranathakerk organiseert een thema-avond over zelfzorg. Coach Inge de Vries geeft praktische tips.

"Vrouwen zorgen vaak voor iedereen behalve zichzelf," zegt Inge. "Maar zelfzorg is geen luxe, het is noodzaak."

De avond is op dinsdag 4 februari van 20:00 tot 22:00 uur. Koffie en thee worden verzorgd.`,
    date: subtractDays(7),
    image: 'https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=800&auto=format&fit=crop&q=80',
    author: 'Hervormde Gemeente N+W',
    category: 'Nieuws',
  },
  {
    id: '27',
    title: 'Terugblik: Oecumenische Pinksterviering in het park',
    excerpt: 'Een feestelijke viering met muziek van diverse kerken.',
    content: `De oecumenische Pinksterviering in Park Blekerij was een groot succes. Honderden mensen kwamen samen om Pinksteren te vieren.

Koren en bands van verschillende kerken verzorgden de muziek. Na afloop was er een picknick waarbij iedereen zijn eigen eten deelde.

"Dit is kerk op haar mooist," zei een bezoeker. "Samen vieren, zonder muren."`,
    date: subtractDays(50),
    image: 'https://images.unsplash.com/photo-1529543544277-ea8723ca8fdd?w=800&auto=format&fit=crop&q=80',
    author: 'Raad van Kerken',
    category: 'Terugblik',
  },
  {
    id: '28',
    title: 'Bijbelquiz voor kinderen: win een prijs!',
    excerpt: 'Test je kennis van Bijbelverhalen en win leuke prijzen.',
    content: `De Rehobothkerk organiseert maandelijks een Bijbelquiz voor kinderen van 8-12 jaar. In teams beantwoord je vragen over Bijbelverhalen.

"De kinderen vinden het geweldig," vertelt jeugdwerker Peter. "Het is leerzaam én superleuk."

De volgende quiz is op woensdag 29 januari om 15:00 uur. Er zijn prijzen voor de winnende teams!`,
    date: subtractDays(5),
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80',
    author: 'Rehobothkerk',
    category: 'Nieuws',
  },
  {
    id: '29',
    title: 'Orgelconcert met werken van Bach en Buxtehude',
    excerpt: 'Geniet van klassieke orgelmuziek in de monumentale Petruskerk.',
    content: `De maandelijkse orgelconcerten in de Petruskerk zijn een begrip in Woerden. Dit keer speelt organist Jan Willem de Groot werken van Bach en Buxtehude.

"Het orgel van de Petruskerk is een prachtig instrument," zegt Jan Willem. "Het is een eer om erop te mogen spelen."

Het concert is op zaterdag 25 januari van 15:00 tot 16:30 uur. Toegang is gratis, een vrijwillige bijdrage wordt gewaardeerd.`,
    date: subtractDays(8),
    image: 'https://images.unsplash.com/photo-1519683109079-d5f539e1542f?w=800&auto=format&fit=crop&q=80',
    author: 'Hervormde Gemeente C-O',
    category: 'Nieuws',
  },
  {
    id: '30',
    title: 'Interview: Vrijwilliger van het jaar Ans van der Berg',
    excerpt: 'Al 25 jaar zet Ans zich onvermoeibaar in voor de gemeenschap.',
    content: `Ans van der Berg (68) is uitgeroepen tot Vrijwilliger van het Jaar in Woerden. Al 25 jaar zet zij zich in voor diverse goede doelen.

"Ik doe dit niet voor de erkenning," zegt Ans bescheiden. "Ik doe het omdat het nodig is. En omdat het me vreugde geeft."

Van voedselbank tot bezoekdienst, van koffieschenken tot administratie - Ans is overal te vinden.`,
    date: subtractDays(22),
    image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&auto=format&fit=crop&q=80',
    author: 'Redactie',
    category: 'Interview',
  },
  {
    id: '31',
    title: 'NAK Woerden organiseert open dag',
    excerpt: 'Maak kennis met de Nieuw-Apostolische Kerk en haar gemeenschap.',
    content: `De Nieuw-Apostolische Kerk Woerden organiseert een open dag. Een mooie gelegenheid om kennis te maken met deze kerk.

Er zijn rondleidingen, er is informatie over het geloof en natuurlijk koffie met gebak.

De open dag is op zaterdag 8 februari van 10:00 tot 14:00 uur. Iedereen is van harte welkom!`,
    date: subtractDays(10),
    image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&auto=format&fit=crop&q=80',
    author: 'NAK Woerden',
    category: 'Nieuws',
  },
  {
    id: '32',
    title: 'Koffie-inloop 55+: elke maandag gezelligheid',
    excerpt: 'Kom gezellig koffiedrinken met leeftijdsgenoten in de Rehobothkerk.',
    content: `De wekelijkse koffie-inloop voor 55-plussers in de Rehobothkerk is een succes. Elke maandagochtend komen zo'n 30 mensen samen.

"Het is gewoon gezellig," zegt vaste bezoeker Wim (72). "Je ontmoet mensen, je praat wat. Dat is belangrijk op onze leeftijd."

Iedereen is welkom, elke maandag van 10:00 tot 11:30 uur. Koffie en thee zijn gratis.`,
    date: subtractDays(4),
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&auto=format&fit=crop&q=80',
    author: 'Rehobothkerk',
    category: 'Nieuws',
  },
  {
    id: '33',
    title: 'Terugblik: Indrukwekkende Goede Vrijdag Stiltewandeling',
    excerpt: 'Honderd mensen liepen in stilte door Woerden.',
    content: `De Goede Vrijdag Stiltewandeling door Woerden was indrukwekkend. Zo'n honderd mensen liepen in stilte langs de verschillende kerken.

Bij elke kerk was er een kort meditatief moment. "Het was bijzonder om zo samen stil te staan bij het lijden van Christus," vertelt een deelnemer.

De organisatie hoopt dit volgend jaar weer te kunnen organiseren.`,
    date: subtractDays(55),
    image: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&auto=format&fit=crop&q=80',
    author: 'Raad van Kerken',
    category: 'Terugblik',
  },
  {
    id: '34',
    title: 'Zangmiddag voor senioren: meezingen met bekende liederen',
    excerpt: 'Elke derde donderdag van de maand zingen we samen in de Maranathakerk.',
    content: `De maandelijkse zangmiddag voor senioren is een favoriet. Onder begeleiding van pianist Henk worden bekende liederen, psalmen en gezangen gezongen.

"Zingen is gezond," lacht Henk. "En samen zingen is nog veel gezonder."

De volgende zangmiddag is op donderdag 16 januari van 14:30 tot 16:00 uur. Bladmuziek wordt verzorgd.`,
    date: subtractDays(3),
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    author: 'Hervormde Gemeente N+W',
    category: 'Nieuws',
  },
  {
    id: '35',
    title: 'Jongerenkamp: aanmelden kan nu!',
    excerpt: 'Een weekend vol sport, spellen, workshops en inspiratie.',
    content: `Het jaarlijkse jongerenkamp is van 22 tot 24 augustus. Een weekend vol activiteiten voor jongeren van 14-20 jaar.

Er is sport, er zijn spellen, er zijn workshops en er zijn inspirerende sprekers. En natuurlijk kampvuur en nachtspel!

Overnachting en eten zijn inbegrepen. Aanmelden kan via de website van Lighthouse Woerden.`,
    date: subtractDays(12),
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=80',
    author: 'Lighthouse Woerden',
    category: 'Nieuws',
  },
  {
    id: '36',
    title: 'Opvoedcursus: hoe praat je met je kinderen over geloof?',
    excerpt: 'Praktische tips voor ouders in een zesdelige cursus.',
    content: `Cama Parousia organiseert een opvoedcursus voor ouders met kinderen tot 12 jaar. Hoe praat je met je kinderen over geloof en zingeving?

"Kinderen stellen soms lastige vragen," weet cursusleider Ellen. "In deze cursus leer je hoe je daarmee om kunt gaan."

De cursus start op 6 februari en duurt zes weken. Aanmelden kan via de website.`,
    date: subtractDays(9),
    image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&auto=format&fit=crop&q=80',
    author: 'Cama Parousia',
    category: 'Nieuws',
  },
  {
    id: '37',
    title: 'Meditatief avondgebed: even tot rust komen',
    excerpt: 'Elke woensdag een moment van stilte in de Lutherse Kerk.',
    content: `De Lutherse Gemeente organiseert elke woensdag een kort meditatief avondgebed. Een halfuurtje om even tot rust te komen midden in de week.

Er is kaarslicht, er is stilte en er is een kort gebed. Meer niet. En dat is precies genoeg.

Elke woensdag van 19:00 tot 19:30 uur in de Lutherse Kerk. Iedereen is welkom.`,
    date: subtractDays(6),
    image: 'https://images.unsplash.com/photo-1602514329879-99e1ecbf02db?w=800&auto=format&fit=crop&q=80',
    author: 'Lutherse Gemeente',
    category: 'Nieuws',
  },
  {
    id: '38',
    title: 'Terugblik: Alpha Weekend was een diepgaande ervaring',
    excerpt: 'Deelnemers van de Alpha Cursus beleefden een bijzonder weekend.',
    content: `Het Alpha Weekend, onderdeel van de Alpha Cursus, was voor veel deelnemers een hoogtepunt. Een weekend weg om dieper in te gaan op het geloof.

"Ik had niet verwacht dat het zo'n impact zou hebben," vertelt deelnemer Mark. "Het heeft mijn leven veranderd."

Het volgende Alpha Weekend is in oktober. Aanmelden voor de Alpha Cursus kan via de GK Woerden.`,
    date: subtractDays(32),
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=80',
    author: 'GK Woerden',
    category: 'Terugblik',
  },
  {
    id: '39',
    title: 'Kerkmaatje: samen naar de kerk',
    excerpt: 'Nieuw initiatief om drempels te verlagen voor kerkbezoek.',
    content: `Wil je wel eens naar een kerk, maar durf je niet alleen? Het Kerkmaatje-project koppelt je aan iemand die met je meegaat.

"We willen drempels verlagen," legt initiatiefnemer Gerrit uit. "Soms is het fijn om iemand naast je te hebben die de weg wijst."

Interesse? Neem contact op via de website of mail naar info@kerkeninwoerden.nl.`,
    date: subtractDays(2),
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80',
    author: 'Raad van Kerken',
    category: 'Nieuws',
  },
  {
    id: '40',
    title: 'Interview: Dominee Pieterse over 30 jaar in Woerden',
    excerpt: 'Een terugblik op drie decennia van lief en leed in de gemeente.',
    content: `Ds. Jan Pieterse viert dit jaar zijn 30-jarig jubileum als predikant in Woerden. In een openhartig gesprek blikt hij terug.

"Ik heb zoveel meegemaakt," vertelt hij. "Dopen, trouwen, begrafenissen. Elk moment is bijzonder."

Op de vraag naar hoogtepunten: "De momenten waarop je echt iets betekent voor iemand. Dat vergeet je nooit."`,
    date: subtractDays(18),
    image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=800&auto=format&fit=crop&q=80',
    author: 'Redactie',
    category: 'Interview',
  },
  {
    id: '41',
    title: 'Adventsvieringen: vier weken naar Kerst toe',
    excerpt: 'Speciale vieringen met kaarsen en bezinning in diverse kerken.',
    content: `In de vier weken voor Kerst zijn er speciale adventsvieringen in de kerken van Woerden. Elke zondag wordt een adventskaars aangestoken.

"Advent is een tijd van verwachting," zegt ds. Verhoef. "We bereiden ons voor op de komst van het Licht."

De vieringen zijn in diverse kerken, kijk in de agenda voor data en tijden.`,
    date: subtractDays(45),
    image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=800&auto=format&fit=crop&q=80',
    author: 'Raad van Kerken',
    category: 'Nieuws',
  },
  {
    id: '42',
    title: 'Bijbelstudiegroep: samen de Bijbel bestuderen',
    excerpt: 'Elke dinsdagavond een avond van verdieping en gesprek.',
    content: `De wekelijkse bijbelstudiegroep in de Rehobothkerk is voor iedereen die de Bijbel wil bestuderen. Geen voorkennis nodig!

"We lezen een gedeelte, praten erover en leren van elkaar," vertelt leider Cees. "Het is verrassend hoe rijk de Bijbel is."

Elke dinsdag van 20:00 tot 21:30 uur. Nieuwe deelnemers zijn altijd welkom.`,
    date: subtractDays(7),
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&auto=format&fit=crop&q=80',
    author: 'Rehobothkerk',
    category: 'Nieuws',
  },
  {
    id: '43',
    title: 'Regenboogdienst: een inclusieve viering',
    excerpt: 'Een viering voor en met LHBTI+ personen in de Petruskerk.',
    content: `De jaarlijkse Regenboogdienst is een bijzonder moment. Een viering waar LHBTI+ personen en hun bondgenoten samenkomen.

"In de kerk is iedereen welkom," benadrukt organisator Mirjam. "Met deze dienst willen we dat expliciet uitspreken."

De dienst is op zondag 29 juni om 15:00 uur in de Petruskerk.`,
    date: subtractDays(14),
    image: 'https://images.unsplash.com/photo-1562887009-99e3591fd6fb?w=800&auto=format&fit=crop&q=80',
    author: 'Raad van Kerken',
    category: 'Nieuws',
  },
  {
    id: '44',
    title: 'Terugblik: Gospelmiddag was een feest',
    excerpt: 'Lokale koren en gospelgroepen zorgden voor een geweldige sfeer.',
    content: `De Gospelmiddag tijdens de Woerdense Vakantieweek was een groot succes. Op het Stadsplein genoten honderden mensen van gospelmuziek.

Koren en groepen uit heel Woerden traden op. Het publiek zong enthousiast mee met bekende nummers.

"Dit smaakt naar meer," zei een bezoeker. "Dit moet elk jaar!"`,
    date: subtractDays(60),
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c138?w=800&auto=format&fit=crop&q=80',
    author: 'Raad van Kerken',
    category: 'Terugblik',
  },
  {
    id: '45',
    title: 'Kerstsamenzang op de Markt: zing je mee?',
    excerpt: 'Op 23 december zingen we samen kerstliederen op de Woerdense Markt.',
    content: `De jaarlijkse Kerstsamenzang op de Markt is een traditie in Woerden. Op maandagavond 23 december zingen we samen bekende kerstliederen.

Er is begeleiding van koren en een band. Bladmuziek wordt uitgedeeld. Iedereen kan meedoen!

We starten om 19:00 uur. Kleed je warm aan en zing mee!`,
    date: subtractDays(38),
    image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800&auto=format&fit=crop&q=80',
    author: 'Raad van Kerken',
    category: 'Nieuws',
  },
  {
    id: '46',
    title: 'Nieuwjaarsontmoeting Kerken Woerden',
    excerpt: 'Kom nieuwjaarswensen uitwisselen op 5 januari in het Huis van Hoop.',
    content: `De kerken van Woerden nodigen je uit voor een gezellige nieuwjaarsontmoeting. Op zondag 5 januari van 15:00 tot 17:00 uur in het Huis van Hoop.

Er is koffie, thee en een hapje. Een mooie gelegenheid om het nieuwe jaar in te luiden met elkaar.

Iedereen is van harte welkom!`,
    date: subtractDays(30),
    image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800&auto=format&fit=crop&q=80',
    author: 'Raad van Kerken',
    category: 'Nieuws',
  },
  {
    id: '47',
    title: 'Voedselbank zoekt donaties voor Pasen',
    excerpt: 'Help mee om gezinnen een fijne Pasen te bezorgen.',
    content: `De Voedselbank Woerden wil gezinnen een fijne Pasen bezorgen. Daarom zijn we op zoek naar donaties van paaseitjes, chocolade en andere paastraktaties.

Producten kunnen worden ingeleverd bij de voedselbank of bij deelnemende kerken. Kijk op de website voor de inzamelpunten.

Samen kunnen we het verschil maken!`,
    date: subtractDays(15),
    image: 'https://images.unsplash.com/photo-1521967906867-14ec9d64bee8?w=800&auto=format&fit=crop&q=80',
    author: 'Voedselbank Woerden',
    category: 'Nieuws',
  },
  {
    id: '48',
    title: 'Interview: Zuster Maria over contemplatief leven',
    excerpt: 'Een gesprek over stilte, gebed en de zoektocht naar God.',
    content: `Zuster Maria van het klooster in Harmelen leeft een contemplatief leven. In een zeldzaam interview vertelt ze over haar roeping.

"Stilte is niet leeg," zegt ze. "In de stilte vind ik God. En in God vind ik mezelf."

Een indrukwekkend gesprek over een leven dat voor velen ver af lijkt, maar toch dichtbij is.`,
    date: subtractDays(25),
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80',
    author: 'Redactie',
    category: 'Interview',
  },
  {
    id: '49',
    title: 'Tienerclub Rehoboth: elke vrijdagavond gezelligheid',
    excerpt: 'Games, gesprekken en fun voor tieners van 12-16 jaar.',
    content: `De tienerclub van de Rehobothkerk is elke vrijdagavond een succes. Tieners van 12-16 jaar komen samen voor games, gesprekken en gezelligheid.

"Het is een veilige plek om jezelf te zijn," zegt jeugdwerker Lisa. "We praten over van alles, van school tot geloof."

Elke vrijdag van 19:30 tot 21:30 uur. Nieuwe tieners zijn altijd welkom!`,
    date: subtractDays(4),
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80',
    author: 'Rehobothkerk',
    category: 'Nieuws',
  },
  {
    id: '50',
    title: 'Terugblik: Oecumenische Paaswake was indrukwekkend',
    excerpt: 'In de vroege ochtend vierden we samen de opstanding.',
    content: `De oecumenische Paaswake in de Petruskerk was een bijzondere ervaring. Om 6 uur 's ochtends kwamen mensen samen om de opstanding te vieren.

Het paasvuur werd ontstoken, de paaskaars werd binnengedragen. In het donker werd het langzaam licht.

"Dit is Pasen op haar mooist," zei een bezoeker. "Het donker verdrijven met licht."`,
    date: subtractDays(48),
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    author: 'Raad van Kerken',
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
