import { useState } from "react";
import { useAppState } from "../app/state";

export function SettingsPage() {
  const [status, setStatus] = useState<string>("");
  const { t } = useAppState();

  const resetData = async () => {
    await window.hoopsole.resetSeedData();
    setStatus(t("settings.resetDone"));
  };

  const clearProfile = () => {
    localStorage.removeItem("hoopsole.profile");
    localStorage.removeItem("hoopsole.compareIds");
    setStatus(t("settings.clearDone"));
  };

  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-2xl font-bold text-slate-900">{t("settings.title")}</h2>
        <p className="text-sm text-slate-600">{t("settings.description")}</p>
      </header>

      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-2">
        <button
          type="button"
          className="rounded-lg border border-slate-300 px-4 py-3 text-left hover:bg-slate-100"
          onClick={resetData}
        >
          <p className="font-semibold">{t("settings.reset")}</p>
          <p className="text-sm text-slate-600">{t("settings.resetDesc")}</p>
        </button>

        <button
          type="button"
          className="rounded-lg border border-slate-300 px-4 py-3 text-left hover:bg-slate-100"
          onClick={clearProfile}
        >
          <p className="font-semibold">{t("settings.clear")}</p>
          <p className="text-sm text-slate-600">{t("settings.clearDesc")}</p>
        </button>
      </div>

      {status ? <p className="text-sm font-medium text-court-700">{status}</p> : null}
    </section>
  );
}
