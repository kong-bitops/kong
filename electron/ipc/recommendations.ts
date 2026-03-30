import { ipcMain } from "electron";
import type Database from "better-sqlite3";
import { calculateRecommendations } from "../../src/services/recommendationService";
import type { UserProfile } from "../../src/types/profile";
import type { RecommendationLog, RecommendationResult } from "../../src/types/recommendation";
import type { Shoe } from "../../src/types/shoe";

export function registerRecommendationIpc(db: Database.Database): void {
  ipcMain.handle("recommendations:get", (_event, profile: UserProfile) => {
    const shoes = db.prepare("SELECT * FROM shoes").all() as Shoe[];
    return calculateRecommendations(shoes, profile);
  });

  ipcMain.handle("recommendations:saveLog", (_event, profile: UserProfile, results: RecommendationResult[]) => {
    db.prepare(
      "INSERT INTO recommendation_logs (profileJson, resultJson, createdAt) VALUES (?, ?, ?)"
    ).run(JSON.stringify(profile), JSON.stringify(results), new Date().toISOString());
  });

  ipcMain.handle("recommendations:getLogs", () => {
    const logs = db
      .prepare("SELECT id, profileJson, resultJson, createdAt FROM recommendation_logs ORDER BY createdAt DESC LIMIT 20")
      .all() as RecommendationLog[];
    return logs;
  });
}
