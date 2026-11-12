/**
 * Converts SRM (Standard Reference Method) beer color value to an accurate hex color string
 * and returns both the hex value, EBC equivalent, and a human-readable descriptor.
 */
export function srmToHex(srm: number): string {
  const srmPalette: { max: number; hex: string }[] = [
    { max: 1.5, hex: '#FFE699' },
    { max: 2, hex: '#FFD878' },
    { max: 3, hex: '#FFCA5A' },
    { max: 4, hex: '#FFBF42' },
    { max: 5, hex: '#FBB123' },
    { max: 6, hex: '#F8A600' },
    { max: 7, hex: '#F39C00' },
    { max: 8, hex: '#EA8F00' },
    { max: 9, hex: '#E58500' },
    { max: 10, hex: '#DE7C00' },
    { max: 11, hex: '#D77200' },
    { max: 12, hex: '#CF6900' },
    { max: 13, hex: '#CB6200' },
    { max: 14, hex: '#C35900' },
    { max: 15, hex: '#BB5100' },
    { max: 16, hex: '#B54C00' },
    { max: 17, hex: '#B04500' },
    { max: 18, hex: '#A63E00' },
    { max: 19, hex: '#A13700' },
    { max: 20, hex: '#9B3200' },
    { max: 22, hex: '#8E2900' },
    { max: 24, hex: '#821E00' },
    { max: 26, hex: '#771900' },
    { max: 28, hex: '#6B1400' },
    { max: 30, hex: '#5E0E00' },
    { max: 34, hex: '#4A0A02' },
    { max: 38, hex: '#36080A' },
    { max: 100, hex: '#1F0506' },
  ];

  for (const stop of srmPalette) {
    if (srm <= stop.max) return stop.hex;
  }
  return '#1F0506';
}

export function srmToEbc(srm: number): number {
  return Math.round(srm * 1.97);
}

export function srmDescriptor(srm: number): string {
  if (srm <= 3) return 'Pale Straw';
  if (srm <= 4.5) return 'Straw / Pale Gold';
  if (srm <= 6.5) return 'Deep Gold';
  if (srm <= 9) return 'Light Amber';
  if (srm <= 14) return 'Medium Amber / Copper';
  if (srm <= 18) return 'Deep Copper / Red-Brown';
  if (srm <= 24) return 'Mahogany / Brown';
  if (srm <= 32) return 'Ruby Black / Dark Brown';
  return 'Opaque Black';
}

export const srmDescription = srmDescriptor;

export const CATEGORY_META: Record<
  'brewday' | 'recipe' | 'experiment' | 'competition' | 'news',
  { label: string; plural: string; badgeClass: string; description: string; href: string }
> = {
  brewday: {
    label: 'Brewday Log',
    plural: 'Brewdays',
    badgeClass: 'badge-brewday',
    description: 'Grain-to-glass field notes, mash performance, boil-day logs, and fermentation notes.',
    href: '/recipes',
  },
  recipe: {
    label: 'Recipe & Brewday',
    plural: 'Recipes & Brewdays',
    badgeClass: 'badge-recipe',
    description: 'All-grain formulations, grist builds, hop schedules, water profiles, and brewday logs.',
    href: '/recipes',
  },
  experiment: {
    label: 'Split-Batch & Lab',
    plural: 'Experiments',
    badgeClass: 'badge-experiment',
    description: 'Controlled side-by-side brewing trials, triangle tests, and variable comparisons.',
    href: '/experiments',
  },
  competition: {
    label: 'Competition Report',
    plural: 'Competitions',
    badgeClass: 'badge-competition',
    description: 'BJCP scoresheet breakdowns, judge feedback analysis, and competition entries.',
    href: '/competitions',
  },
  news: {
    label: 'Equipment & News',
    plural: 'Equipment & News',
    badgeClass: 'badge-news',
    description: 'Brewhouse upgrades, seasonal releases, and SFBrews updates.',
    href: '/journal?category=news',
  },
};

export function isPostVisible(post: {
  data: { hidden?: boolean; publishAfter?: Date };
}): boolean {
  if (post.data.hidden) return false;
  if (post.data.publishAfter && new Date() < post.data.publishAfter) return false;
  return true;
}

export function withBase(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}` || '/';
}
