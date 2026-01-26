
# Plan: Uitgebreide Activiteitenfilters + 300+ Mock Activiteiten

## Overzicht

Dit plan breidt de activiteitenpagina uit met:
1. **Horizontale tijdfilters** met maandelijks overzicht (januari t/m december)
2. **Doelgroepfilter** in de linker sidebar (Kinderen, Jongeren, Volwassenen, Ouderen)
3. **300+ mock activiteiten** verspreid over het hele jaar
4. **Specifieke kinder- en jongerenactiviteiten** zoals gevraagd

---

## Deel 1: Uitbreiding Datamodel

### 1.1 Toevoegen TargetAudience type
Nieuw type in `src/data/types.ts`:

```text
TargetAudience = 'kinderen' | 'jongeren' | 'volwassenen' | 'ouderen'
```

Met labels:
- Kinderen (0-12 jaar)
- Jongeren (12-25 jaar)  
- Volwassenen (25-65 jaar)
- Ouderen (65+)

### 1.2 Uitbreiding Activity interface
Toevoegen van `targetAudience?: TargetAudience[]` veld aan Activity interface.

---

## Deel 2: Horizontale Tijdfilters

### 2.1 Nieuwe TimeFilter opties
Uitbreiding van bestaande TimeFilter:

| Filter | Beschrijving |
|--------|-------------|
| all | Alle activiteiten |
| today | Vandaag |
| week | Deze week |
| month | Deze maand |
| januari | Januari (maand 1) |
| februari | Februari (maand 2) |
| ... | ... |
| december | December (maand 12) |

### 2.2 UI Design horizontale filter
- Eerste rij: "Alle", "Vandaag", "Deze week", "Deze maand"
- Tweede rij (scrollbaar op mobiel): alle 12 maanden als clickable buttons
- Actieve filter krijgt primaire stijl

---

## Deel 3: Doelgroepfilter in Sidebar

### 3.1 Nieuwe filter sectie
Toevoegen aan `FilterSidebar` component:

```text
Doelgroep:
☐ Kinderen
☐ Jongeren  
☐ Volwassenen
☐ Ouderen
```

### 3.2 Filterlogica
- Meerdere doelgroepen selecteerbaar
- Toont activiteiten die minimaal één van de geselecteerde doelgroepen bevatten

---

## Deel 4: 300+ Mock Activiteiten

### 4.1 Structuur voor datumgeneratie
Helper functies voor datums verspreid over het jaar:
- `getDateInMonth(month, day)` - specifieke datum in 2025/2026
- `getNextOccurrence(weekday, weekNumber)` - terugkerende evenementen

### 4.2 Activiteiten per categorie

#### Kinderactiviteiten (ca. 40)
| Activiteit | Periode | Frequentie | Locatie |
|-----------|---------|------------|---------|
| **Vakantiebijbelweek** | Juli (wk 2) | Jaarlijks, 5 dagen | Cama Parousia |
| **Kinderclub** | Hele jaar | Elke vrijdagavond | Div. kerken |
| **Kinderkerstfeest** | December | Jaarlijks | Maranathakerk |
| **Paasontbijt kinderen** | April | Jaarlijks | Het Baken |
| **Kinderkoor repetitie** | Hele jaar | Wekelijks | GK Woerden |
| **Bijbelquiz kinderen** | Maandelijks | Maandelijks | Rehobothkerk |

#### Jongerenactiviteiten (ca. 50)
| Activiteit | Periode | Frequentie | Locatie |
|-----------|---------|------------|---------|
| **Jeugddienst Lighthouse** | Hele jaar | Maandelijks (2e zondag) | Lighthouse Woerden |
| **Alpha Youth** | Januari + September | 12 weken | Cama Parousia |
| **Tienerclub** | Hele jaar | Wekelijks vrijdag | Rehobothkerk |
| **Youth Worship Night** | Kwartaal | 4x per jaar | Lighthouse Woerden |
| **Jongerenkamp** | Augustus | Jaarlijks (weekend) | Extern |
| **Gamenight jongeren** | Maandelijks | Maandelijks | Het Baken |

#### Alpha Cursus (gebaseerd op Alpha Nederland)
| Activiteit | Start | Duur | Details |
|-----------|-------|------|---------|
| **Alpha Cursus** | Januari + September | 10 weken | Maaltijd + video + gesprek |
| **Alpha Youth** | Januari + September | 12 weken | Voor 13-17 jaar |
| **Alpha Weekend** | Februari + Oktober | Weekend | Heilige Geest thema |

#### Reguliere kerkdiensten (ca. 100)
- Zondagmorgendiensten voor elke kerk (wekelijks terugkerend)
- Avonddiensten Hervormd CO en N+W
- Speciale diensten (Pasen, Pinksteren, Kerst, Advent)

#### Cursussen & Workshops (ca. 30)
- Bijbelstudiegroepen
- Geloofsverdieping
- Rouwverwerking
- Opvoedcursus
- Mannenontbijt / Vrouwenkring

#### Ouderenactiviteiten (ca. 25)
- Seniorenmiddagen
- Koffie-inloop 55+
- Bezoekdienst
- Kerst voor alleenstaanden
- Zangmiddag senioren

#### Oecumenische activiteiten (ca. 40)
- Vredesweek viering
- Week van Gebed
- Taizé-avonden
- 40-dagentijd
- Pinksterviering

#### Concerten & Muziek (ca. 20)
- Orgelconcerten
- Gospelmiddagen
- Kerstsamenzang
- Paasoratorium

---

## Deel 5: Specifieke Activiteiten Details

### 5.1 Alpha Cursus
Gebaseerd op informatie van Alpha Nederland:
- **Structuur**: Maaltijd → Video/Inleiding → Kleine groepsgesprek
- **Duur**: 10 avonden + weekend
- **Thema's**: "Wie is Jezus?", "Waarom bidden?", "Hoe leidt God ons?", etc.
- **Kosten**: Gratis (vrijwillige bijdrage voor weekend)
- **Start**: Januari en September

### 5.2 Alpha Youth
- **Doelgroep**: 13-17 jaar
- **Structuur**: Eten → Alpha Youth Series video → Groepsgesprek
- **Duur**: 12-16 avonden
- **Locatie**: Cama Parousia (moderne setting)

### 5.3 Jeugddiensten Lighthouse Woerden
- **Locatie**: Lighthouse Woerden (jeugdcentrum)
- **Frequentie**: Elke 2e zondag van de maand
- **Tijd**: 19:00 - 20:30
- **Inhoud**: Moderne worship, spreker, ontmoeting
- **Doelgroep**: 12-25 jaar

### 5.4 Vakantiebijbelweek
- **Periode**: 2e week juli
- **Dagprogramma**: 09:30 - 12:00
- **Activiteiten**: Bijbelverhalen, knutselen, spelletjes, zingen
- **Doelgroep**: 4-12 jaar
- **Organisatie**: Cama Parousia + samenwerkende kerken

### 5.5 Kinderclub (Vrijdagavond)
- **Kerken**: Cama Parousia, Rehobothkerk, GK Woerden
- **Tijd**: 18:30 - 20:00
- **Frequentie**: Elke vrijdag (m.u.v. vakanties)
- **Doelgroep**: 6-12 jaar

---

## Deel 6: Technische Implementatie

### Aan te passen bestanden:

| Bestand | Wijziging |
|---------|-----------|
| `src/data/types.ts` | + TargetAudience type, + targetAudience field in Activity |
| `src/data/activities.ts` | Uitbreiden naar 300+ activiteiten met targetAudience |
| `src/components/FilterBar.tsx` | + Maandfilters, + Doelgroepfilter |
| `src/pages/Activities.tsx` | + State voor maand en doelgroep filters |

### Nieuwe exports in types.ts:
```typescript
export type TargetAudience = 'kinderen' | 'jongeren' | 'volwassenen' | 'ouderen';

export const targetAudienceLabels: Record<TargetAudience, string> = {
  kinderen: 'Kinderen (0-12)',
  jongeren: 'Jongeren (12-25)',
  volwassenen: 'Volwassenen',
  ouderen: 'Senioren (65+)',
};
```

---

## Deel 7: Organisatie Toevoegingen

### Lighthouse Woerden
Nieuwe organisatie toevoegen in `src/data/organizations.ts`:
- Naam: Lighthouse Woerden
- Type: Jongerencentrum / Interkerkelijk
- Locatie: Woerden-West
- Focus: Jeugddiensten en jongerenactiviteiten

---

## Samenvatting wijzigingen

| Onderdeel | Status |
|-----------|--------|
| Horizontale filters (vandaag/week/maand) | Uitbreiden met maanden |
| Maandfilters (jan-dec) | Nieuw |
| Doelgroepfilter sidebar | Nieuw |
| TargetAudience datatype | Nieuw |
| 300+ mock activiteiten | Nieuw |
| Alpha Cursus | Nieuw |
| Alpha Youth | Nieuw |
| Vakantiebijbelweek | Nieuw |
| Kinderclub | Nieuw |
| Jeugddiensten Lighthouse | Nieuw |
| Lighthouse organisatie | Nieuw |

Dit resulteert in een volledig gevulde activiteitenagenda die het hele jaar bestrijkt, met specifieke filters voor tijd en doelgroep, en realistische kinder- en jongerenactiviteiten gebaseerd op bestaande concepten zoals de Alpha Cursus.
