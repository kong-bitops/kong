import { ipcMain } from "electron";
import type Database from "better-sqlite3";
import type { Shoe, ShoeFilter } from "../../src/types/shoe";
import { reseedDatabase } from "../../src/db/seed";

export function registerShoesIpc(db: Database.Database): void {
  ipcMain.handle("shoes:getAll", (_event, filter: ShoeFilter = {}) => {
    let sql = "SELECT * FROM shoes WHERE 1=1";
    const params: Record<string, unknown> = {};

    if (filter.search) {
      sql += " AND LOWER(name) LIKE LOWER(@search)";
      params.search = `%${filter.search.trim()}%`;
    }

    if (filter.brand && filter.brand !== "any") {
      sql += " AND brand = @brand";
      params.brand = filter.brand;
    }

    if (filter.era && filter.era !== "any") {
      sql += " AND era = @era";
      params.era = filter.era;
    }

    if (filter.positionTag && filter.positionTag !== "any") {
      sql += " AND positionTag = @positionTag";
      params.positionTag = filter.positionTag;
    }

    if (typeof filter.maxPrice === "number" && Number.isFinite(filter.maxPrice)) {
      sql += " AND priceKRW <= @maxPrice";
      params.maxPrice = filter.maxPrice;
    }

    sql += " ORDER BY era ASC, traction DESC, priceKRW ASC";

    return db.prepare(sql).all(params) as Shoe[];
  });

  ipcMain.handle("shoes:getByIds", (_event, ids: number[]) => {
    if (!Array.isArray(ids) || ids.length === 0) return [];
    const placeholders = ids.map((_, index) => `@id${index}`).join(", ");
    const params = ids.reduce<Record<string, number>>((acc, id, index) => {
      acc[`id${index}`] = id;
      return acc;
    }, {});

    const sql = `SELECT * FROM shoes WHERE id IN (${placeholders})`;
    return db.prepare(sql).all(params) as Shoe[];
  });

  ipcMain.handle("data:resetSeed", () => {
    reseedDatabase(db);
  });
}
