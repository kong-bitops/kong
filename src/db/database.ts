import path from "node:path";
import fs from "node:fs";
import Database from "better-sqlite3";
import {
  createFavoritesTableSql,
  createRecommendationLogsTableSql,
  createShoesTableSql
} from "./schema";
import { seedDatabaseIfEmpty } from "./seed";

let db: Database.Database | null = null;

export function initDatabase(dbFilePath: string): Database.Database {
  if (db) return db;

  const dir = path.dirname(dbFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  db = new Database(dbFilePath);
  db.pragma("journal_mode = WAL");

  db.exec(createShoesTableSql);
  db.exec(createFavoritesTableSql);
  db.exec(createRecommendationLogsTableSql);

  seedDatabaseIfEmpty(db);
  db.exec(`
    UPDATE shoes
    SET era = CASE
      WHEN releaseYear < 2000 THEN 'retro'
      ELSE 'modern'
    END
  `);

  return db;
}

export function getDatabase(): Database.Database {
  if (!db) {
    throw new Error("Database is not initialized");
  }
  return db;
}
