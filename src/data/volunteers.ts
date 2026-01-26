export interface VolunteerVacancy {
  id: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  tasks: string[];
  requirements: string[];
  timeCommitment: string;
  contactEmail: string;
  contactPerson: string;
  category: 'diaconaal' | 'pastoraal' | 'praktisch' | 'jeugd' | 'muziek' | 'administratief';
  urgent?: boolean;
}

export const volunteerVacancies: VolunteerVacancy[] = [
  {
    id: '1',
    title: 'Gastvrouw/Gastheer Huis van Hoop',
    organization: 'Huis van Hoop',
    location: 'Rijnstraat 10, Woerden',
    description: 'Als gastvrouw of gastheer verwelkom je bezoekers van het Huis van Hoop. Je schenkt koffie en thee, maakt een praatje en zorgt dat iedereen zich welkom voelt.',
    tasks: [
      'Bezoekers ontvangen en welkom heten',
      'Koffie en thee schenken',
      'Een luisterend oor bieden',
      'Helpen bij praktische zaken'
    ],
    requirements: [
      'Sociaal en vriendelijk',
      'Geduldig en een goede luisteraar',
      'Minimaal 18 jaar',
      'Beschikbaar op dinsdag- of donderdagochtend'
    ],
    timeCommitment: '1 ochtend per week (3-4 uur)',
    contactEmail: 'commissiediaconie@gmail.com',
    contactPerson: 'Maria Jansen',
    category: 'diaconaal',
    urgent: true,
  },
  {
    id: '2',
    title: 'Kinderwerker Kinderclub',
    organization: 'Cama Parousia',
    location: 'Industrieweg 15, Woerden',
    description: 'Elke vrijdagavond organiseren we de Kinderclub voor kinderen van 6-12 jaar. We zoeken enthousiaste vrijwilligers die willen helpen met spelletjes, knutselen en Bijbelverhalen.',
    tasks: [
      'Spelletjes begeleiden',
      'Bijbelverhalen vertellen',
      'Knutselactiviteiten voorbereiden en begeleiden',
      'Toezicht houden op de kinderen'
    ],
    requirements: [
      'Affiniteit met kinderen',
      'Creatief en enthousiast',
      'VOG (wordt verzorgd)',
      'Beschikbaar op vrijdagavond'
    ],
    timeCommitment: 'Elke vrijdag van 18:30-20:00 (of om de week)',
    contactEmail: 'jeugd@camaparousia.nl',
    contactPerson: 'Sandra de Vries',
    category: 'jeugd',
    urgent: true,
  },
  {
    id: '3',
    title: 'Voedselbank Inpakker',
    organization: 'Voedselbank Woerden',
    location: 'Industrieweg 22, Woerden',
    description: 'Help mee bij het sorteren en inpakken van voedselpakketten voor gezinnen die het financieel moeilijk hebben.',
    tasks: [
      'Producten sorteren op houdbaarheidsdatum',
      'Voedselpakketten samenstellen',
      'Helpen bij de uitgifte',
      'Opruimen en schoonmaken'
    ],
    requirements: [
      'Lichamelijk fit (tillen van kratten)',
      'Betrouwbaar',
      'Teamspeler',
      'Beschikbaar op woensdagochtend'
    ],
    timeCommitment: 'Woensdagochtend van 09:00-12:00',
    contactEmail: 'vrijwilligers@voedselbankwoerden.nl',
    contactPerson: 'Henk Jansen',
    category: 'diaconaal',
  },
  {
    id: '4',
    title: 'Koordirigent Kinderkoor',
    organization: 'Gereformeerde Kerk Woerden',
    location: 'Kerkstraat 45, Woerden',
    description: 'Ons kinderkoor zoekt een nieuwe dirigent! Ben jij muzikaal en heb je ervaring met kinderen? Dan zoeken we jou!',
    tasks: [
      'Wekelijkse repetities leiden',
      'Repertoire samenstellen',
      'Optredens voorbereiden',
      'Kinderen enthousiast maken voor zingen'
    ],
    requirements: [
      'Muzikale opleiding of ervaring',
      'Ervaring met kinderen',
      'Enthousiast en geduldig',
      'Beschikbaar op woensdagmiddag'
    ],
    timeCommitment: 'Woensdag 15:30-16:30 + incidenteel optredens',
    contactEmail: 'muziek@gkwoerden.nl',
    contactPerson: 'Pieter van den Berg',
    category: 'muziek',
  },
  {
    id: '5',
    title: 'Bezoekmedewerker Senioren',
    organization: 'Hervormde Gemeente N+W',
    location: 'Woerden (huisbezoeken)',
    description: 'Als bezoekmedewerker breng je regelmatig een bezoekje aan senioren die niet meer zo mobiel zijn. Een praatje, een kopje koffie, een luisterend oor.',
    tasks: [
      'Regelmatig huisbezoeken afleggen',
      'Signaleren van problemen of hulpvragen',
      'Verjaardagen en bijzondere momenten onthouden',
      'Terugkoppeling naar de kerk'
    ],
    requirements: [
      'Sociaal en empathisch',
      'Eigen vervoer is handig',
      'Betrouwbaar en discreet',
      'Flexibel inzetbaar overdag'
    ],
    timeCommitment: '2-4 uur per week, flexibel in te delen',
    contactEmail: 'pastoraat@hervnw.nl',
    contactPerson: 'Ds. Marieke Verhoef',
    category: 'pastoraal',
  },
  {
    id: '6',
    title: 'Technicus Kerkdiensten',
    organization: 'Het Baken',
    location: 'Boerendijk 88, Woerden',
    description: 'Tijdens de kerkdiensten zorgen we voor livestream, geluid en beamer. We zoeken iemand die hier ervaring mee heeft of dit wil leren.',
    tasks: [
      'Bedienen van geluidsmixer',
      'Beamerpresentaties draaien',
      'Livestream verzorgen',
      'Apparatuur onderhouden'
    ],
    requirements: [
      'Technische interesse',
      'Nauwkeurig en betrouwbaar',
      'Bereid om te leren',
      'Beschikbaar op zondagochtend (roulatie)'
    ],
    timeCommitment: '1x per 3-4 weken op zondag (ca. 3 uur)',
    contactEmail: 'techniek@hetbaken.nl',
    contactPerson: 'Mark Hendriksen',
    category: 'praktisch',
  },
  {
    id: '7',
    title: 'Jeugdleider Lighthouse',
    organization: 'Lighthouse Woerden',
    location: 'Havenstraat 12, Woerden',
    description: 'Lighthouse zoekt jeugdleiders voor de maandelijkse jeugddiensten en andere activiteiten. Help mee om jongeren te inspireren!',
    tasks: [
      'Jongeren ontvangen en begeleiden',
      'Gesprekken leiden na de dienst',
      'Activiteiten mee organiseren',
      'Aanwezig zijn bij Youth Worship Nights'
    ],
    requirements: [
      'Leeftijd 20-35 jaar',
      'Affiniteit met jongeren',
      'Actief geloofsleven',
      'Beschikbaar op zondagavond (1x per maand)'
    ],
    timeCommitment: '1 zondagavond per maand + incidentele activiteiten',
    contactEmail: 'info@lighthousewoerden.nl',
    contactPerson: 'Mark Hendriksen',
    category: 'jeugd',
  },
  {
    id: '8',
    title: 'Secretaris Raad van Kerken',
    organization: 'Raad van Kerken Woerden',
    location: 'Wisselende locaties',
    description: 'De Raad van Kerken zoekt een nieuwe secretaris. Je notuleert vergaderingen, verzorgt correspondentie en houdt het archief bij.',
    tasks: [
      'Notuleren van vergaderingen (6x per jaar)',
      'Correspondentie verzorgen',
      'Archief beheren',
      'Agenda opstellen samen met voorzitter'
    ],
    requirements: [
      'Goede schriftelijke vaardigheden',
      'Organisatietalent',
      'Ervaring met digitaal werken',
      'Beschikbaar voor avondvergaderingen'
    ],
    timeCommitment: '4-6 uur per maand',
    contactEmail: 'info@kerkeninwoerden.nl',
    contactPerson: 'Gerrit de Groot',
    category: 'administratief',
  },
  {
    id: '9',
    title: 'Koster/Beheerder Kerkgebouw',
    organization: 'Lutherse Gemeente',
    location: 'Korte Oudegracht 12, Woerden',
    description: 'De Lutherse Kerk zoekt een koster die helpt bij het openen en sluiten van de kerk, het klaarzetten van stoelen en algemeen beheer.',
    tasks: [
      'Kerk openen en sluiten voor diensten en activiteiten',
      'Stoelen en tafels klaarzetten',
      'Kleine onderhoudstaken',
      'Toezicht houden tijdens activiteiten'
    ],
    requirements: [
      'Praktisch ingesteld',
      'Betrouwbaar en zelfstandig',
      'Flexibel inzetbaar',
      'Woont bij voorkeur in de buurt'
    ],
    timeCommitment: 'Variabel, gemiddeld 4-6 uur per week',
    contactEmail: 'kerkenraad@lutherswoerden.nl',
    contactPerson: 'Ds. Van der Linden',
    category: 'praktisch',
  },
  {
    id: '10',
    title: 'Redactielid Kerkblad',
    organization: 'Hervormde Gemeente C-O',
    location: 'Thuiswerken / Petruskerk',
    description: 'Het kerkblad verschijnt maandelijks en we zoeken iemand die wil helpen met schrijven, redigeren of het opmaken van het blad.',
    tasks: [
      'Artikelen schrijven of redigeren',
      'Interviews afnemen',
      'Foto\'s verzamelen',
      'Meedenken over inhoud en thema\'s'
    ],
    requirements: [
      'Goede schrijfvaardigheid',
      'Creatief en nieuwsgierig',
      'Ervaring met tekstverwer king (Word, InDesign is een plus)',
      'Beschikbaar voor maandelijks overleg'
    ],
    timeCommitment: '4-8 uur per maand',
    contactEmail: 'kerkblad@hervco.nl',
    contactPerson: 'Anneke Bakker',
    category: 'administratief',
  },
];

export const volunteerCategoryLabels: Record<VolunteerVacancy['category'], string> = {
  diaconaal: 'Diaconaal & Sociaal',
  pastoraal: 'Pastoraat & Bezoekwerk',
  praktisch: 'Praktisch & Techniek',
  jeugd: 'Jeugd & Kinderwerk',
  muziek: 'Muziek & Koor',
  administratief: 'Administratie & Bestuur',
};

export function getVolunteerById(id: string): VolunteerVacancy | undefined {
  return volunteerVacancies.find(vacancy => vacancy.id === id);
}
