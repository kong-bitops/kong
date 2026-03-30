import { useAppState } from "../app/state";
import { labelEra, localizeReason } from "../i18n/messages";
import type { RecommendationResult } from "../types/recommendation";
import { getShoeFallbackImage, getShoeImageUrl } from "../utils/shoeImage";

interface RecommendationCardProps {
  item: RecommendationResult;
}

export function RecommendationCard({ item }: RecommendationCardProps) {
  const shoe = item.shoe;
  const { language, t } = useAppState();
  if (!shoe) return null;

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <img
        src={getShoeImageUrl(shoe)}
        alt={shoe.name}
        className="h-44 w-full object-cover"
        onError={(event) => {
          event.currentTarget.src = getShoeFallbackImage(shoe.name);
        }}
      />
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-full bg-accent-600 px-2 py-1 text-xs font-semibold text-white">
            {t(`category.${item.category}`)}
          </span>
          <span className="text-sm font-semibold text-court-700">
            {t("category.score")} {item.totalScore}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-slate-900">{shoe.name}</h3>
        <p className="text-sm text-slate-600">
          {shoe.brand} · {labelEra(language, shoe.era)} · {shoe.priceKRW.toLocaleString()} KRW
        </p>

        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {item.reason.map((reason) => (
            <li key={`${shoe.id}-${reason}`}>{localizeReason(language, reason)}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
