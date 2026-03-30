import { createContext, useContext } from "react";
import type { Language } from "../i18n/messages";
import type { UserProfile } from "../types/profile";

type AppState = {
  profile: UserProfile;
  setProfile: (next: UserProfile) => void;
  compareIds: number[];
  setCompareIds: (ids: number[]) => void;
  toggleCompareId: (id: number) => void;
  language: Language;
  setLanguage: (next: Language) => void;
  t: (key: string) => string;
};

export const AppStateContext = createContext<AppState | null>(null);

export function useAppState(): AppState {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used inside AppStateContext.Provider");
  }
  return context;
}
