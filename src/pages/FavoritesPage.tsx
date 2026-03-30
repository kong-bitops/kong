import { useEffect, useState } from "react";
import { useAppState } from "../app/state";
import { ShoeCard } from "../components/ShoeCard";
import type { RecommendationLog } from "../types/recommendation";
import type { Shoe } from "../types/shoe";
import { formatDateTime } from "../utils/format";

export function FavoritesPage() {
  const [favorites, setFavorites] = useState<Shoe[]>([]);
  const [logs, setLogs] = useState<RecommendationLog[]>([]);
  const { t } = useAppState();

  const load = async () => {
    const [favoriteShoes, recommendationLogs] = await Promise.all([
      window.hoopsole.getFavoriteShoes(),
      window.hoopsole.getRecommendationLogs()
    ]);
    setFavorites(favoriteShoes);
    setLogs(recommendationLogs);
  };

  useEffect(() => {
    load();
  }, []);

  const onToggleFavorite = async (shoeId: number) => {
    await window.hoopsole.toggleFavorite(shoeId);
    await load();
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{t("favorites.title")}</h2>
        <p className="text-sm text-slate-600">{t("favorites.description")}</p>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">{t("favorites.savedShoes")}</h3>
        {favorites.length === 0 ? (
          <p className="text-sm text-slate-600">{t("favorites.noShoes")}</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {favorites.map((shoe) => (
              <ShoeCard key={shoe.id} shoe={shoe} onToggleFavorite={onToggleFavorite} />
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">{t("favorites.logs")}</h3>
        {logs.length === 0 ? (
          <p className="text-sm text-slate-600">{t("favorites.noLogs")}</p>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <ul className="space-y-2 text-sm">
              {logs.map((log) => (
                <li key={log.id} className="rounded-lg border border-slate-100 p-3">
                  <p className="font-medium text-slate-800">{t("favorites.session")} #{log.id}</p>
                  <p className="text-slate-600">{formatDateTime(log.createdAt)}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
