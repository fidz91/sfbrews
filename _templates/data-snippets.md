# Data File Copy-Paste Snippets

Use these snippets when updating the live **Taplist / Fermenters / Upcoming Brews** (`src/data/taplist.ts`) or the **Competition Ledger** (`src/data/competitions.ts`).

---

## 1. New Tap Entry (`src/data/taplist.ts` -> `ACTIVE_TAPS`)

```ts
  {
    tapNumber: 1,
    tapLabel: 'ON TAP',
    name: 'Beer Name',
    style: 'Beer Style Name',
    bjcpCode: '25B',
    abv: 5.5,
    srm: 12.0,                   // Controls the beer color swatch (2 = straw, 15 = amber, 35 = stout)
    tastingNotes: 'Short tasting notes shown on the taplist board.',
    postSlug: 'your-recipe-filename-without-md', // Optional: links to /posts/your-recipe-filename-without-md
  },
```

---

## 2. New Fermenter Entry (`src/data/taplist.ts` -> `ACTIVE_FERMENTERS`)

*(Leave `ACTIVE_FERMENTERS = []` when fermenters are empty.)*

```ts
  {
    name: 'Beer Name',
    style: 'Beer Style Name',
    stage: 'Primary Fermentation',
    currentGravity: 1.020,
    targetFg: 1.010,
    srm: 8.5,
    statusNote: 'Fermentation notes.',
    postSlug: 'your-post-filename-without-md', // Optional
  },
```

---

## 3. New Upcoming Brew Entry (`src/data/taplist.ts` -> `UPCOMING_BREWS`)

```ts
  {
    name: 'Beer Name',
    style: 'Beer Style Name',
    srm: 10.0,
    notes: 'Planned upcoming brew',
    postSlug: 'your-post-filename-without-md', // Optional
  },
```

---

## 4. New Competition Entry (`src/data/competitions.ts` -> `COMPETITION_RECORDS`)

```ts
  {
    id: 'comp-name-2026-beer',
    competitionName: 'Competition Name',
    date: 'November 2026',
    year: 2026,
    location: 'Location, UK',
    beerName: 'Beer Name',
    bjcpCategory: '25B',
    bjcpStyleName: 'Saison',
    srm: 18.0,
    score: 42.0,
    maxScore: 50,
    // Allowed awards: 'Best of Show' | 'Gold' | 'Silver' | 'Bronze' | 'Finalist' | 'Entered' | 'Pending'
    award: 'Entered',
    scoresBreakdown: {
      aroma: 10.0,      // /12
      appearance: 3.0,  // /3
      flavor: 17.0,     // /20
      mouthfeel: 4.5,   // /5
      overall: 7.5,     // /10
    },
    judgeSummary: 'Summary of what the judges wrote on the BJCP scoresheets.',
    nextIterationPlan: 'What you plan to tweak on the next batch.',
    postSlug: 'your-competition-post-without-md', // Optional
    recipeSlug: 'your-recipe-post-without-md',    // Optional
    hidden: false,                                // Set true to hide until ready
    publishAfter: '2026-11-15',                   // Optional YYYY-MM-DD date
  },
```
