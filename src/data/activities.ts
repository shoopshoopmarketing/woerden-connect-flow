import { Activity } from './types';

// ============= DATE HELPERS =============

// Get a specific date in a month (0-indexed months, 1-indexed days)
const getDateInMonth = (month: number, day: number, year: number = 2025): Date => {
  return new Date(year, month, day);
};

// Get the Nth occurrence of a weekday in a month (e.g., 2nd Sunday)
const getNthWeekday = (year: number, month: number, weekday: number, n: number): Date => {
  const firstDay = new Date(year, month, 1);
  const firstWeekday = firstDay.getDay();
  let dayOffset = weekday - firstWeekday;
  if (dayOffset < 0) dayOffset += 7;
  const day = 1 + dayOffset + (n - 1) * 7;
  return new Date(year, month, day);
};

// Get all Sundays in a month
const getSundaysInMonth = (year: number, month: number): Date[] => {
  const sundays: Date[] = [];
  let n = 1;
  while (true) {
    const sunday = getNthWeekday(year, month, 0, n);
    if (sunday.getMonth() !== month) break;
    sundays.push(sunday);
    n++;
  }
  return sundays;
};

// Get all Fridays in a month
const getFridaysInMonth = (year: number, month: number): Date[] => {
  const fridays: Date[] = [];
  let n = 1;
  while (true) {
    const friday = getNthWeekday(year, month, 5, n);
    if (friday.getMonth() !== month) break;
    fridays.push(friday);
    n++;
  }
  return fridays;
};

// ============= ACTIVITY GENERATORS =============

let activityId = 1;
const generateId = (): string => String(activityId++);

const activities: Activity[] = [];

// ============= ZONDAGMORGENDIENSTEN (wekelijks, hele jaar) =============

const churchServices = [
  { orgId: 'cama', name: 'Cama Parousia', time: '10:00', location: 'Cama Parousia', address: 'Industrieweg 15, Woerden', style: 'modern' },
  { orgId: 'rehoboth', name: 'Rehobothkerk', time: '09:30', location: 'Rehobothkerk', address: 'Rembrandtlaan 2, Woerden', style: 'traditioneel' },
  { orgId: 'gkwz', name: 'GK Woerden/Zegveld', time: '10:00', location: 'Gereformeerde Kerk', address: 'Kerkstraat 45, Woerden', style: 'gemengd' },
  { orgId: 'paxchristi', name: 'Pax Christi', time: '10:30', location: 'H. Bonaventurakerk', address: 'Kerkplein 1, Woerden', style: 'traditioneel' },
  { orgId: 'luthers', name: 'Lutherse Gemeente', time: '10:00', location: 'Lutherse Kerk', address: 'Korte Oudegracht 12, Woerden', style: 'traditioneel' },
  { orgId: 'hervnw', name: 'Hervormd N+W', time: '10:00', location: 'Maranathakerk', address: 'Wilhelminaweg 51, Woerden', style: 'gemengd' },
  { orgId: 'hervco', name: 'Hervormd C-O', time: '10:00', location: 'Petruskerk', address: 'Kerkplein 5, Woerden', style: 'traditioneel' },
  { orgId: 'baken', name: 'Het Baken', time: '10:30', location: 'Het Baken', address: 'Boerendijk 88, Woerden', style: 'modern' },
  { orgId: 'nak', name: 'NAK Woerden', time: '09:30', location: 'NAK Kerk', address: 'Europaweg 25, Woerden', style: 'traditioneel' },
];

// Generate Sunday services for each month
for (let month = 0; month < 12; month++) {
  const sundays = getSundaysInMonth(2025, month);
  
  sundays.forEach((sunday, weekIndex) => {
    // Skip Lutherse on some weeks (only 2x per month)
    churchServices.forEach(church => {
      if (church.orgId === 'luthers' && weekIndex >= 2) return;
      
      activities.push({
        id: generateId(),
        title: `Zondagmorgendienst ${church.name}`,
        description: `Wekelijkse eredienst met samenzang, gebed en verkondiging.`,
        date: sunday,
        time: church.time,
        endTime: church.style === 'modern' ? '11:30' : '11:15',
        location: church.location,
        address: church.address,
        type: 'kerkdienst',
        organizationId: church.orgId,
        forWho: 'Iedereen is welkom',
        whatToExpect: church.style === 'modern' 
          ? 'Een eigentijdse dienst met band, praktische preek en koffie na afloop.'
          : 'Een klassieke dienst met orgelbegeleiding en samenzang.',
        isRecurring: true,
        recurringInfo: 'Elke zondag',
        targetAudience: ['volwassenen', 'ouderen'],
      });
    });
  });
}

// ============= AVONDDIENSTEN (Hervormd N+W en C-O) =============

for (let month = 0; month < 12; month++) {
  const sundays = getSundaysInMonth(2025, month);
  
  sundays.forEach(sunday => {
    ['hervnw', 'hervco'].forEach(orgId => {
      activities.push({
        id: generateId(),
        title: `Avonddienst ${orgId === 'hervnw' ? 'Hervormd N+W' : 'Hervormd C-O'}`,
        description: 'Zondagse avonddienst voor bezinning en verstilling.',
        date: sunday,
        time: '18:30',
        endTime: '19:30',
        location: orgId === 'hervnw' ? 'Maranathakerk' : 'Petruskerk',
        address: orgId === 'hervnw' ? 'Wilhelminaweg 51, Woerden' : 'Kerkplein 5, Woerden',
        type: 'kerkdienst',
        organizationId: orgId,
        forWho: 'Voor wie de avond wil afsluiten met een moment van bezinning.',
        whatToExpect: 'Een rustigere dienst met nadruk op samenzang en meditatie.',
        isRecurring: true,
        recurringInfo: 'Elke zondagavond',
        targetAudience: ['volwassenen', 'ouderen'],
      });
    });
  });
}

// ============= JEUGDDIENSTEN LIGHTHOUSE (maandelijks, 2e zondag) =============

for (let month = 0; month < 12; month++) {
  const secondSunday = getNthWeekday(2025, month, 0, 2);
  
  activities.push({
    id: generateId(),
    title: 'Jeugddienst Lighthouse',
    description: 'Maandelijkse jeugddienst met moderne worship, spreker en ontmoeting.',
    longDescription: 'Lighthouse Woerden organiseert elke tweede zondag van de maand een inspirerende jeugddienst. Met een live band, een relevante spreker en veel ruimte voor ontmoeting is dit dé plek voor jongeren die hun geloof willen ontdekken en verdiepen.',
    date: secondSunday,
    time: '19:00',
    endTime: '20:30',
    location: 'Lighthouse Woerden',
    address: 'Havenstraat 12, Woerden',
    type: 'kerkdienst',
    organizationId: 'lighthouse',
    forWho: 'Jongeren van 12-25 jaar',
    whatToExpect: 'Moderne worship met band, een spreker over een actueel thema, en ontmoeting met leeftijdsgenoten. Na afloop is er ruimte om na te praten.',
    isRecurring: true,
    recurringInfo: 'Elke 2e zondag van de maand',
    targetAudience: ['jongeren'],
    isFeatured: true,
  });
}

// ============= KINDERCLUB (vrijdagavond, meerdere kerken) =============

const kinderclubKerken = [
  { orgId: 'cama', location: 'Cama Parousia', address: 'Industrieweg 15, Woerden' },
  { orgId: 'rehoboth', location: 'Rehobothkerk', address: 'Rembrandtlaan 2, Woerden' },
  { orgId: 'gkwz', location: 'Gereformeerde Kerk', address: 'Kerkstraat 45, Woerden' },
];

for (let month = 0; month < 12; month++) {
  // Skip zomervakantie (juli en augustus)
  if (month === 6 || month === 7) continue;
  
  const fridays = getFridaysInMonth(2025, month);
  
  fridays.forEach((friday, weekIndex) => {
    kinderclubKerken.forEach(kerk => {
      activities.push({
        id: generateId(),
        title: `Kinderclub ${kerk.location}`,
        description: 'Gezellige avond voor kinderen met spellen, knutselen en een Bijbelverhaal.',
        date: friday,
        time: '18:30',
        endTime: '20:00',
        location: kerk.location,
        address: kerk.address,
        type: 'ontmoeting',
        organizationId: kerk.orgId,
        forWho: 'Kinderen van 6-12 jaar',
        whatToExpect: 'Een gezellige avond met leeftijdsgenoten. We beginnen met spellen, daarna een Bijbelverhaal en we sluiten af met knutselen of een activiteit.',
        isRecurring: true,
        recurringInfo: 'Elke vrijdagavond (behalve vakanties)',
        targetAudience: ['kinderen'],
      });
    });
  });
}

// ============= TIENERCLUB (vrijdagavond) =============

for (let month = 0; month < 12; month++) {
  if (month === 6 || month === 7) continue;
  
  const fridays = getFridaysInMonth(2025, month);
  
  fridays.forEach(friday => {
    activities.push({
      id: generateId(),
      title: 'Tienerclub Rehoboth',
      description: 'Wekelijkse ontmoeting voor tieners met games, gesprekken en fun.',
      date: friday,
      time: '19:30',
      endTime: '21:30',
      location: 'Rehobothkerk',
      address: 'Rembrandtlaan 2, Woerden',
      type: 'ontmoeting',
      organizationId: 'rehoboth',
      forWho: 'Tieners van 12-16 jaar',
      whatToExpect: 'Games, gesprekken over geloof en leven, en gewoon gezelligheid met leeftijdsgenoten.',
      isRecurring: true,
      recurringInfo: 'Elke vrijdagavond (behalve vakanties)',
      targetAudience: ['jongeren'],
    });
  });
}

// ============= ALPHA CURSUS (januari en september start) =============

// Januari Alpha Cursus
const alphaStartJanuari = getDateInMonth(0, 14); // 14 januari
for (let week = 0; week < 10; week++) {
  const date = new Date(alphaStartJanuari);
  date.setDate(date.getDate() + week * 7);
  
  const themes = [
    'Is er meer?',
    'Wie is Jezus?',
    'Waarom stierf Jezus?',
    'Hoe weet ik dat ik geloof?',
    'Waarom en hoe bidden?',
    'Hoe leidt God ons?',
    'De Bijbel lezen',
    'Hoe kan ik het kwade weerstaan?',
    'Waarom en hoe over geloof vertellen?',
    'Genezing'
  ];
  
  activities.push({
    id: generateId(),
    title: `Alpha Cursus: ${themes[week]}`,
    description: 'Ontdek het christelijk geloof in een ontspannen sfeer met maaltijd, video en gesprek.',
    longDescription: 'De Alpha Cursus is een laagdrempelige kennismaking met het christelijk geloof. Elke avond begint met een gezamenlijke maaltijd, gevolgd door een korte video en een groepsgesprek. Je kunt al je vragen stellen en er is geen voorkennis nodig.',
    date: date,
    time: '19:00',
    endTime: '21:30',
    location: 'Gereformeerde Kerk Woerden',
    address: 'Kerkstraat 45, Woerden',
    type: 'cursus',
    organizationId: 'gkwz',
    forWho: 'Voor iedereen die vragen heeft over geloof en zingeving',
    whatToExpect: 'Een gezellige maaltijd, een interessante video en een open gesprek. Geen voorkennis nodig, alle vragen zijn welkom.',
    isRecurring: true,
    recurringInfo: 'Wekelijks op dinsdag (10 weken)',
    targetAudience: ['volwassenen'],
    isFeatured: week === 0,
  });
}

// September Alpha Cursus
const alphaStartSeptember = getDateInMonth(8, 9); // 9 september
for (let week = 0; week < 10; week++) {
  const date = new Date(alphaStartSeptember);
  date.setDate(date.getDate() + week * 7);
  
  const themes = [
    'Is er meer?',
    'Wie is Jezus?',
    'Waarom stierf Jezus?',
    'Hoe weet ik dat ik geloof?',
    'Waarom en hoe bidden?',
    'Hoe leidt God ons?',
    'De Bijbel lezen',
    'Hoe kan ik het kwade weerstaan?',
    'Waarom en hoe over geloof vertellen?',
    'Genezing'
  ];
  
  activities.push({
    id: generateId(),
    title: `Alpha Cursus: ${themes[week]}`,
    description: 'Ontdek het christelijk geloof in een ontspannen sfeer met maaltijd, video en gesprek.',
    longDescription: 'De Alpha Cursus is een laagdrempelige kennismaking met het christelijk geloof. Elke avond begint met een gezamenlijke maaltijd, gevolgd door een korte video en een groepsgesprek. Je kunt al je vragen stellen en er is geen voorkennis nodig.',
    date: date,
    time: '19:00',
    endTime: '21:30',
    location: 'Gereformeerde Kerk Woerden',
    address: 'Kerkstraat 45, Woerden',
    type: 'cursus',
    organizationId: 'gkwz',
    forWho: 'Voor iedereen die vragen heeft over geloof en zingeving',
    whatToExpect: 'Een gezellige maaltijd, een interessante video en een open gesprek. Geen voorkennis nodig, alle vragen zijn welkom.',
    isRecurring: true,
    recurringInfo: 'Wekelijks op dinsdag (10 weken)',
    targetAudience: ['volwassenen'],
    isFeatured: week === 0,
  });
}

// ============= ALPHA YOUTH (januari en september) =============

// Januari Alpha Youth
const alphaYouthStartJanuari = getDateInMonth(0, 16); // 16 januari (donderdag)
for (let week = 0; week < 12; week++) {
  const date = new Date(alphaYouthStartJanuari);
  date.setDate(date.getDate() + week * 7);
  
  const themes = [
    'Leven - is dit alles?',
    'Jezus - wie is Hij?',
    'Kruis - waarom stierf Hij?',
    'Geloof - hoe kan ik zeker weten?',
    'Bidden - waarom en hoe?',
    'Bijbel - waarom lezen?',
    'Leiding - hoe leidt God?',
    'Geest - wie is de Heilige Geest?',
    'Vulling - hoe word ik vervuld?',
    'Kwaad - hoe ga ik ermee om?',
    'Anderen - hoe deel ik mijn geloof?',
    'Kerk - wat nu?'
  ];
  
  activities.push({
    id: generateId(),
    title: `Alpha Youth: ${themes[week]}`,
    description: 'Alpha voor tieners en jongeren: eten, video\'s en gesprekken over de grote vragen.',
    longDescription: 'Alpha Youth is speciaal ontwikkeld voor tieners van 13-17 jaar. Met eigentijdse video\'s, pizza en goede gesprekken ontdek je wat het christelijk geloof te bieden heeft. Geen saaie kerkdingen, maar echte vragen en eerlijke antwoorden.',
    date: date,
    time: '19:00',
    endTime: '21:00',
    location: 'Cama Parousia',
    address: 'Industrieweg 15, Woerden',
    type: 'cursus',
    organizationId: 'cama',
    forWho: 'Tieners van 13-17 jaar',
    whatToExpect: 'Pizza, korte video\'s gemaakt voor jongeren, en gesprekken in kleine groepen. Stel al je vragen!',
    isRecurring: true,
    recurringInfo: 'Wekelijks op donderdag (12 weken)',
    targetAudience: ['jongeren'],
    isFeatured: week === 0,
  });
}

// September Alpha Youth
const alphaYouthStartSeptember = getDateInMonth(8, 11); // 11 september (donderdag)
for (let week = 0; week < 12; week++) {
  const date = new Date(alphaYouthStartSeptember);
  date.setDate(date.getDate() + week * 7);
  
  const themes = [
    'Leven - is dit alles?',
    'Jezus - wie is Hij?',
    'Kruis - waarom stierf Hij?',
    'Geloof - hoe kan ik zeker weten?',
    'Bidden - waarom en hoe?',
    'Bijbel - waarom lezen?',
    'Leiding - hoe leidt God?',
    'Geest - wie is de Heilige Geest?',
    'Vulling - hoe word ik vervuld?',
    'Kwaad - hoe ga ik ermee om?',
    'Anderen - hoe deel ik mijn geloof?',
    'Kerk - wat nu?'
  ];
  
  activities.push({
    id: generateId(),
    title: `Alpha Youth: ${themes[week]}`,
    description: 'Alpha voor tieners en jongeren: eten, video\'s en gesprekken over de grote vragen.',
    longDescription: 'Alpha Youth is speciaal ontwikkeld voor tieners van 13-17 jaar. Met eigentijdse video\'s, pizza en goede gesprekken ontdek je wat het christelijk geloof te bieden heeft. Geen saaie kerkdingen, maar echte vragen en eerlijke antwoorden.',
    date: date,
    time: '19:00',
    endTime: '21:00',
    location: 'Cama Parousia',
    address: 'Industrieweg 15, Woerden',
    type: 'cursus',
    organizationId: 'cama',
    forWho: 'Tieners van 13-17 jaar',
    whatToExpect: 'Pizza, korte video\'s gemaakt voor jongeren, en gesprekken in kleine groepen. Stel al je vragen!',
    isRecurring: true,
    recurringInfo: 'Wekelijks op donderdag (12 weken)',
    targetAudience: ['jongeren'],
    isFeatured: week === 0,
  });
}

// ============= ALPHA WEEKEND (februari en oktober) =============

activities.push({
  id: generateId(),
  title: 'Alpha Weekend - Heilige Geest',
  description: 'Weekend over de Heilige Geest als onderdeel van de Alpha Cursus.',
  longDescription: 'Het Alpha Weekend is het hoogtepunt van de Alpha Cursus. We gaan een weekend weg om dieper in te gaan op het thema van de Heilige Geest. Een weekend vol inspiratie, gebed, ontmoeting en verdieping.',
  date: getDateInMonth(1, 21), // 21 februari
  endDate: getDateInMonth(1, 23), // 23 februari
  time: '18:00',
  endTime: '15:00',
  location: 'Conferentiecentrum De Bron, Dalfsen',
  type: 'cursus',
  organizationId: 'gkwz',
  forWho: 'Deelnemers van de Alpha Cursus',
  whatToExpect: 'Een inspirerend weekend met lezingen, workshops, gebed en ontmoeting. Overnachting en maaltijden inbegrepen.',
  targetAudience: ['volwassenen'],
});

activities.push({
  id: generateId(),
  title: 'Alpha Weekend - Heilige Geest',
  description: 'Weekend over de Heilige Geest als onderdeel van de Alpha Cursus.',
  longDescription: 'Het Alpha Weekend is het hoogtepunt van de Alpha Cursus. We gaan een weekend weg om dieper in te gaan op het thema van de Heilige Geest. Een weekend vol inspiratie, gebed, ontmoeting en verdieping.',
  date: getDateInMonth(9, 17), // 17 oktober
  endDate: getDateInMonth(9, 19), // 19 oktober
  time: '18:00',
  endTime: '15:00',
  location: 'Conferentiecentrum De Bron, Dalfsen',
  type: 'cursus',
  organizationId: 'gkwz',
  forWho: 'Deelnemers van de Alpha Cursus',
  whatToExpect: 'Een inspirerend weekend met lezingen, workshops, gebed en ontmoeting. Overnachting en maaltijden inbegrepen.',
  targetAudience: ['volwassenen'],
});

// ============= VAKANTIEBIJBELWEEK (juli, 2e week) =============

for (let day = 0; day < 5; day++) {
  const date = getDateInMonth(6, 7 + day); // 7-11 juli
  
  activities.push({
    id: generateId(),
    title: `Vakantiebijbelweek - Dag ${day + 1}`,
    description: 'Zomerse week vol Bijbelverhalen, spelletjes, knutselen en zingen voor kinderen.',
    longDescription: 'De Vakantiebijbelweek is hét zomerse hoogtepunt voor kinderen in Woerden! Elke ochtend een spannend Bijbelverhaal, leuke spelletjes, creatief knutselen en samen zingen. Dit jaar met het thema "Avontuur met God".',
    date: date,
    time: '09:30',
    endTime: '12:00',
    location: 'Cama Parousia',
    address: 'Industrieweg 15, Woerden',
    type: 'ontmoeting',
    organizationId: 'cama',
    forWho: 'Kinderen van 4-12 jaar',
    whatToExpect: 'Een ochtend vol plezier met zingen, een Bijbelverhaal, knutselen en spelletjes. Neem drinken mee, traktatie krijg je van ons!',
    targetAudience: ['kinderen'],
    isFeatured: day === 0,
  });
}

// ============= KINDERKERSTFEEST =============

activities.push({
  id: generateId(),
  title: 'Kinderkerstfeest',
  description: 'Feestelijke kerstviering speciaal voor kinderen met een musical en cadeautjes.',
  longDescription: 'Het jaarlijkse Kinderkerstfeest is een hoogtepunt voor de kinderen van Woerden. Met een prachtige kerstmusical, zingen, en natuurlijk cadeautjes vieren we samen de geboorte van Jezus.',
  date: getDateInMonth(11, 21), // 21 december
  time: '14:00',
  endTime: '16:00',
  location: 'Maranathakerk',
  address: 'Wilhelminaweg 51, Woerden',
  type: 'viering',
  organizationId: 'hervnw',
  forWho: 'Kinderen van 4-12 jaar en hun ouders',
  whatToExpect: 'Een feestelijke middag met een kerstmusical door kinderen, samen zingen en natuurlijk een cadeautje.',
  targetAudience: ['kinderen'],
  isFeatured: true,
});

// ============= PAASONTBIJT KINDEREN =============

activities.push({
  id: generateId(),
  title: 'Paasontbijt voor Kinderen',
  description: 'Gezellig paasontbijt voor kinderen met eieren zoeken en het paasverhaal.',
  date: getDateInMonth(3, 19), // 19 april (paaszaterdag)
  time: '09:00',
  endTime: '11:00',
  location: 'Het Baken',
  address: 'Boerendijk 88, Woerden',
  type: 'ontmoeting',
  organizationId: 'baken',
  forWho: 'Kinderen van 4-12 jaar',
  whatToExpect: 'Lekker ontbijten, het paasverhaal horen en daarna paaseieren zoeken in de tuin!',
  targetAudience: ['kinderen'],
  isFeatured: true,
});

// ============= KINDERKOOR REPETITIES =============

for (let month = 0; month < 12; month++) {
  if (month === 6 || month === 7) continue; // Zomervakantie
  
  // Elke woensdag
  let day = 1;
  while (day <= 28) {
    const date = getDateInMonth(month, day);
    if (date.getDay() === 3) { // Woensdag
      activities.push({
        id: generateId(),
        title: 'Kinderkoor Repetitie',
        description: 'Wekelijkse repetitie van het kinderkoor voor kinderen die graag zingen.',
        date: date,
        time: '15:30',
        endTime: '16:30',
        location: 'Gereformeerde Kerk Woerden',
        address: 'Kerkstraat 45, Woerden',
        type: 'ontmoeting',
        organizationId: 'gkwz',
        forWho: 'Kinderen van 6-12 jaar die graag zingen',
        whatToExpect: 'Samen nieuwe en bekende liederen oefenen voor optredens in de kerk.',
        isRecurring: true,
        recurringInfo: 'Elke woensdag (behalve vakanties)',
        targetAudience: ['kinderen'],
      });
    }
    day += 7;
  }
}

// ============= YOUTH WORSHIP NIGHT (kwartaal) =============

const youthWorshipDates = [
  getDateInMonth(2, 28), // 28 maart
  getDateInMonth(5, 27), // 27 juni
  getDateInMonth(9, 24), // 24 oktober
  getDateInMonth(11, 12), // 12 december
];

youthWorshipDates.forEach(date => {
  activities.push({
    id: generateId(),
    title: 'Youth Worship Night',
    description: 'Avond vol worship, gebed en ontmoeting voor jongeren.',
    longDescription: 'Youth Worship Night is een speciale avond waar jongeren samenkomen om God te aanbidden. Met een band, ruimte voor gebed en ontmoeting is dit een plek om je geloof te vieren en te verdiepen.',
    date: date,
    time: '19:30',
    endTime: '21:30',
    location: 'Lighthouse Woerden',
    address: 'Havenstraat 12, Woerden',
    type: 'gebed',
    organizationId: 'lighthouse',
    forWho: 'Jongeren van 14-25 jaar',
    whatToExpect: 'Een avond met live worship, momenten van gebed en ontmoeting. Neem je vrienden mee!',
    targetAudience: ['jongeren'],
    isFeatured: true,
  });
});

// ============= JONGERENKAMP =============

activities.push({
  id: generateId(),
  title: 'Jongerenkamp',
  description: 'Weekend weg voor jongeren met workshops, sport en inspiratie.',
  longDescription: 'Het jaarlijkse jongerenkamp is een weekend vol activiteiten, sport, workshops en inspirerende sprekers. Een geweldige kans om nieuwe vrienden te maken en je geloof te verdiepen.',
  date: getDateInMonth(7, 22), // 22 augustus
  endDate: getDateInMonth(7, 24), // 24 augustus
  time: '15:00',
  endTime: '15:00',
  location: 'Kampeerboerderij De Stoerderij, Ermelo',
  type: 'ontmoeting',
  organizationId: 'lighthouse',
  forWho: 'Jongeren van 14-20 jaar',
  whatToExpect: 'Sport, spellen, workshops, kampvuur, nachtspel en inspirerende momenten. Overnachting en eten inbegrepen.',
  targetAudience: ['jongeren'],
  isFeatured: true,
});

// ============= GAMENIGHT JONGEREN (maandelijks) =============

for (let month = 0; month < 12; month++) {
  const lastFriday = getFridaysInMonth(2025, month).slice(-1)[0];
  
  activities.push({
    id: generateId(),
    title: 'Gamenight Jongeren',
    description: 'Gezellige game-avond voor jongeren met bord- en videospellen.',
    date: lastFriday,
    time: '19:30',
    endTime: '22:00',
    location: 'Het Baken',
    address: 'Boerendijk 88, Woerden',
    type: 'ontmoeting',
    organizationId: 'baken',
    forWho: 'Jongeren van 14-20 jaar',
    whatToExpect: 'Een avond vol games: van bordspellen tot Mario Kart. Snacks en drinken aanwezig!',
    isRecurring: true,
    recurringInfo: 'Elke laatste vrijdag van de maand',
    targetAudience: ['jongeren'],
  });
}

// ============= HUIS VAN HOOP - INLOOP (dinsdag en donderdag) =============

for (let month = 0; month < 12; month++) {
  for (let day = 1; day <= 28; day++) {
    const date = getDateInMonth(month, day);
    const dayOfWeek = date.getDay();
    
    if (dayOfWeek === 2 || dayOfWeek === 4) { // Dinsdag of donderdag
      activities.push({
        id: generateId(),
        title: 'Huis van Hoop - Inloopmorgen',
        description: 'Gezellige inloopmorgen voor ontmoeting en een praatje.',
        date: date,
        time: '10:00',
        endTime: '12:00',
        location: 'Huis van Hoop',
        address: 'Rijnstraat 10, Woerden',
        type: 'ontmoeting',
        organizationId: 'hvh',
        forWho: 'Iedereen is welkom',
        whatToExpect: 'Koffie, thee, een luisterend oor en gezelligheid.',
        isRecurring: true,
        recurringInfo: 'Elke dinsdag en donderdag',
        targetAudience: ['volwassenen', 'ouderen'],
      });
    }
  }
}

// ============= SENIORENMIDDAGEN (maandelijks) =============

for (let month = 0; month < 12; month++) {
  const secondWednesday = getNthWeekday(2025, month, 3, 2);
  
  activities.push({
    id: generateId(),
    title: 'Seniorenmiddag',
    description: 'Gezellige middag voor senioren met muziek, verhalen en ontmoeting.',
    date: secondWednesday,
    time: '14:00',
    endTime: '16:00',
    location: 'H. Bonaventurakerk',
    address: 'Kerkplein 1, Woerden',
    type: 'ontmoeting',
    organizationId: 'paxchristi',
    forWho: 'Senioren en 55-plussers',
    whatToExpect: 'Koffie, thee, een muzikaal optreden of lezing en tijd voor ontmoeting.',
    isRecurring: true,
    recurringInfo: 'Elke 2e woensdag van de maand',
    targetAudience: ['ouderen'],
  });
}

// ============= KOFFIE-INLOOP 55+ =============

for (let month = 0; month < 12; month++) {
  for (let day = 1; day <= 28; day++) {
    const date = getDateInMonth(month, day);
    if (date.getDay() === 1) { // Maandag
      activities.push({
        id: generateId(),
        title: 'Koffie-inloop 55+',
        description: 'Wekelijkse koffie-ochtend speciaal voor 55-plussers.',
        date: date,
        time: '10:00',
        endTime: '11:30',
        location: 'Rehobothkerk',
        address: 'Rembrandtlaan 2, Woerden',
        type: 'ontmoeting',
        organizationId: 'rehoboth',
        forWho: '55-plussers',
        whatToExpect: 'Gezellig koffiedrinken met leeftijdsgenoten.',
        isRecurring: true,
        recurringInfo: 'Elke maandag',
        targetAudience: ['ouderen'],
      });
    }
  }
}

// ============= ZANGMIDDAG SENIOREN (maandelijks) =============

for (let month = 0; month < 12; month++) {
  const thirdThursday = getNthWeekday(2025, month, 4, 3);
  
  activities.push({
    id: generateId(),
    title: 'Zangmiddag Senioren',
    description: 'Samen zingen van bekende liederen en psalmen.',
    date: thirdThursday,
    time: '14:30',
    endTime: '16:00',
    location: 'Maranathakerk',
    address: 'Wilhelminaweg 51, Woerden',
    type: 'ontmoeting',
    organizationId: 'hervnw',
    forWho: 'Senioren die graag zingen',
    whatToExpect: 'Samen bekende liederen, psalmen en gezangen zingen. Bladmuziek wordt verzorgd.',
    isRecurring: true,
    recurringInfo: 'Elke 3e donderdag van de maand',
    targetAudience: ['ouderen'],
  });
}

// ============= KERST VOOR ALLEENSTAANDEN =============

activities.push({
  id: generateId(),
  title: 'Kerst voor Alleenstaanden',
  description: 'Gezellig kerstdiner voor mensen die alleen zijn met de feestdagen.',
  longDescription: 'Niemand hoeft alleen te zijn met Kerst. Samen eten, samen zingen, samen kerst vieren. Een warme maaltijd en warmhartige ontmoeting.',
  date: getDateInMonth(11, 25), // 25 december
  time: '12:00',
  endTime: '16:00',
  location: 'Huis van Hoop',
  address: 'Rijnstraat 10, Woerden',
  type: 'ontmoeting',
  organizationId: 'hvh',
  forWho: 'Mensen die alleen zijn met de kerst',
  whatToExpect: 'Een feestelijk kerstdiner, gezelligheid en muziek. Aanmelding gewenst.',
  targetAudience: ['volwassenen', 'ouderen'],
  isFeatured: true,
});

// ============= TAIZÉ-AVONDGEBED (maandelijks) =============

for (let month = 0; month < 12; month++) {
  const firstThursday = getNthWeekday(2025, month, 4, 1);
  
  activities.push({
    id: generateId(),
    title: 'Taizé-avondgebed',
    description: 'Meditatief avondgebed met Taizé-gezangen en stilte.',
    date: firstThursday,
    time: '19:30',
    endTime: '20:15',
    location: 'Petruskerk',
    address: 'Kerkplein 5, Woerden',
    type: 'gebed',
    organizationId: 'rvk',
    forWho: 'Voor iedereen die rust zoekt',
    whatToExpect: 'Kaarslicht, meditatieve gezangen uit Taizé, stilte en een korte schriftlezing.',
    isRecurring: true,
    recurringInfo: 'Elke 1e donderdag van de maand',
    targetAudience: ['volwassenen', 'ouderen'],
  });
}

// ============= WEEK VAN GEBED (januari) =============

for (let day = 0; day < 7; day++) {
  const date = getDateInMonth(0, 19 + day); // 19-25 januari
  
  activities.push({
    id: generateId(),
    title: `Week van Gebed - Dag ${day + 1}`,
    description: 'Gezamenlijke gebedsavond als onderdeel van de internationale Week van Gebed.',
    date: date,
    time: '19:30',
    endTime: '20:30',
    location: day === 0 ? 'Cama Parousia' : day === 3 ? 'H. Bonaventurakerk' : day === 6 ? 'Petruskerk' : 'Diverse locaties',
    type: 'gebed',
    organizationId: 'rvk',
    forWho: 'Christenen uit alle kerken',
    whatToExpect: 'Een avond van gezamenlijk gebed, geïnspireerd door het internationale thema.',
    targetAudience: ['volwassenen'],
    isFeatured: day === 0,
  });
}

// ============= 40-DAGENTIJD AVONDGEBEDEN =============

// Ash Wednesday is around Feb 26 in 2025, 40 days before Easter
for (let week = 0; week < 6; week++) {
  const date = getDateInMonth(2, 5 + week * 7); // Start 5 maart
  
  activities.push({
    id: generateId(),
    title: `40-dagentijd Avondgebed - Week ${week + 1}`,
    description: 'Wekelijks avondgebed tijdens de veertigdagentijd.',
    date: date,
    time: '19:30',
    endTime: '20:00',
    location: 'H. Bonaventurakerk',
    address: 'Kerkplein 1, Woerden',
    type: 'gebed',
    organizationId: 'paxchristi',
    forWho: 'Voor iedereen die de weg naar Pasen bewust wil gaan',
    whatToExpect: 'Korte vieringen met meditatieve muziek en bezinnende teksten.',
    isRecurring: true,
    recurringInfo: 'Wekelijks tijdens de 40-dagentijd',
    targetAudience: ['volwassenen', 'ouderen'],
  });
}

// ============= VREDESWEEK VIERING (september) =============

activities.push({
  id: generateId(),
  title: 'Oecumenische Vredesweek Viering',
  description: 'Gezamenlijke viering van kerken in Woerden rondom het thema vrede.',
  longDescription: 'Elk jaar in september vieren de kerken in Woerden samen de Vredesweek. Dit jaar met het thema "Vrede verbindt over grenzen".',
  date: getDateInMonth(8, 21), // 21 september
  time: '10:00',
  endTime: '11:30',
  location: 'H. Bonaventurakerk',
  address: 'Kerkplein 1, Woerden',
  type: 'viering',
  organizationId: 'rvk',
  forWho: 'Alle inwoners van Woerden',
  whatToExpect: 'Een feestelijke oecumenische viering met samenzang en na afloop koffie.',
  targetAudience: ['volwassenen', 'ouderen'],
  isFeatured: true,
});

// ============= PINKSTERVIERING =============

activities.push({
  id: generateId(),
  title: 'Oecumenische Pinksterviering',
  description: 'Gezamenlijke viering van Pinksteren door de kerken van Woerden.',
  date: getDateInMonth(5, 8), // 8 juni (Pinksteren 2025)
  time: '10:00',
  endTime: '11:30',
  location: 'Park Blekerij, Woerden',
  type: 'viering',
  organizationId: 'rvk',
  forWho: 'Iedereen is welkom',
  whatToExpect: 'Een feestelijke openluchtviering met muziek van diverse kerken.',
  targetAudience: ['kinderen', 'jongeren', 'volwassenen', 'ouderen'],
  isFeatured: true,
});

// ============= PAASVIERING =============

activities.push({
  id: generateId(),
  title: 'Oecumenische Paaswake',
  description: 'Gezamenlijke viering van de opstanding in de vroege ochtend.',
  date: getDateInMonth(3, 20), // 20 april (Paaszondag 2025)
  time: '06:00',
  endTime: '07:30',
  location: 'Petruskerk',
  address: 'Kerkplein 5, Woerden',
  type: 'viering',
  organizationId: 'rvk',
  forWho: 'Iedereen is welkom',
  whatToExpect: 'Viering in de vroege ochtend met het ontsteken van het paasvuur en -kaars.',
  targetAudience: ['volwassenen', 'ouderen'],
  isFeatured: true,
});

// ============= GOEDE VRIJDAG STILTEWANDELING =============

activities.push({
  id: generateId(),
  title: 'Goede Vrijdag Stiltewandeling',
  description: 'Meditatieve wandeling door Woerden op Goede Vrijdag.',
  date: getDateInMonth(3, 18), // 18 april (Goede Vrijdag 2025)
  time: '19:00',
  endTime: '20:30',
  location: 'Start: Petruskerk',
  address: 'Kerkplein 5, Woerden',
  type: 'gebed',
  organizationId: 'rvk',
  forWho: 'Iedereen',
  whatToExpect: 'Een stille wandeling langs verschillende kerken met korte meditatieve momenten.',
  targetAudience: ['volwassenen', 'ouderen'],
  isFeatured: true,
});

// ============= KERSTSAMENZANG =============

activities.push({
  id: generateId(),
  title: 'Kerstsamenzang Woerden',
  description: 'Gezellige samenzang van bekende kerstliederen op de markt.',
  date: getDateInMonth(11, 23), // 23 december
  time: '19:00',
  endTime: '20:30',
  location: 'Markt, Woerden',
  type: 'concert',
  organizationId: 'rvk',
  forWho: 'Iedereen die mee wil zingen',
  whatToExpect: 'Samen kerstliederen zingen onder begeleiding van koren en een band.',
  targetAudience: ['kinderen', 'jongeren', 'volwassenen', 'ouderen'],
  isFeatured: true,
});

// ============= ORGELCONCERTEN (maandelijks) =============

for (let month = 0; month < 12; month++) {
  if (month === 7) continue; // Augustus vakantie
  
  const lastSaturday = getSundaysInMonth(2025, month).slice(-1)[0];
  lastSaturday.setDate(lastSaturday.getDate() - 1); // Zaterdag
  
  activities.push({
    id: generateId(),
    title: 'Orgelconcert Petruskerk',
    description: 'Klassiek orgelconcert op het monumentale orgel van de Petruskerk.',
    date: lastSaturday,
    time: '15:00',
    endTime: '16:30',
    location: 'Petruskerk',
    address: 'Kerkplein 5, Woerden',
    type: 'concert',
    organizationId: 'hervco',
    forWho: 'Liefhebbers van klassieke en kerkmuziek',
    whatToExpect: 'Werken van Bach, Buxtehude en andere grote componisten.',
    isRecurring: true,
    recurringInfo: 'Maandelijks',
    targetAudience: ['volwassenen', 'ouderen'],
  });
}

// ============= GOSPELMIDDAG =============

activities.push({
  id: generateId(),
  title: 'Gospelmiddag Woerdense Vakantieweek',
  description: 'Vrolijke middag vol gospelmuziek met lokale koren.',
  date: getDateInMonth(7, 6), // 6 augustus
  time: '14:00',
  endTime: '16:00',
  location: 'Stadsplein Woerden',
  type: 'concert',
  organizationId: 'rvk',
  forWho: 'Voor jong en oud',
  whatToExpect: 'Optredens van lokale koren en gospelgroepen. Meezingen wordt aangemoedigd!',
  targetAudience: ['kinderen', 'jongeren', 'volwassenen', 'ouderen'],
});

// ============= PAASORATORIUM =============

activities.push({
  id: generateId(),
  title: 'Paasoratorium - Matthäus Passion',
  description: 'Uitvoering van Bachs Matthäus Passion door lokale koren en orkest.',
  date: getDateInMonth(3, 13), // 13 april (Palmzondag)
  time: '19:30',
  endTime: '22:30',
  location: 'Petruskerk',
  address: 'Kerkplein 5, Woerden',
  type: 'concert',
  organizationId: 'hervco',
  forWho: 'Liefhebbers van klassieke muziek',
  whatToExpect: 'Een meeslepende uitvoering van Bachs meesterwerk. Kaarten via voorverkoop.',
  targetAudience: ['volwassenen', 'ouderen'],
  isFeatured: true,
});

// ============= BIJBELSTUDIEGROEPEN =============

for (let month = 0; month < 12; month++) {
  if (month === 6 || month === 7) continue;
  
  // Wekelijks op dinsdag
  for (let day = 1; day <= 28; day++) {
    const date = getDateInMonth(month, day);
    if (date.getDay() === 2) { // Dinsdag
      activities.push({
        id: generateId(),
        title: 'Bijbelstudiegroep',
        description: 'Wekelijkse Bijbelstudie voor verdieping en gesprek.',
        date: date,
        time: '20:00',
        endTime: '21:30',
        location: 'Rehobothkerk',
        address: 'Rembrandtlaan 2, Woerden',
        type: 'cursus',
        organizationId: 'rehoboth',
        forWho: 'Iedereen die de Bijbel wil bestuderen',
        whatToExpect: 'Inleiding, Bijbellezing en groepsgesprek.',
        isRecurring: true,
        recurringInfo: 'Elke dinsdag (behalve vakanties)',
        targetAudience: ['volwassenen'],
      });
    }
  }
}

// ============= VROUWENKRING =============

for (let month = 0; month < 12; month++) {
  if (month === 6 || month === 7) continue;
  
  const firstTuesday = getNthWeekday(2025, month, 2, 1);
  
  activities.push({
    id: generateId(),
    title: 'Vrouwenkring',
    description: 'Maandelijkse bijeenkomst voor vrouwen met thema en ontmoeting.',
    date: firstTuesday,
    time: '20:00',
    endTime: '22:00',
    location: 'Maranathakerk',
    address: 'Wilhelminaweg 51, Woerden',
    type: 'ontmoeting',
    organizationId: 'hervnw',
    forWho: 'Vrouwen van alle leeftijden',
    whatToExpect: 'Thema-avond met spreker of workshop, en tijd voor koffie en gesprek.',
    isRecurring: true,
    recurringInfo: 'Elke 1e dinsdag van de maand',
    targetAudience: ['volwassenen'],
  });
}

// ============= MANNENONTBIJT =============

for (let month = 0; month < 12; month++) {
  const lastSaturday = getSundaysInMonth(2025, month).slice(-1)[0];
  lastSaturday.setDate(lastSaturday.getDate() - 1);
  
  activities.push({
    id: generateId(),
    title: 'Mannenontbijt',
    description: 'Ontbijt en gesprek speciaal voor mannen.',
    date: lastSaturday,
    time: '08:30',
    endTime: '10:00',
    location: 'Het Baken',
    address: 'Boerendijk 88, Woerden',
    type: 'ontmoeting',
    organizationId: 'baken',
    forWho: 'Mannen van alle leeftijden',
    whatToExpect: 'Een stevig ontbijt met een kort thema-gesprek.',
    isRecurring: true,
    recurringInfo: 'Elke laatste zaterdag van de maand',
    targetAudience: ['volwassenen'],
  });
}

// ============= ROUWVERWERKINGSGROEP =============

// Januari en september start
[0, 8].forEach(startMonth => {
  for (let week = 0; week < 8; week++) {
    const date = getDateInMonth(startMonth, 8 + week * 7);
    
    activities.push({
      id: generateId(),
      title: 'Rouwverwerkingsgroep',
      description: 'Gespreksgroep voor mensen die een dierbare verloren hebben.',
      date: date,
      time: '19:30',
      endTime: '21:00',
      location: 'H. Bonaventurakerk',
      address: 'Kerkplein 1, Woerden',
      type: 'cursus',
      organizationId: 'paxchristi',
      forWho: 'Mensen die rouwen om een dierbare',
      whatToExpect: 'Een veilige plek om te delen en te luisteren. Begeleiding door pastoraal werker.',
      isRecurring: true,
      recurringInfo: 'Wekelijks (8 bijeenkomsten)',
      targetAudience: ['volwassenen', 'ouderen'],
    });
  }
});

// ============= VOEDSELBANK ONDERSTEUNING =============

for (let month = 0; month < 12; month++) {
  for (let day = 1; day <= 28; day++) {
    const date = getDateInMonth(month, day);
    if (date.getDay() === 3) { // Woensdag
      activities.push({
        id: generateId(),
        title: 'Voedselbank Ondersteuning',
        description: 'Help mee bij het inpakken van voedselpakketten.',
        date: date,
        time: '09:00',
        endTime: '12:00',
        location: 'Voedselbank Woerden',
        address: 'Industrieweg 22, Woerden',
        type: 'diaconaal',
        organizationId: 'paxchristi',
        forWho: 'Vrijwilligers die willen helpen',
        whatToExpect: 'Producten sorteren en inpakken. Koffie en gezelligheid inbegrepen.',
        isRecurring: true,
        recurringInfo: 'Elke woensdag',
        targetAudience: ['volwassenen', 'ouderen'],
      });
    }
  }
}

// ============= WANDELEN & PRATEN =============

for (let month = 0; month < 12; month++) {
  const thirdSaturday = getNthWeekday(2025, month, 6, 3);
  
  activities.push({
    id: generateId(),
    title: 'Wandelen & Praten',
    description: 'Gezamenlijke wandeling door het Groene Hart met ruimte voor gesprek.',
    date: thirdSaturday,
    time: '10:00',
    endTime: '12:00',
    location: 'Start: Kasteel Woerden',
    type: 'ontmoeting',
    organizationId: 'rvk',
    forWho: 'Iedereen die graag wandelt',
    whatToExpect: 'Een rustige wandeling van 5-6 km met onderweg tijd voor gesprek.',
    isRecurring: true,
    recurringInfo: 'Elke 3e zaterdag van de maand',
    targetAudience: ['volwassenen', 'ouderen'],
  });
}

// ============= BIJBELQUIZ KINDEREN (maandelijks) =============

for (let month = 0; month < 12; month++) {
  if (month === 6 || month === 7) continue;
  
  const lastWednesday = getNthWeekday(2025, month, 3, 4);
  
  activities.push({
    id: generateId(),
    title: 'Bijbelquiz Kinderen',
    description: 'Leuke quiz over Bijbelverhalen met prijzen!',
    date: lastWednesday,
    time: '15:00',
    endTime: '16:30',
    location: 'Rehobothkerk',
    address: 'Rembrandtlaan 2, Woerden',
    type: 'ontmoeting',
    organizationId: 'rehoboth',
    forWho: 'Kinderen van 8-12 jaar',
    whatToExpect: 'Spannende quiz in teams, met leuke prijzen voor de winnaars!',
    isRecurring: true,
    recurringInfo: 'Elke laatste woensdag van de maand',
    targetAudience: ['kinderen'],
  });
}

// ============= OPVOEDCURSUS =============

// Februari start
for (let week = 0; week < 6; week++) {
  const date = getDateInMonth(1, 6 + week * 7);
  
  activities.push({
    id: generateId(),
    title: 'Opvoedcursus: Geloof in het gezin',
    description: 'Cursus over geloofsopvoeding voor ouders.',
    date: date,
    time: '20:00',
    endTime: '21:30',
    location: 'Cama Parousia',
    address: 'Industrieweg 15, Woerden',
    type: 'cursus',
    organizationId: 'cama',
    forWho: 'Ouders met kinderen tot 12 jaar',
    whatToExpect: 'Praktische tips voor geloofsopvoeding, uitwisseling met andere ouders.',
    isRecurring: true,
    recurringInfo: 'Wekelijks (6 bijeenkomsten)',
    targetAudience: ['volwassenen'],
  });
}

// ============= OPENLUCHTDIENST ONDER DE BOMEN =============

activities.push({
  id: generateId(),
  title: 'Onder de Bomen - Openluchtdienst',
  description: 'Bijzondere zomerse viering in de open lucht.',
  date: getDateInMonth(6, 20), // 20 juli
  time: '10:30',
  endTime: '11:30',
  location: 'Park Blekerij, Woerden',
  type: 'viering',
  organizationId: 'rvk',
  forWho: 'Iedereen is welkom',
  whatToExpect: 'Een informele viering in de natuur met samenzang en korte overdenking.',
  targetAudience: ['kinderen', 'jongeren', 'volwassenen', 'ouderen'],
});

// ============= REGENBOOGDIENST =============

activities.push({
  id: generateId(),
  title: 'Regenboogdienst',
  description: 'Oecumenische viering voor en met LHBTI+ personen.',
  date: getDateInMonth(5, 29), // 29 juni (Pride Month)
  time: '15:00',
  endTime: '16:30',
  location: 'Petruskerk',
  address: 'Kerkplein 5, Woerden',
  type: 'viering',
  organizationId: 'rvk',
  forWho: 'LHBTI+ personen en iedereen die solidair wil zijn',
  whatToExpect: 'Een inclusieve viering met aandacht voor diversiteit en verbinding.',
  targetAudience: ['jongeren', 'volwassenen'],
});

// ============= MEDITATIEF AVONDGEBED LUTHERS (wekelijks) =============

for (let month = 0; month < 12; month++) {
  for (let day = 1; day <= 28; day++) {
    const date = getDateInMonth(month, day);
    if (date.getDay() === 3) { // Woensdag
      activities.push({
        id: generateId(),
        title: 'Meditatief Avondgebed',
        description: 'Een moment van stilte en bezinning midden in de week.',
        date: date,
        time: '19:00',
        endTime: '19:30',
        location: 'Lutherse Kerk',
        address: 'Korte Oudegracht 12, Woerden',
        type: 'gebed',
        organizationId: 'luthers',
        forWho: 'Iedereen die even tot rust wil komen',
        whatToExpect: 'Kaarslicht, stilte en een kort gebed.',
        isRecurring: true,
        recurringInfo: 'Elke woensdag',
        targetAudience: ['volwassenen', 'ouderen'],
      });
    }
  }
}

// ============= ADVENT VIERINGEN =============

for (let week = 0; week < 4; week++) {
  const date = getDateInMonth(11, 1 + week * 7); // December zondagen
  
  activities.push({
    id: generateId(),
    title: `Adventviering - ${week + 1}e Advent`,
    description: 'Speciale adventsviering met kaarsen en bezinning.',
    date: date,
    time: '10:00',
    endTime: '11:15',
    location: 'Diverse kerken',
    type: 'viering',
    organizationId: 'rvk',
    forWho: 'Iedereen',
    whatToExpect: 'Een sfeervolle viering met adventskaars en bezinning richting Kerst.',
    targetAudience: ['kinderen', 'jongeren', 'volwassenen', 'ouderen'],
  });
}

// ============= KERSTNACHTDIENST =============

activities.push({
  id: generateId(),
  title: 'Kerstnachtdienst',
  description: 'Sfeervolle viering van de geboorte van Jezus op kerstavond.',
  date: getDateInMonth(11, 24), // 24 december
  time: '22:00',
  endTime: '23:30',
  location: 'Petruskerk',
  address: 'Kerkplein 5, Woerden',
  type: 'viering',
  organizationId: 'hervco',
  forWho: 'Iedereen',
  whatToExpect: 'Een sfeervolle dienst met kaarslicht, samenzang en het kerstverhaal.',
  targetAudience: ['jongeren', 'volwassenen', 'ouderen'],
  isFeatured: true,
});

// ============= OUDEJAARSAVONDDIENST =============

activities.push({
  id: generateId(),
  title: 'Oudejaarsavonddienst',
  description: 'Het jaar afsluiten met dankbaarheid en hoop.',
  date: getDateInMonth(11, 31), // 31 december
  time: '19:30',
  endTime: '20:30',
  location: 'Maranathakerk',
  address: 'Wilhelminaweg 51, Woerden',
  type: 'viering',
  organizationId: 'hervnw',
  forWho: 'Iedereen',
  whatToExpect: 'Terugblik op het jaar, dankgebed en samenzang.',
  targetAudience: ['volwassenen', 'ouderen'],
});

// ============= NIEUWJAARSBIJEENKOMST =============

activities.push({
  id: generateId(),
  title: 'Nieuwjaarsontmoeting Kerken Woerden',
  description: 'Gezamenlijke nieuwjaarsreceptie van de kerken.',
  date: getDateInMonth(0, 5), // 5 januari
  time: '15:00',
  endTime: '17:00',
  location: 'Huis van Hoop',
  address: 'Rijnstraat 10, Woerden',
  type: 'ontmoeting',
  organizationId: 'rvk',
  forWho: 'Iedereen',
  whatToExpect: 'Nieuwjaarswensen uitwisselen, hapje en drankje, ontmoeting.',
  targetAudience: ['volwassenen', 'ouderen'],
});

// Export the activities array
export { activities };

export function getActivityById(id: string): Activity | undefined {
  return activities.find(activity => activity.id === id);
}

export function getUpcomingActivities(limit: number = 12): Activity[] {
  const now = new Date();
  return activities
    .filter(activity => activity.date >= now)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, limit);
}
