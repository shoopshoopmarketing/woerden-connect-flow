export type ActivityType = 
  | 'kerkdienst'
  | 'lezing'
  | 'concert'
  | 'cursus'
  | 'diaconaal'
  | 'gebed'
  | 'ontmoeting'
  | 'viering';

export interface Organization {
  id: string;
  name: string;
  shortName?: string;
  website?: string;
  description?: string;
}

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
