import fs from "node:fs/promises";
import { dialog, ipcMain } from "electron";

function parseDataUrl(dataUrl: string): Buffer {
  const match = dataUrl.match(/^data:image\/png;base64,(.+)$/);
  if (!match) {
    throw new Error("Invalid PNG data URL");
  }
  return Buffer.from(match[1], "base64");
}

export function registerFileIpc(): void {
  ipcMain.handle("files:saveCsv", async (_event, defaultFileName: string, content: string) => {
    const result = await dialog.showSaveDialog({
      defaultPath: defaultFileName,
      filters: [{ name: "CSV", extensions: ["csv"] }]
    });

    if (result.canceled || !result.filePath) {
      return { ok: false, error: "Canceled" };
    }

    await fs.writeFile(result.filePath, content, "utf8");
    return { ok: true, path: result.filePath };
  });

  ipcMain.handle("files:savePng", async (_event, defaultFileName: string, dataUrl: string) => {
    const result = await dialog.showSaveDialog({
      defaultPath: defaultFileName,
      filters: [{ name: "PNG", extensions: ["png"] }]
    });

    if (result.canceled || !result.filePath) {
      return { ok: false, error: "Canceled" };
    }

    const pngBuffer = parseDataUrl(dataUrl);
    await fs.writeFile(result.filePath, pngBuffer);
    return { ok: true, path: result.filePath };
  });
}
