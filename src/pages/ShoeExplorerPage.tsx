import { useEffect, useMemo, useState } from "react";
import { useAppState } from "../app/state";
import { FilterPanel } from "../components/FilterPanel";
import { ShoeCard } from "../components/ShoeCard";
import type { Shoe, ShoeFilter } from "../types/shoe";

export function ShoeExplorerPage() {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [filter, setFilter] = useState<ShoeFilter>({ era: "any", positionTag: "any", brand: "any" });
  const [loading, setLoading] = useState(false);
  const { compareIds, toggleCompareId, t } = useAppState();

  useEffect(() => {
    setLoading(true);
    window.hoopsole
      .getShoes(filter)
      .then(setShoes)
      .finally(() => setLoading(false));
  }, [filter]);

  const brands = useMemo(() => {
    const unique = new Set(shoes.map((shoe) => shoe.brand));
    return Array.from(unique).sort();
  }, [shoes]);

  const onToggleFavorite = async (shoeId: number) => {
    await window.hoopsole.toggleFavorite(shoeId);
  };

  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-2xl font-bold text-slate-900">{t("explorer.title")}</h2>
        <p className="text-sm text-slate-600">{t("explorer.description")}</p>
      </header>

      <FilterPanel filter={filter} brands={brands} onChange={setFilter} />

      {loading ? <p className="text-sm text-slate-500">{t("explorer.loading")}</p> : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {shoes.map((shoe) => (
          <ShoeCard
            key={shoe.id}
            shoe={shoe}
            isCompareSelected={compareIds.includes(shoe.id)}
            onToggleCompare={toggleCompareId}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>

      {!loading && shoes.length === 0 ? <p className="text-sm text-slate-600">{t("explorer.empty")}</p> : null}
    </section>
  );
}
