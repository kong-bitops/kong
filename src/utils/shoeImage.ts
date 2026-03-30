import type { Shoe } from "../types/shoe";

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function toDataUri(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function buildLocalShoeSvg(title: string, subtitle: string, paletteSeed: number): string {
  const palettes = [
    ["#0f172a", "#1e293b", "#f59e0b"],
    ["#1f2937", "#374151", "#ef4444"],
    ["#0b3b5a", "#155e75", "#22c55e"],
    ["#3f1d2e", "#6d28d9", "#f97316"],
    ["#163048", "#0f766e", "#eab308"]
  ] as const;

  const colors = palettes[paletteSeed % palettes.length];
  const safeTitle = title.replace(/[<&>]/g, "");
  const safeSubtitle = subtitle.replace(/[<&>]/g, "");

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${colors[0]}"/>
      <stop offset="60%" stop-color="${colors[1]}"/>
      <stop offset="100%" stop-color="${colors[2]}"/>
    </linearGradient>
  </defs>
  <rect width="900" height="600" fill="url(#g)"/>
  <circle cx="760" cy="130" r="120" fill="rgba(255,255,255,0.12)"/>
  <circle cx="130" cy="500" r="140" fill="rgba(255,255,255,0.1)"/>
  <g fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="4">
    <path d="M120 370 C 220 250, 420 250, 520 360 C 640 490, 760 500, 840 430"/>
    <path d="M145 385 C 260 280, 420 280, 505 360"/>
  </g>
  <text x="70" y="110" fill="rgba(255,255,255,0.88)" font-family="Segoe UI, Arial, sans-serif" font-size="28">HoopSole Compare</text>
  <text x="70" y="470" fill="#ffffff" font-family="Segoe UI, Arial, sans-serif" font-size="46" font-weight="700">${safeTitle}</text>
  <text x="70" y="520" fill="rgba(255,255,255,0.9)" font-family="Segoe UI, Arial, sans-serif" font-size="24">${safeSubtitle}</text>
</svg>`;
}

export function getShoeImageUrl(shoe: Shoe): string {
  if (shoe.imageUrl && shoe.imageUrl.trim().length > 0) {
    return shoe.imageUrl;
  }

  const seed = hashString(`${shoe.brand}-${shoe.name}`);
  const subtitle = `${shoe.brand} · ${shoe.releaseYear} · ${shoe.era.toUpperCase()}`;
  return toDataUri(buildLocalShoeSvg(shoe.name, subtitle, seed));
}

export function getShoeFallbackImage(name: string): string {
  const seed = hashString(name);
  return toDataUri(buildLocalShoeSvg(name, "Image Placeholder", seed));
}
