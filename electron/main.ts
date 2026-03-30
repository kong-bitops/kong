import { app, BrowserWindow } from "electron";
import log from "electron-log";
import path from "node:path";
import { initDatabase } from "../src/db/database";
import { registerFavoritesIpc } from "./ipc/favorites";
import { registerFileIpc } from "./ipc/files";
import { registerRecommendationIpc } from "./ipc/recommendations";
import { registerShoesIpc } from "./ipc/shoes";

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1320,
    height: 860,
    minWidth: 1100,
    minHeight: 700,
    title: "HoopSole Compare",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const devServerUrl = process.env.VITE_DEV_SERVER_URL;
  if (devServerUrl) {
    mainWindow.loadURL(devServerUrl).catch((error) => {
      log.error("Failed to load dev server", error);
    });
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    mainWindow.loadFile(path.join(__dirname, "../../dist/index.html")).catch((error) => {
      log.error("Failed to load renderer build", error);
    });
  }
}

app.whenReady().then(() => {
  const dbPath = path.join(app.getPath("userData"), "hoopsole", "hoopsole.db");
  const db = initDatabase(dbPath);

  registerShoesIpc(db);
  registerFavoritesIpc(db);
  registerRecommendationIpc(db);
  registerFileIpc();

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
