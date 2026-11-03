import { defineCollection, z } from 'astro:content';

const recipeSchema = z.object({
  batchSize: z.string().default('21 L (5.5 gal)'),
  boilTime: z.string().default('60 min'),
  efficiency: z.string().default('75%'),
  og: z.number(),
  fg: z.number(),
  abv: z.number(),
  ibu: z.number(),
  srm: z.number(),
  fermentables: z.array(
    z.object({
      name: z.string(),
      weight: z.string(),
      percentage: z.number(),
      lovibond: z.string().optional(),
      notes: z.string().optional(),
    })
  ),
  hops: z.array(
    z.object({
      name: z.string(),
      weight: z.string(),
      alphaAcid: z.string(),
      timing: z.string(),
      use: z.enum(['Boil', 'First Wort', 'Flameout', 'Whirlpool', 'Dry Hop', 'Mash Hop']),
      ibuContribution: z.number().optional(),
    })
  ),
  yeast: z.object({
    name: z.string(),
    lab: z.string(),
    code: z.string(),
    attenuation: z.string(),
    tempRange: z.string(),
    pitchNotes: z.string().optional(),
  }),
  mash: z.array(
    z.object({
      step: z.string(),
      temp: z.string(),
      duration: z.string(),
      notes: z.string().optional(),
    })
  ),
  waterProfile: z
    .object({
      profileName: z.string(),
      ca: z.number(),
      mg: z.number(),
      na: z.number(),
      cl: z.number(),
      so4: z.number(),
      hco3: z.number().optional(),
      mashPh: z.number(),
      notes: z.string().optional(),
    })
    .optional(),
  fermentationNotes: z.string().optional(),
});

const experimentSchema = z.object({
  hypothesis: z.string(),
  variableTested: z.string(),
  controlBatch: z.string(),
  experimentalBatch: z.string(),
  panelSize: z.string(),
  significantResult: z.boolean(),
  pValueSummary: z.string(),
  verdict: z.string(),
  gravityCurve: z
    .array(
      z.object({
        day: z.number(),
        controlSg: z.number(),
        experimentSg: z.number(),
      })
    )
    .optional(),
});

const competitionSchema = z.object({
  eventName: z.string(),
  date: z.string(),
  location: z.string().optional(),
  bjcpCategory: z.string(),
  entryBeer: z.string(),
  batchNumber: z.string().optional(),
  score: z.number().optional(),
  maxScore: z.number().default(50),
  award: z
    .enum(['Best of Show', 'Gold', 'Silver', 'Bronze', 'Finalist', 'Entered', 'Pending'])
    .default('Pending'),
  scoresBreakdown: z
    .object({
      aroma: z.number(),
      appearance: z.number(),
      flavor: z.number(),
      mouthfeel: z.number(),
      overall: z.number(),
    })
    .optional(),
  judgeConsensus: z.string().optional(),
  recipeImprovements: z.string().optional(),
});

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    hidden: z.boolean().default(false),
    publishAfter: z.coerce.date().optional(),
    category: z.enum(['brewday', 'recipe', 'experiment', 'competition', 'news']),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    batchNumber: z.string().optional(),
    beerStyle: z.string().optional(),
    readingTime: z.string().optional(),
    heroImage: z.string().optional(),
    heroCaption: z.string().optional(),
    recipe: recipeSchema.optional(),
    experiment: experimentSchema.optional(),
    competition: competitionSchema.optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
