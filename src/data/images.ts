/**
 * ============================================================================
 * CENTRAL IMAGE CONFIGURATION (`src/data/images.ts`)
 * ============================================================================
 * Change any image across SFBrews from this single file, OR directly inside
 * each post's Markdown frontmatter (`heroImage:`).
 *
 * Every image value below accepts EITHER:
 *   1. A filename uploaded to the private `_images/` folder:
 *      e.g. 'my-hero.jpg' or '_images/my-hero.jpg'
 *   2. Any full web URL:
 *      e.g. 'https://images.unsplash.com/photo-...'
 *
 * TIP: You can also simply drop a file into `_images/` named after a post slug
 * (for example `_images/dark-rye-saison.jpg` or `_images/hero.jpg`) and the
 * site will detect and use it automatically!
 * ============================================================================
 */

export interface GalleryItem {
  /** Filename in `_images/` (e.g. 'mash.jpg') or full URL ('https://...') */
  image: string;
  /** Optional caption shown beneath the photo */
  caption?: string;
  /** Optional alt text for screen readers */
  alt?: string;
}

export const SITE_IMAGES = {
  /**
   * Main background banner image on the Homepage Hero.
   *Tip: Drop `_images/hero.jpg` (or `.png`/`.webp`) into `_images/` to override automatically,
   * or change this string to a filename in `_images/` or a URL.
   */
  homeHero:
    'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?auto=format&fit=crop&w=2000&q=80',

  /**
   * Optional banner image for the About page (`/about`).
   * Set to a filename in `_images/` (e.g. 'brewhouse.jpg'), a URL, or leave '' for none.
   * Tip: Dropping `_images/about.jpg` into `_images/` also enables this automatically.
   */
  aboutHero: '',

  /**
   * Default fallback images for each post category if a post doesn't specify a `heroImage`.
   */
  categoryDefaults: {
    recipe:
      'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=1200&q=80',
    brewday:
      'https://images.unsplash.com/photo-1608270196042-286b68a42171?auto=format&fit=crop&w=1200&q=80',
    experiment:
      'https://images.unsplash.com/photo-1518176258769-f227c798150e?auto=format&fit=crop&w=1200&q=80',
    competition:
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    news:
      'https://images.unsplash.com/photo-1505075106905-fb052892c116?auto=format&fit=crop&w=1200&q=80',
  },
};

/**
 * Optional per-post hero image overrides by post slug (filename without `.md`).
 * Any non-empty string here overrides the `heroImage` in the post's `.md` file.
 * Accepts either a filename in `_images/` (e.g. 'dark-rye-saison.jpg') or a full URL.
 */
export const POST_HERO_OVERRIDES: Record<string, string> = {
  // 'dark-rye-saison': 'dark-rye-saison.jpg',
  // 'brewzilla-4-1-1-hands-on': 'brewzilla.jpg',
  // 'oatmeal-stout': 'https://images.unsplash.com/...',
};

/**
 * Optional per-post photo galleries by post slug.
 * Add photos here (or via `gallery:` in a post's `.md` frontmatter) to render a
 * glassmorphic photo gallery on that post's page.
 */
export const POST_GALLERIES: Record<string, (string | GalleryItem)[]> = {
  // 'brewzilla-4-1-1-hands-on': [
  //   { image: 'brewzilla-mash.jpg', caption: 'Recirculating mash on the BrewZilla 4.1.1' },
  //   { image: 'brewzilla-controller.jpg', caption: 'Top-mounted RAPT controller readout' },
  // ],
};
