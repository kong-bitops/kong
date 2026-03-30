import type { Shoe } from "./shoe";

export type RecommendationCategory =
  | "modern_best"
  | "retro_best"
  | "budget_best"
  | "overall_best";

export interface RecommendationResult {
  shoeId: number;
  totalScore: number;
  reason: string[];
  category: RecommendationCategory;
  shoe?: Shoe;
}

export interface RecommendationLog {
  id: number;
  profileJson: string;
  resultJson: string;
  createdAt: string;
}
