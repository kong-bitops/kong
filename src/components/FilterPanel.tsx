import { useAppState } from "../app/state";
import { labelPosition } from "../i18n/messages";
import type { ShoeFilter } from "../types/shoe";

interface FilterPanelProps {
  filter: ShoeFilter;
  brands: string[];
  onChange: (next: ShoeFilter) => void;
}

export function FilterPanel({ filter, brands, onChange }: FilterPanelProps) {
  const { language, t } = useAppState();

  return (
    <section className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-5">
      <input
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        placeholder={t("filter.search")}
        value={filter.search ?? ""}
        onChange={(event) => onChange({ ...filter, search: event.target.value })}
      />

      <select
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        value={filter.brand ?? "any"}
        onChange={(event) => onChange({ ...filter, brand: event.target.value })}
      >
        <option value="any">{t("filter.allBrands")}</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      <select
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        value={filter.era ?? "any"}
        onChange={(event) => onChange({ ...filter, era: event.target.value as ShoeFilter["era"] })}
      >
        <option value="any">{t("filter.allEras")}</option>
        <option value="modern">{language === "ko" ? "현대" : "Modern"}</option>
        <option value="retro">{language === "ko" ? "레트로" : "Retro"}</option>
      </select>

      <select
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        value={filter.positionTag ?? "any"}
        onChange={(event) =>
          onChange({ ...filter, positionTag: event.target.value as ShoeFilter["positionTag"] })
        }
      >
        <option value="any">{t("filter.allPositions")}</option>
        <option value="guard">{labelPosition(language, "guard")}</option>
        <option value="forward">{labelPosition(language, "forward")}</option>
        <option value="center">{labelPosition(language, "center")}</option>
        <option value="all">{labelPosition(language, "all")}</option>
      </select>

      <input
        type="number"
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        placeholder={t("filter.maxPrice")}
        value={filter.maxPrice ?? ""}
        onChange={(event) => {
          const value = Number(event.target.value);
          onChange({
            ...filter,
            maxPrice: Number.isFinite(value) && value > 0 ? value : undefined
          });
        }}
      />
    </section>
  );
}
