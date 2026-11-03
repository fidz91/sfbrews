export interface CompetitionRecord {
  id: string;
  competitionName: string;
  date: string;
  year: number;
  location?: string;
  beerName: string;
  batchNumber?: string;
  bjcpCategory: string;
  bjcpStyleName: string;
  abv?: number;
  srm: number;
  score?: number;
  maxScore: number;
  award: 'Best of Show' | 'Gold' | 'Silver' | 'Bronze' | 'Finalist' | 'Entered' | 'Pending';
  tableEntries?: number;
  scoresBreakdown?: {
    aroma: number;      // /12
    appearance: number; // /3
    flavor: number;     // /20
    mouthfeel: number;  // /5
    overall: number;    // /10
  };
  judgeSummary: string;
  nextIterationPlan: string;
  postSlug?: string;
  recipeSlug?: string;
  /**
   * Set `hidden: true` (or set `publishAfter` to a future YYYY-MM-DD date)
   * to keep this competition hidden on the live site until you are ready to publish.
   */
  hidden?: boolean;
  publishAfter?: string;
}

export function isCompetitionVisible(rec: CompetitionRecord): boolean {
  if (rec.hidden) return false;
  if (rec.publishAfter && new Date() < new Date(rec.publishAfter)) return false;
  return true;
}

export const COMPETITION_RECORDS: CompetitionRecord[] = [
  {
    id: 'midlands-craft-brewers-hoty-2026',
    competitionName: 'Midlands Craft Brewers Homebrewer of the Year',
    date: 'November 2026',
    year: 2026,
    location: 'Midlands, UK',
    beerName: 'Dark Rye Saison',
    bjcpCategory: '25B',
    bjcpStyleName: 'Saison (Dark Rye)',
    srm: 18.0,
    maxScore: 50,
    award: 'Entered',
    scoresBreakdown: {
      aroma: 0,
      appearance: 0,
      flavor: 0,
      mouthfeel: 0,
      overall: 0,
    },
    judgeSummary: 'Placeholder — add judge feedback and scoresheet notes here once results are announced in mid-November.',
    nextIterationPlan: 'Placeholder — add recipe adjustments for the next batch of Dark Rye Saison based on judge feedback.',
    postSlug: 'midlands-craft-brewers-homebrewer-of-the-year',
    recipeSlug: 'dark-rye-saison',
    // Hidden until mid-November: set `hidden: false` when ready to publish
    hidden: true,
    publishAfter: '2026-11-15',
  },
  {
    id: 'scottish-national-homebrew-competition-2027',
    competitionName: 'Scottish National Homebrew Competition',
    date: 'Jan / Feb 2027',
    year: 2027,
    location: 'Scotland, UK',
    beerName: 'TBD Entry Beer',
    bjcpCategory: 'TBD',
    bjcpStyleName: 'Style TBD',
    srm: 10.0,
    maxScore: 50,
    award: 'Entered',
    scoresBreakdown: {
      aroma: 0,
      appearance: 0,
      flavor: 0,
      mouthfeel: 0,
      overall: 0,
    },
    judgeSummary: 'Placeholder — add BJCP scoresheet summary here after judging at the end of January / early February.',
    nextIterationPlan: 'Placeholder — add planned recipe adjustments following competition feedback.',
    postSlug: 'scottish-national-homebrew-competition',
    // Hidden until end of Jan / early Feb: set `hidden: false` when ready to publish
    hidden: true,
    publishAfter: '2027-01-31',
  },
];
