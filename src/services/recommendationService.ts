import type { UserProfile } from "../types/profile";
import type { RecommendationResult } from "../types/recommendation";
import type { Shoe } from "../types/shoe";
import { buildRecommendationReason, calculateShoeScore } from "../utils/score";

function withScore(shoe: Shoe, profile: UserProfile): RecommendationResult {
  return {
    shoeId: shoe.id,
    totalScore: calculateShoeScore(shoe, profile),
    reason: buildRecommendationReason(shoe, profile),
    category: "overall_best",
    shoe
  };
}

function sortResults(results: RecommendationResult[]): RecommendationResult[] {
  return results.sort((a, b) => b.totalScore - a.totalScore);
}

export function calculateRecommendations(shoes: Shoe[], profile: UserProfile): RecommendationResult[] {
  const scored = sortResults(shoes.map((shoe) => withScore(shoe, profile)));
  const topOverall = scored.slice(0, 5);

  const topModern = scored.find((item) => item.shoe?.era === "modern");
  const topRetro = scored.find((item) => item.shoe?.era === "retro");
  const topBudget = scored.find((item) => (item.shoe?.priceKRW ?? 0) <= profile.budgetKRW);

  if (topOverall[0]) topOverall[0].category = "overall_best";
  if (topModern) topModern.category = "modern_best";
  if (topRetro) topRetro.category = "retro_best";
  if (topBudget) topBudget.category = "budget_best";

  return topOverall;
}
