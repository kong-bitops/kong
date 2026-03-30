import type { Shoe } from "../types/shoe";

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function getShoeImageUrl(shoe: Shoe): string {
  if (shoe.imageUrl && shoe.imageUrl.trim().length > 0) {
    return shoe.imageUrl;
  }

  // Deterministic public image source to reduce random missing images.
  const lock = hashString(`${shoe.brand}-${shoe.name}`) % 100000;
  return `https://loremflickr.com/900/600/basketball-shoes,sneakers?lock=${lock}`;
}

export function getShoeFallbackImage(name: string): string {
  const text = encodeURIComponent(name);
  return `https://placehold.co/800x500/e5e7eb/111827?text=${text}`;
}
