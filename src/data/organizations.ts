import { Organization } from './types';

export const organizations: Organization[] = [
  {
    id: 'rvk',
    name: 'Raad van Kerken Woerden',
    shortName: 'RvK Woerden',
    website: 'https://www.kerkeninwoerden.nl',
    description: 'Samenwerkingsverband van kerken in Woerden, Harmelen, Kamerik, Kanis en Zegveld.',
  },
  {
    id: 'cama',
    name: 'Cama Parousia Woerden',
    shortName: 'Cama Parousia',
    website: 'https://www.camaparousia.nl',
    description: 'Evangelische gemeente in Woerden.',
  },
  {
    id: 'rehoboth',
    name: 'Rehobothkerk / CGKV Woerden',
    shortName: 'Rehobothkerk',
    description: 'Christelijke Gereformeerde Kerk Vrijgemaakt.',
  },
  {
    id: 'gkwz',
    name: 'Gereformeerde Kerk Woerden en Zegveld',
    shortName: 'GK Woerden/Zegveld',
    description: 'Gereformeerde Kerk in Woerden en Zegveld.',
  },
  {
    id: 'paxchristi',
    name: 'H. Bonaventurakerk (Pax Christi)',
    shortName: 'Pax Christi',
    description: 'Rooms-Katholieke parochie in Woerden.',
  },
  {
    id: 'luthers',
    name: 'Lutherse Gemeente Woerden',
    shortName: 'Lutherse Gemeente',
    description: 'Lutherse kerk in Woerden.',
  },
  {
    id: 'hervnw',
    name: 'Hervormde Gemeente Noord+West',
    shortName: 'Hervormd N+W',
    description: 'Protestantse gemeente Woerden Noord en West.',
  },
  {
    id: 'hervco',
    name: 'Hervormde Gemeente Centrum-Oost',
    shortName: 'Hervormd C-O',
    description: 'Protestantse gemeente Woerden Centrum en Oost.',
  },
  {
    id: 'baken',
    name: 'Het Baken',
    shortName: 'Het Baken',
    description: 'Kerkelijke gemeenschap in Woerden.',
  },
  {
    id: 'nak',
    name: 'Nieuw-Apostolische Kerk Woerden',
    shortName: 'NAK Woerden',
    description: 'Nieuw-Apostolische Kerk in Woerden.',
  },
  {
    id: 'hvh',
    name: 'Huis van Hoop',
    shortName: 'Huis van Hoop',
    description: 'Diaconaal initiatief voor ontmoeting en ondersteuning.',
  },
];

export function getOrganizationById(id: string): Organization | undefined {
  return organizations.find(org => org.id === id);
}

export function getOrganizationName(id: string): string {
  const org = getOrganizationById(id);
  return org?.name || id;
}
