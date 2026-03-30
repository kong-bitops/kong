import type { UserProfile } from "../types/profile";
import type { Shoe } from "../types/shoe";

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function calculateShoeScore(shoe: Shoe, profile: UserProfile): number {
  const safeOutdoorRatio = clamp(profile.outdoorRatio, 0, 100);

  let score = 0;
  score += shoe.traction * profile.priorityTraction;
  score += shoe.cushioning * profile.priorityCushioning;
  score += shoe.support * profile.prioritySupport;
  score += shoe.weightScore * profile.priorityWeight;

  if (shoe.priceKRW <= profile.budgetKRW) {
    score += 8;
  } else {
    score -= 10;
  }

  if (shoe.footWidthFit === profile.footWidth) {
    score += 6;
  }

  if (profile.wantsRetroLook && shoe.era === "retro") {
    score += 7;
  }

  if (profile.position === "guard") {
    score += shoe.traction * 0.8 + shoe.weightScore * 0.8;
  } else if (profile.position === "center") {
    score += shoe.cushioning * 0.8 + shoe.stability * 0.8;
  } else if (profile.position === "forward") {
    score += shoe.support * 0.6 + shoe.stability * 0.6;
  }

  if (profile.playStyle === "fast") {
    score += shoe.weightScore * 0.6;
  } else if (profile.playStyle === "power") {
    score += shoe.support * 0.7 + shoe.stability * 0.4;
  } else if (profile.playStyle === "shooting") {
    score += shoe.traction * 0.5 + shoe.stability * 0.5;
  } else if (profile.playStyle === "defense") {
    score += shoe.support * 0.6 + shoe.outdoorDurability * 0.3;
  }

  score += shoe.outdoorDurability * (safeOutdoorRatio / 100);

  return Number(score.toFixed(2));
}

export function buildRecommendationReason(shoe: Shoe, profile: UserProfile): string[] {
  const reasons: string[] = [];

  if (shoe.traction >= 8) reasons.push("Traction score is strong for quick stops and cuts.");
  if (shoe.cushioning >= 8) reasons.push("Cushioning score is high for impact comfort.");
  if (shoe.support >= 8 || shoe.stability >= 8) reasons.push("Support and stability profile is reliable.");
  if (shoe.weightScore >= 8) reasons.push("Weight profile is light and agile.");
  if (shoe.priceKRW <= profile.budgetKRW) reasons.push("Fits within your budget range.");
  if (shoe.footWidthFit === profile.footWidth) reasons.push("Foot width match is favorable.");
  if (profile.wantsRetroLook && shoe.era === "retro") reasons.push("Matches your retro style preference.");
  if (profile.outdoorRatio >= 50 && shoe.outdoorDurability >= 8) reasons.push("Durability is suitable for outdoor-heavy play.");

  if (profile.position === "guard" && shoe.traction >= 8) {
    reasons.push("Guard profile bonus from high traction and mobility.");
  }

  if (profile.position === "center" && shoe.cushioning >= 8) {
    reasons.push("Center profile bonus from cushioning and stability.");
  }

  if (reasons.length === 0) {
    reasons.push("Balanced match across your selected priorities.");
  }

  return reasons.slice(0, 4);
}
