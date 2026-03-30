import { ipcMain } from "electron";
import type Database from "better-sqlite3";
import type { Shoe } from "../../src/types/shoe";

export function registerFavoritesIpc(db: Database.Database): void {
  ipcMain.handle("favorites:toggle", (_event, shoeId: number) => {
    const exists = db.prepare("SELECT id FROM favorites WHERE shoeId = ?").get(shoeId) as { id: number } | undefined;
    if (exists) {
      db.prepare("DELETE FROM favorites WHERE shoeId = ?").run(shoeId);
      return { favorite: false };
    }

    db.prepare("INSERT INTO favorites (shoeId, createdAt) VALUES (?, ?)").run(shoeId, new Date().toISOString());
    return { favorite: true };
  });

  ipcMain.handle("favorites:getAll", () => {
    const sql = `
      SELECT s.*
      FROM favorites f
      INNER JOIN shoes s ON s.id = f.shoeId
      ORDER BY f.createdAt DESC
    `;
    return db.prepare(sql).all() as Shoe[];
  });
}
