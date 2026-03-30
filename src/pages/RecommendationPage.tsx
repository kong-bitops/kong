import { useState } from "react";
import { useAppState } from "../app/state";
import { RecommendationCard } from "../components/RecommendationCard";
import type { RecommendationResult } from "../types/recommendation";
import { recommendationToCsvRows, toCsv } from "../utils/exportCsv";

export function RecommendationPage() {
  const { profile, t } = useAppState();
  const [results, setResults] = useState<RecommendationResult[]>([]);
  const [loading, setLoading] = useState(false);

  const runRecommendation = async () => {
    setLoading(true);
    try {
      const next = await window.hoopsole.getRecommendations(profile);
      setResults(next);
      await window.hoopsole.saveRecommendationLog(profile, next);
    } finally {
      setLoading(false);
    }
  };

  const exportCsv = async () => {
    if (results.length === 0) return;
    const rows = recommendationToCsvRows(results);
    await window.hoopsole.saveCsv("hoopsole-recommendations.csv", toCsv(rows));
  };

  const grouped = {
    modern: results.find((item) => item.category === "modern_best"),
    retro: results.find((item) => item.category === "retro_best"),
    budget: results.find((item) => item.category === "budget_best")
  };

  return (
    <section className="space-y-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{t("recommend.title")}</h2>
          <p className="text-sm text-slate-600">{t("recommend.description")}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={runRecommendation}
            className="rounded-lg bg-court-700 px-4 py-2 text-sm font-semibold text-white hover:bg-court-800"
          >
            {loading ? t("recommend.running") : t("recommend.run")}
          </button>
          <button
            type="button"
            onClick={exportCsv}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100"
          >
            {t("recommend.export")}
          </button>
        </div>
      </header>

      {results.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-3">
          {grouped.modern ? <RecommendationCard item={grouped.modern} /> : null}
          {grouped.retro ? <RecommendationCard item={grouped.retro} /> : null}
          {grouped.budget ? <RecommendationCard item={grouped.budget} /> : null}
        </div>
      ) : (
        <p className="text-sm text-slate-600">{t("recommend.empty")}</p>
      )}

      {results.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">{t("recommend.top5")}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {results.map((item) => (
              <RecommendationCard key={`${item.shoeId}-${item.category}`} item={item} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
