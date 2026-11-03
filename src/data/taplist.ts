export interface TapEntry {
  tapNumber?: number;
  tapLabel?: string;
  name: string;
  batchNumber?: string;
  style: string;
  bjcpCode?: string;
  abv?: number;
  ibu?: number;
  og?: number;
  fg?: number;
  srm: number;
  kegRemainingPercent?: number;
  servingTemp?: string;
  glassware?: string;
  tastingNotes?: string;
  postSlug?: string;
}

export interface FermenterEntry {
  vessel?: string;
  name: string;
  batchNumber?: string;
  style: string;
  stage: string;
  dayInFermenter?: number;
  plannedTotalDays?: number;
  currentGravity?: number;
  targetFg?: number;
  currentTemp?: string;
  yeastStrain?: string;
  srm: number;
  statusNote?: string;
  postSlug?: string;
}

export interface UpcomingEntry {
  name: string;
  style: string;
  srm: number;
  notes?: string;
  postSlug?: string;
}

export const ACTIVE_TAPS: TapEntry[] = [
  {
    tapNumber: 1,
    tapLabel: 'ON TAP',
    name: 'Dark Rye Saison',
    style: 'Strong Dark Saison',
    bjcpCode: '25B',
    srm: 16.5,
    tastingNotes: 'Spicy rye character, sourdugh crust maltiness, and dry farmhouse finish.',
    postSlug: 'dark-rye-saison',
  },
];

export const ACTIVE_FERMENTERS: FermenterEntry[] = [
  // Currently empty — add an entry here when a batch is in the fermenter
];

export const UPCOMING_BREWS: UpcomingEntry[] = [
  {
    name: 'Christmas Stout',
    style: 'Black Forest Gateaux Stout',
    srm: 48.0,
    notes: 'Planned upcoming brew',
  },
  {
    name: 'Hoppy Pilsner',
    style: 'Double Dry Hopped Pilsner',
    srm: 5.2,
    notes: 'Planned upcoming brew',
  },
];
