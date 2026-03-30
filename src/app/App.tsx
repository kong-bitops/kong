import { useMemo, useState } from "react";
import { AppLayout } from "./layout/AppLayout";
import { AppStateContext } from "./state";
import { AppRoutes } from "./routes";
import { defaultUserProfile, type UserProfile } from "../types/profile";
import { t as translate, type Language } from "../i18n/messages";

const PROFILE_STORAGE_KEY = "hoopsole.profile";
const COMPARE_STORAGE_KEY = "hoopsole.compareIds";
const LANGUAGE_STORAGE_KEY = "hoopsole.language";

function readProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return defaultUserProfile;
    return { ...defaultUserProfile, ...JSON.parse(raw) } as UserProfile;
  } catch {
    return defaultUserProfile;
  }
}

function readCompareIds(): number[] {
  try {
    const raw = localStorage.getItem(COMPARE_STORAGE_KEY);
    if (!raw) return [];
    const values = JSON.parse(raw) as number[];
    return Array.isArray(values) ? values.slice(0, 3) : [];
  } catch {
    return [];
  }
}

function readLanguage(): Language {
  const raw = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return raw === "en" ? "en" : "ko";
}

export function App() {
  const [profile, setProfileState] = useState<UserProfile>(readProfile);
  const [compareIds, setCompareIdsState] = useState<number[]>(readCompareIds);
  const [language, setLanguageState] = useState<Language>(readLanguage);

  const setProfile = (next: UserProfile) => {
    setProfileState(next);
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(next));
  };

  const setCompareIds = (ids: number[]) => {
    const next = ids.slice(0, 3);
    setCompareIdsState(next);
    localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(next));
  };

  const toggleCompareId = (id: number) => {
    setCompareIdsState((prev) => {
      const exists = prev.includes(id);
      let next = prev;
      if (exists) {
        next = prev.filter((item) => item !== id);
      } else if (prev.length < 3) {
        next = [...prev, id];
      }
      localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
  };

  const t = (key: string) => translate(language, key);

  const contextValue = useMemo(
    () => ({ profile, setProfile, compareIds, setCompareIds, toggleCompareId, language, setLanguage, t }),
    [profile, compareIds, language]
  );

  return (
    <AppStateContext.Provider value={contextValue}>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </AppStateContext.Provider>
  );
}
