import type { RecommendationLog, RecommendationResult } from "./recommendation";
import type { UserProfile } from "./profile";
import type { Shoe, ShoeFilter } from "./shoe";

export interface HoopsoleApi {
  getShoes: (filter?: ShoeFilter) => Promise<Shoe[]>;
  getShoesByIds: (ids: number[]) => Promise<Shoe[]>;
  toggleFavorite: (shoeId: number) => Promise<{ favorite: boolean }>;
  getFavoriteShoes: () => Promise<Shoe[]>;
  getRecommendations: (profile: UserProfile) => Promise<RecommendationResult[]>;
  saveRecommendationLog: (profile: UserProfile, results: RecommendationResult[]) => Promise<void>;
  getRecommendationLogs: () => Promise<RecommendationLog[]>;
  resetSeedData: () => Promise<void>;
  saveCsv: (defaultFileName: string, content: string) => Promise<{ ok: boolean; path?: string; error?: string }>;
  savePng: (defaultFileName: string, dataUrl: string) => Promise<{ ok: boolean; path?: string; error?: string }>;
}

declare global {
  interface Window {
    hoopsole: HoopsoleApi;
  }
}

export {};
