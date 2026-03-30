import type { FootWidth, PositionTag } from "./shoe";

export type PlayStyle = "fast" | "balanced" | "power" | "shooting" | "defense";

export interface UserProfile {
  position: PositionTag;
  playStyle: PlayStyle;
  budgetKRW: number;
  indoorRatio: number;
  outdoorRatio: number;
  footWidth: FootWidth;
  priorityTraction: number;
  priorityCushioning: number;
  prioritySupport: number;
  priorityWeight: number;
  wantsRetroLook: boolean;
}

export const defaultUserProfile: UserProfile = {
  position: "guard",
  playStyle: "fast",
  budgetKRW: 200000,
  indoorRatio: 80,
  outdoorRatio: 20,
  footWidth: "narrow",
  priorityTraction: 5,
  priorityCushioning: 3,
  prioritySupport: 3,
  priorityWeight: 4,
  wantsRetroLook: false
};
