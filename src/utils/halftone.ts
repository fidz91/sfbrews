import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
import { withBase } from './srm';

const HALFTONE_DIR = path.resolve(process.cwd(), 'public/halftones');
const DIST_HALFTONE_DIR = path.resolve(process.cwd(), 'dist/halftones');
const TARGET_WIDTH = 520;
const DOT_PITCH = 3;
const BASE_OFFSET_PX = 10;
const VERSION = 'v1';

interface PlateSpec {
  baseAngle: number;
  rgb: [number, number, number];
  alpha: number;
  channel: 0 | 1 | 2 | 3;
  scale: number;
}

const PLATES: PlateSpec[] = [
  { baseAngle: 15, rgb: [0, 165, 225], alpha: 0.86, channel: 0, scale: 1.0 },
  { baseAngle: 75, rgb: [225, 10, 130], alpha: 0.86, channel: 1, scale: 1.0 },
  { baseAngle: 0, rgb: [245, 220, 20], alpha: 0.85, channel: 2, scale: 1.0 },
  { baseAngle: 45, rgb: [30, 28, 25], alpha: 0.82, channel: 3, scale: 0.82 },
];

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function rgbToCmyk(r: number, g: number, b: number): [number, number, number, number] {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const k = 1 - Math.max(rn, gn, bn);
  if (k >= 0.999) return [0, 0, 0, 1];
  const inv = 1 / (1 - k);
  return [(1 - rn - k) * inv, (1 - gn - k) * inv, (1 - bn - k) * inv, k];
}

async function loadImageBuffer(src: string): Promise<Buffer | null> {
  try {
    if (/^https?:\/\//i.test(src)) {
      const res = await fetch(src);
      if (!res.ok) return null;
      const arr = await res.arrayBuffer();
      return Buffer.from(arr);
    }

    // Handle local public/ paths
    const clean = src.replace(/^\/sfbrews\//, '/').replace(/^\//, '');
    const publicCandidate = path.resolve(process.cwd(), 'public', clean);
    try {
      return await fs.readFile(publicCandidate);
    } catch {
      return null;
    }
  } catch {
    return null;
  }
}

async function renderHalftoneBuffer(input: Buffer, seed: number): Promise<Buffer> {
  const { data: srcData, info } = await sharp(input)
    .rotate()
    .resize({ width: TARGET_WIDTH, withoutEnlargement: false })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const rand = mulberry32(seed);

  // Warm newsprint #f4f0e6 + subtle paper fiber grain
  const out = new Uint8Array(w * h * 3);
  for (let i = 0; i < w * h; i++) {
    const p = i * 3;
    const grain = rand() < 0.14 ? (rand() > 0.5 ? -8 : 6) : 0;
    out[p] = Math.min(255, Math.max(0, 244 + grain));
    out[p + 1] = Math.min(255, Math.max(0, 240 + grain));
    out[p + 2] = Math.min(255, Math.max(0, 230 + grain));
  }

  const offsetMag = BASE_OFFSET_PX * (w / 420);
  const diag = Math.hypot(w, h);

  for (const plate of PLATES) {
    const angleJitter = (rand() - 0.5) * 7;
    const angle = ((plate.baseAngle + angleJitter) * Math.PI) / 180;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const dx = (rand() - 0.5) * 2 * offsetMag;
    const dy = (rand() - 0.5) * 2 * offsetMag;

    // Effective multiply color (blended against white by plate.alpha)
    const inkR = 255 - (255 - plate.rgb[0]) * plate.alpha;
    const inkG = 255 - (255 - plate.rgb[1]) * plate.alpha;
    const inkB = 255 - (255 - plate.rgb[2]) * plate.alpha;

    for (let gy = -diag / 2; gy < diag / 2; gy += DOT_PITCH) {
      for (let gx = -diag / 2; gx < diag / 2; gx += DOT_PITCH) {
        const cx = w / 2 + gx * cos - gy * sin + dx;
        const cy = h / 2 + gx * sin + gy * cos + dy;

        if (cx < -DOT_PITCH || cx >= w + DOT_PITCH || cy < -DOT_PITCH || cy >= h + DOT_PITCH) {
          continue;
        }

        const sx = Math.max(0, Math.min(w - 1, Math.round(cx)));
        const sy = Math.max(0, Math.min(h - 1, Math.round(cy)));
        const sIdx = (sy * w + sx) * 3;

        const cmyk = rgbToCmyk(srcData[sIdx], srcData[sIdx + 1], srcData[sIdx + 2]);
        const intensity = cmyk[plate.channel] * plate.scale;
        if (intensity <= 0.03) continue;

        const radius = Math.sqrt(intensity) * (DOT_PITCH * 0.54);
        const minX = Math.max(0, Math.floor(cx - radius - 0.5));
        const maxX = Math.min(w - 1, Math.ceil(cx + radius + 0.5));
        const minY = Math.max(0, Math.floor(cy - radius - 0.5));
        const maxY = Math.min(h - 1, Math.ceil(cy + radius + 0.5));

        for (let py = minY; py <= maxY; py++) {
          const dyPix = py - cy;
          for (let px = minX; px <= maxX; px++) {
            const dxPix = px - cx;
            const dist = Math.hypot(dxPix, dyPix);
            const cov = Math.max(0, Math.min(1, radius + 0.5 - dist));
            if (cov <= 0) continue;

            const oIdx = (py * w + px) * 3;
            const multR = 1 - cov * (1 - inkR / 255);
            const multG = 1 - cov * (1 - inkG / 255);
            const multB = 1 - cov * (1 - inkB / 255);

            out[oIdx] = Math.round(out[oIdx] * multR);
            out[oIdx + 1] = Math.round(out[oIdx + 1] * multG);
            out[oIdx + 2] = Math.round(out[oIdx + 2] * multB);
          }
        }
      }
    }
  }

  return sharp(out, { raw: { width: w, height: h, channels: 3 } })
    .webp({ quality: 84 })
    .toBuffer();
}

const inFlight = new Map<string, Promise<string | undefined>>();

/**
 * Generates (and caches on disk) a pre-rendered CMYK newsprint halftone `.webp`
 * for the given image URL/path, returning its public URL.
 */
export async function getHalftoneImage(src?: string | null): Promise<string | undefined> {
  if (!src) return undefined;

  const hash = crypto.createHash('sha1').update(`${VERSION}:${src}`).digest('hex').slice(0, 12);
  const fileName = `${hash}.webp`;
  const publicPath = path.join(HALFTONE_DIR, fileName);
  const publicUrl = withBase(`/halftones/${fileName}`);

  if (inFlight.has(hash)) {
    return inFlight.get(hash);
  }

  const task = (async () => {
    try {
      await fs.mkdir(HALFTONE_DIR, { recursive: true });

      let exists = false;
      try {
        await fs.access(publicPath);
        exists = true;
      } catch {
        exists = false;
      }

      if (!exists) {
        const input = await loadImageBuffer(src);
        if (!input) return undefined;

        const seed = parseInt(hash.slice(0, 8), 16);
        const webpBuf = await renderHalftoneBuffer(input, seed);
        await fs.writeFile(publicPath, webpBuf);
      }

      // During `astro build`, also mirror to dist/halftones if dist/ already exists
      if (import.meta.env.PROD) {
        try {
          await fs.mkdir(DIST_HALFTONE_DIR, { recursive: true });
          await fs.copyFile(publicPath, path.join(DIST_HALFTONE_DIR, fileName));
        } catch {
          // dist/ may not exist yet; Astro will copy public/halftones automatically
        }
      }

      return publicUrl;
    } catch {
      return undefined;
    }
  })();

  inFlight.set(hash, task);
  return task;
}
