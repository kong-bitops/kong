import { useAppState } from "../app/state";
import { labelEra, labelPosition } from "../i18n/messages";
import type { Shoe } from "../types/shoe";
import { getShoeFallbackImage, getShoeImageUrl } from "../utils/shoeImage";

function badgeColor(era: Shoe["era"]) {
  return era === "modern" ? "bg-court-600 text-white" : "bg-amber-700 text-white";
}

interface ShoeCardProps {
  shoe: Shoe;
  isCompareSelected?: boolean;
  onToggleCompare?: (shoeId: number) => void;
  onToggleFavorite?: (shoeId: number) => void;
}

export function ShoeCard({
  shoe,
  isCompareSelected = false,
  onToggleCompare,
  onToggleFavorite
}: ShoeCardProps) {
  const { language, t } = useAppState();

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <img
        src={getShoeImageUrl(shoe)}
        alt={shoe.name}
        className="h-44 w-full object-cover"
        loading="lazy"
        onError={(event) => {
          event.currentTarget.src = getShoeFallbackImage(shoe.name);
        }}
      />

      <div className="p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className={`rounded-full px-2 py-1 text-xs font-semibold ${badgeColor(shoe.era)}`}>
            {labelEra(language, shoe.era)}
          </span>
          <span className="text-xs text-slate-500">{shoe.releaseYear}</span>
        </div>

        <h3 className="text-lg font-semibold text-slate-900">{shoe.name}</h3>
        <p className="mt-1 text-sm text-slate-600">
          {shoe.brand} · {labelPosition(language, shoe.positionTag)}
        </p>
        <p className="mt-3 line-clamp-2 text-sm text-slate-700">{shoe.summary}</p>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="rounded bg-court-50 px-2 py-1 text-court-800">
            {t("card.traction")} {shoe.traction}
          </div>
          <div className="rounded bg-court-50 px-2 py-1 text-court-800">
            {t("card.cushion")} {shoe.cushioning}
          </div>
          <div className="rounded bg-court-50 px-2 py-1 text-court-800">
            {t("card.support")} {shoe.support}
          </div>
          <div className="rounded bg-court-50 px-2 py-1 text-court-800">
            {t("card.weight")} {shoe.weightScore}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-base font-bold text-accent-600">{shoe.priceKRW.toLocaleString()} KRW</p>
          <div className="flex gap-2">
            {onToggleFavorite ? (
              <button
                type="button"
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs hover:bg-slate-100"
                onClick={() => onToggleFavorite(shoe.id)}
              >
                {t("card.favorite")}
              </button>
            ) : null}
            {onToggleCompare ? (
              <button
                type="button"
                className={[
                  "rounded-lg px-3 py-1.5 text-xs font-medium",
                  isCompareSelected
                    ? "bg-court-700 text-white"
                    : "border border-court-300 bg-white text-court-800 hover:bg-court-50"
                ].join(" ")}
                onClick={() => onToggleCompare(shoe.id)}
              >
                {isCompareSelected ? t("card.selected") : t("card.compare")}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
