import { contextBridge, ipcRenderer } from "electron";
import type { RecommendationResult } from "../src/types/recommendation";
import type { UserProfile } from "../src/types/profile";
import type { ShoeFilter } from "../src/types/shoe";

contextBridge.exposeInMainWorld("hoopsole", {
  getShoes: (filter?: ShoeFilter) => ipcRenderer.invoke("shoes:getAll", filter),
  getShoesByIds: (ids: number[]) => ipcRenderer.invoke("shoes:getByIds", ids),
  toggleFavorite: (shoeId: number) => ipcRenderer.invoke("favorites:toggle", shoeId),
  getFavoriteShoes: () => ipcRenderer.invoke("favorites:getAll"),
  getRecommendations: (profile: UserProfile) => ipcRenderer.invoke("recommendations:get", profile),
  saveRecommendationLog: (profile: UserProfile, results: RecommendationResult[]) =>
    ipcRenderer.invoke("recommendations:saveLog", profile, results),
  getRecommendationLogs: () => ipcRenderer.invoke("recommendations:getLogs"),
  resetSeedData: () => ipcRenderer.invoke("data:resetSeed"),
  saveCsv: (defaultFileName: string, content: string) =>
    ipcRenderer.invoke("files:saveCsv", defaultFileName, content),
  savePng: (defaultFileName: string, dataUrl: string) =>
    ipcRenderer.invoke("files:savePng", defaultFileName, dataUrl)
});
