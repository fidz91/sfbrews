import type { ImageMetadata } from 'astro';
import { POST_GALLERIES, POST_HERO_OVERRIDES, SITE_IMAGES, type GalleryItem } from '../data/images';
import { withBase } from './srm';

type GlobEntry = { default: ImageMetadata | string };

/**
 * Load all images dropped into the private `_images/` folder (or `src/assets/images/`).
 */
const privateImageModules = import.meta.glob<GlobEntry>(
  [
    '/_images/**/*.{png,jpg,jpeg,webp,avif,gif,svg,PNG,JPG,JPEG,WEBP,AVIF,GIF,SVG}',
    '/src/assets/images/**/*.{png,jpg,jpeg,webp,avif,gif,svg,PNG,JPG,JPEG,WEBP,AVIF,GIF,SVG}',
  ],
  { eager: true }
);

const byRelativePath = new Map<string, string>();
const byFilename = new Map<string, string>();
const bySlugStem = new Map<string, string>();

for (const [rawKey, mod] of Object.entries(privateImageModules)) {
  const asset = mod?.default;
  const resolvedUrl = typeof asset === 'string' ? asset : asset?.src;
  if (!resolvedUrl) continue;

  const normalizedKey = rawKey.replace(/\\/g, '/');
  byRelativePath.set(normalizedKey.toLowerCase(), resolvedUrl);
  byRelativePath.set(normalizedKey.replace(/^\//, '').toLowerCase(), resolvedUrl);

  const strippedPrivate = normalizedKey
    .replace(/^\/_images\//i, '')
    .replace(/^\/src\/assets\/images\//i, '');
  byRelativePath.set(strippedPrivate.toLowerCase(), resolvedUrl);

  const fileName = strippedPrivate.split('/').pop() || '';
  if (fileName) {
    byFilename.set(fileName.toLowerCase(), resolvedUrl);
    const stem = fileName.replace(/\.[^.]+$/, '').toLowerCase();
    if (stem && !bySlugStem.has(stem)) {
      bySlugStem.set(stem, resolvedUrl);
    }
  }
}

/**
 * Resolves any image reference:
 * - Full external URL ('https://...', 'http://...', 'data:...')
 * - Filename or relative path inside the private `_images/` folder (e.g. 'my-beer.jpg' or '_images/my-beer.jpg')
 * - Public folder path (e.g. '/images/my-beer.jpg') automatically prefixed with the site base path
 */
export function resolveImage(input?: string | null): string | undefined {
  if (!input) return undefined;
  const trimmed = input.trim();
  if (!trimmed) return undefined;

  // 1. Direct external URL or data URI
  if (/^(https?:)?\/\//i.test(trimmed) || trimmed.startsWith('data:')) {
    return trimmed;
  }

  // 2. Check private `_images/` (or `src/assets/images/`) folder by path, filename, or stem
  const cleanLookup = trimmed.replace(/\\/g, '/').replace(/^\.\//, '').toLowerCase();
  const withoutLeadingSlash = cleanLookup.replace(/^\//, '');

  const matchedPrivate =
    byRelativePath.get(cleanLookup) ||
    byRelativePath.get(withoutLeadingSlash) ||
    byFilename.get(withoutLeadingSlash.split('/').pop() || '') ||
    bySlugStem.get(withoutLeadingSlash);

  if (matchedPrivate) {
    return matchedPrivate;
  }

  // 3. Fallback to public folder with base URL support
  if (trimmed.startsWith('/')) {
    return withBase(trimmed);
  }
  return withBase(`/images/${trimmed}`);
}

/**
 * Finds an image in `_images/` whose filename stem matches `slug` (e.g. `_images/dark-rye-saison.jpg`).
 */
export function findPrivateImageByStem(stem: string): string | undefined {
  return bySlugStem.get(stem.trim().toLowerCase());
}

/**
 * Resolves the Homepage Hero cover image:
 * 1. `_images/hero.{jpg,png,webp,...}` if present in the private folder
 * 2. `SITE_IMAGES.homeHero` in `src/data/images.ts`
 */
export function resolveHomeHeroImage(): string {
  const autoHero = findPrivateImageByStem('hero') || findPrivateImageByStem('home-hero');
  if (autoHero) return autoHero;
  return resolveImage(SITE_IMAGES.homeHero) || SITE_IMAGES.homeHero;
}

/**
 * Resolves the optional About page banner image:
 * 1. `_images/about.{jpg,png,webp,...}` if present in the private folder
 * 2. `SITE_IMAGES.aboutHero` in `src/data/images.ts`
 */
export function resolveAboutHeroImage(): string | undefined {
  const autoAbout = findPrivateImageByStem('about') || findPrivateImageByStem('brewhouse');
  if (autoAbout) return autoAbout;
  return resolveImage(SITE_IMAGES.aboutHero);
}

/**
 * Resolves a post's hero image with intuitive priority:
 * 1. Central override in `POST_HERO_OVERRIDES[post.slug]` (`src/data/images.ts`)
 * 2. Auto-matched file in `_images/<post.slug>.{jpg,png,webp,...}`
 * 3. `heroImage` frontmatter in the post's `.md` file (supports `_images/` filename or external URL)
 * 4. Category default image from `SITE_IMAGES.categoryDefaults`
 */
export function resolvePostHeroImage(post: {
  slug: string;
  data: {
    heroImage?: string;
    category: 'brewday' | 'recipe' | 'experiment' | 'competition' | 'news';
  };
}): string | undefined {
  const centralOverride = POST_HERO_OVERRIDES[post.slug];
  if (centralOverride && centralOverride.trim()) {
    return resolveImage(centralOverride);
  }

  const autoSlugMatch = findPrivateImageByStem(post.slug);
  if (autoSlugMatch) {
    return autoSlugMatch;
  }

  if (post.data.heroImage && post.data.heroImage.trim()) {
    return resolveImage(post.data.heroImage);
  }

  const categoryFallback = SITE_IMAGES.categoryDefaults[post.data.category];
  return resolveImage(categoryFallback);
}

export interface ResolvedGalleryItem {
  src: string;
  caption?: string;
  alt: string;
}

/**
 * Resolves all gallery images for a post (merging frontmatter `gallery` and `POST_GALLERIES[slug]`).
 */
export function resolvePostGallery(post: {
  slug: string;
  data: {
    title: string;
    gallery?: (string | { image: string; caption?: string; alt?: string })[];
  };
}): ResolvedGalleryItem[] {
  const rawList: (string | GalleryItem)[] = [
    ...(post.data.gallery || []),
    ...(POST_GALLERIES[post.slug] || []),
  ];

  const resolved: ResolvedGalleryItem[] = [];
  for (const item of rawList) {
    if (typeof item === 'string') {
      const src = resolveImage(item);
      if (src) {
        resolved.push({ src, alt: post.data.title });
      }
    } else if (item && typeof item === 'object' && item.image) {
      const src = resolveImage(item.image);
      if (src) {
        resolved.push({
          src,
          caption: item.caption,
          alt: item.alt || item.caption || post.data.title,
        });
      }
    }
  }
  return resolved;
}

/**
 * Returns a plain object map of filename -> bundled URL so client-side Markdown `<img>` tags
 * referencing private `_images/` filenames (e.g. `![Mash](mash.jpg)`) resolve automatically.
 */
export function getPrivateImageClientMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const [key, val] of byFilename.entries()) {
    map[key] = val;
  }
  for (const [key, val] of byRelativePath.entries()) {
    map[key] = val;
  }
  return map;
}
