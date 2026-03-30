export type ShoeEra = "modern" | "retro";
export type PositionTag = "guard" | "forward" | "center" | "all";
export type FootWidth = "narrow" | "regular" | "wide";

export interface Shoe {
  id: number;
  name: string;
  brand: string;
  era: ShoeEra;
  releaseYear: number;
  priceKRW: number;
  positionTag: PositionTag;
  traction: number;
  cushioning: number;
  support: number;
  stability: number;
  weightScore: number;
  breathability: number;
  outdoorDurability: number;
  retroStyleScore: number;
  footWidthFit: FootWidth;
  summary: string;
  imageUrl?: string;
}

export interface ShoeFilter {
  search?: string;
  brand?: string;
  era?: ShoeEra | "any";
  positionTag?: PositionTag | "any";
  maxPrice?: number;
}
