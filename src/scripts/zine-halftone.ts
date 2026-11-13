/**
 * CMYK Newsprint Halftone Renderer for `.zine-media` containers.
 * Renders 4-color CMYK angled dot screens on warm newsprint (#f4f0e6) with
 * per-image randomized plate offsets (~10px) and slight angle variance.
 */

interface PlateConfig {
  baseAngle: number;
  color: string;
  extract: (r: number, g: number, b: number) => number;
}

const PAPER_COLOR = '#f4f0e6';
const DOT_PITCH = 3; // ~3px halftone dot pitch
const BASE_OFFSET_PX = 10; // ~10px max plate registration offset

function rgbToCmyk(r: number, g: number, b: number): [number, number, number, number] {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const k = 1 - Math.max(rn, gn, bn);
  if (k >= 0.999) return [0, 0, 0, 1];
  const c = (1 - rn - k) / (1 - k);
  const m = (1 - gn - k) / (1 - k);
  const y = (1 - bn - k) / (1 - k);
  return [c, m, y, k];
}

const CMYK_PLATES: PlateConfig[] = [
  {
    baseAngle: 15,
    color: 'rgba(0, 165, 225, 0.86)',
    extract: (r, g, b) => rgbToCmyk(r, g, b)[0],
  },
  {
    baseAngle: 75,
    color: 'rgba(225, 10, 130, 0.86)',
    extract: (r, g, b) => rgbToCmyk(r, g, b)[1],
  },
  {
    baseAngle: 0,
    color: 'rgba(245, 220, 20, 0.85)',
    extract: (r, g, b) => rgbToCmyk(r, g, b)[2],
  },
  {
    baseAngle: 45,
    color: 'rgba(30, 28, 25, 0.82)',
    extract: (r, g, b) => rgbToCmyk(r, g, b)[3] * 0.82,
  },
];

function drawNewsprintHalftone(
  canvas: HTMLCanvasElement,
  sourceImg: HTMLImageElement,
  targetW: number,
  targetH: number
) {
  const w = Math.max(240, Math.min(640, Math.round(targetW)));
  const h = Math.max(160, Math.round((targetH / Math.max(1, targetW)) * w));

  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Draw cover-cropped source image onto an offscreen canvas to sample pixels
  const off = document.createElement('canvas');
  off.width = w;
  off.height = h;
  const offCtx = off.getContext('2d');
  if (!offCtx) return;

  const imgRatio = sourceImg.naturalWidth / Math.max(1, sourceImg.naturalHeight);
  const boxRatio = w / h;
  let drawW = w;
  let drawH = h;
  let drawX = 0;
  let drawY = 0;

  if (imgRatio > boxRatio) {
    drawH = h;
    drawW = h * imgRatio;
    drawX = (w - drawW) / 2;
  } else {
    drawW = w;
    drawH = w / imgRatio;
    drawY = (h - drawH) / 2;
  }

  offCtx.drawImage(sourceImg, drawX, drawY, drawW, drawH);

  let pixels: Uint8ClampedArray;
  try {
    pixels = offCtx.getImageData(0, 0, w, h).data;
  } catch {
    // Tainted canvas fallback: remove overlay so crisp <img> shows cleanly
    canvas.remove();
    return;
  }

  // Warm newsprint paper base
  ctx.fillStyle = PAPER_COLOR;
  ctx.fillRect(0, 0, w, h);

  // Subtle paper fiber grain
  const grainCount = Math.floor(w * h * 0.14);
  for (let i = 0; i < grainCount; i++) {
    const gx = Math.random() * w;
    const gy = Math.random() * h;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(60, 45, 25, 0.06)' : 'rgba(255, 255, 255, 0.25)';
    ctx.fillRect(gx, gy, 1.5, 1.5);
  }

  const offsetMag = BASE_OFFSET_PX * (w / 420);

  ctx.save();
  ctx.globalCompositeOperation = 'multiply';

  for (const plate of CMYK_PLATES) {
    // Slight per-image random angle variance (±3.5 deg) and registration offset
    const angleJitter = (Math.random() - 0.5) * 7;
    const angle = ((plate.baseAngle + angleJitter) * Math.PI) / 180;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const dx = (Math.random() - 0.5) * 2 * offsetMag;
    const dy = (Math.random() - 0.5) * 2 * offsetMag;

    ctx.fillStyle = plate.color;

    const diag = Math.hypot(w, h);
    for (let gy = -diag / 2; gy < diag / 2; gy += DOT_PITCH) {
      for (let gx = -diag / 2; gx < diag / 2; gx += DOT_PITCH) {
        const x = w / 2 + gx * cos - gy * sin + dx;
        const y = h / 2 + gx * sin + gy * cos + dy;

        if (x < -DOT_PITCH || x >= w + DOT_PITCH || y < -DOT_PITCH || y >= h + DOT_PITCH) {
          continue;
        }

        const sx = Math.max(0, Math.min(w - 1, Math.round(x)));
        const sy = Math.max(0, Math.min(h - 1, Math.round(y)));
        const idx = (sy * w + sx) * 4;

        const r = pixels[idx];
        const g = pixels[idx + 1];
        const b = pixels[idx + 2];

        const intensity = plate.extract(r, g, b);
        if (intensity <= 0.03) continue;

        const radius = Math.sqrt(intensity) * (DOT_PITCH * 0.54);
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  ctx.restore();
  canvas.dataset.rendered = 'true';
}

function processZineMedia(container: HTMLElement) {
  if (container.dataset.zineInit === 'true') return;
  const img = container.querySelector<HTMLImageElement>('img.zine-img');
  if (!img) return;

  const src = img.currentSrc || img.getAttribute('src');
  if (!src) return;

  container.dataset.zineInit = 'true';

  let canvas = container.querySelector<HTMLCanvasElement>('canvas.zine-halftone-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.className = 'zine-halftone-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    container.appendChild(canvas);
  }

  const probe = new Image();
  if (/^https?:\/\//i.test(src) && !src.startsWith(window.location.origin)) {
    probe.crossOrigin = 'anonymous';
  }

  const renderWhenReady = () => {
    const rect = container.getBoundingClientRect();
    const targetW = rect.width || img.clientWidth || 420;
    const targetH = rect.height || img.clientHeight || Math.round(targetW * 0.65);
    if (probe.naturalWidth > 0) {
      drawNewsprintHalftone(canvas!, probe, targetW, targetH);
    }
  };

  probe.onload = () => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(renderWhenReady, { timeout: 250 });
    } else {
      requestAnimationFrame(renderWhenReady);
    }
  };

  probe.onerror = () => {
    canvas?.remove();
  };

  probe.src = src;
}

export function initZineHalftones() {
  const containers = document.querySelectorAll<HTMLElement>('.zine-media');
  containers.forEach(processZineMedia);
}

document.addEventListener('astro:page-load', initZineHalftones);
if (document.readyState !== 'loading') {
  initZineHalftones();
}
