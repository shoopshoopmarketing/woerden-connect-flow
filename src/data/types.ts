export type ActivityType = 
  | 'kerkdienst'
  | 'lezing'
  | 'concert'
  | 'cursus'
  | 'diaconaal'
  | 'gebed'
  | 'ontmoeting'
  | 'viering';

export type Denomination = 
  | 'rooms-katholiek'
  | 'protestant-hervormd'
  | 'gereformeerd'
  | 'evangelisch'
  | 'luthers'
  | 'nieuw-apostolisch'
  | 'oecumenisch';

export type ChurchSize = 'klein' | 'middelgroot' | 'groot';

export type ServiceStyle = 'traditioneel' | 'modern' | 'gemengd';

export interface Organization {
  id: string;
  name: string;
  shortName?: string;
  website?: string;
  description?: string;
  // Kerkwijzer velden
  denomination?: Denomination;
  size?: ChurchSize;
  serviceStyle?: ServiceStyle;
  neighborhood?: string;
  address?: string;
  hasChildcare?: boolean;
  hasYouthGroup?: boolean;
  hasAccessibility?: boolean;
  hasParkingAvailable?: boolean;
  hasRingloop?: boolean;
  serviceTime?: string;
  image?: string;
  longDescription?: string;
}

export type TargetAudience = 'kinderen' | 'jongeren' | 'volwassenen' | 'ouderen';

export interface Activity {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  date: Date;
  endDate?: Date;
  time: string;
  endTime?: string;
  location: string;
  address?: string;
  type: ActivityType;
  organizationId: string;
  image?: string;
  forWho?: string;
  whatToExpect?: string;
  isFeatured?: boolean;
  isRecurring?: boolean;
  recurringInfo?: string;
  targetAudience?: TargetAudience[];
  // Terugblik velden
  retrospective?: string;
  retrospectiveImages?: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: Date;
  image?: string;
  author?: string;
  category?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ActivitySubmission {
  activityName: string;
  organization: string;
  contactPerson: string;
  contactEmail: string;
  date: string;
  time: string;
  activityType: ActivityType;
  description: string;
  location?: string;
}

export interface ActivityRegistration {
  activityId: string;
  name: string;
  email: string;
  numberOfPeople?: number;
}

export const activityTypeLabels: Record<ActivityType, string> = {
  kerkdienst: 'Kerkdienst',
  lezing: 'Lezing',
  concert: 'Concert',
  cursus: 'Cursus / Workshop',
  diaconaal: 'Diaconaal initiatief',
  gebed: 'Gebed / Verstilling',
  ontmoeting: 'Ontmoeting',
  viering: 'Oecumenische viering',
};

export const activityTypeColors: Record<ActivityType, string> = {
  kerkdienst: 'bg-purple-light text-purple',
  lezing: 'bg-terracotta-light text-primary',
  concert: 'bg-secondary text-secondary-foreground',
  cursus: 'bg-sage-light text-sage',
  diaconaal: 'bg-accent text-accent-foreground',
  gebed: 'bg-purple-light text-purple',
  ontmoeting: 'bg-terracotta-light text-primary',
  viering: 'bg-secondary text-secondary-foreground',
};

export const denominationLabels: Record<Denomination, string> = {
  'rooms-katholiek': 'Rooms-Katholiek',
  'protestant-hervormd': 'Protestant / Hervormd',
  'gereformeerd': 'Gereformeerd',
  'evangelisch': 'Evangelisch',
  'luthers': 'Luthers',
  'nieuw-apostolisch': 'Nieuw-Apostolisch',
  'oecumenisch': 'Oecumenisch',
};

export const sizeLabels: Record<ChurchSize, string> = {
  klein: 'Klein (< 100 leden)',
  middelgroot: 'Middelgroot (100-300 leden)',
  groot: 'Groot (> 300 leden)',
};

export const styleLabels: Record<ServiceStyle, string> = {
  traditioneel: 'Traditioneel',
  modern: 'Modern',
  gemengd: 'Gemengd',
};

export const targetAudienceLabels: Record<TargetAudience, string> = {
  kinderen: 'Kinderen (0-12)',
  jongeren: 'Jongeren (12-25)',
  volwassenen: 'Volwassenen',
  ouderen: 'Senioren (65+)',
};
