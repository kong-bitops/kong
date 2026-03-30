import { useEffect, useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { useAppState } from "../app/state";
import { ComparisonChart } from "../components/ComparisonChart";
import type { Shoe } from "../types/shoe";
import { toCsv } from "../utils/exportCsv";
import { getShoeFallbackImage, getShoeImageUrl } from "../utils/shoeImage";

const compareMetrics: Array<{ key: keyof Shoe; labelKey: string }> = [
  { key: "traction", labelKey: "metric.traction" },
  { key: "cushioning", labelKey: "metric.cushioning" },
  { key: "support", labelKey: "metric.support" },
  { key: "stability", labelKey: "metric.stability" },
  { key: "weightScore", labelKey: "metric.weight" },
  { key: "breathability", labelKey: "metric.breathability" },
  { key: "outdoorDurability", labelKey: "metric.outdoor" },
  { key: "retroStyleScore", labelKey: "metric.era" }
];

export function ComparePage() {
  const { compareIds, setCompareIds, t } = useAppState();
  const [allShoes, setAllShoes] = useState<Shoe[]>([]);
  const screenshotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.hoopsole.getShoes().then(setAllShoes);
  }, []);

  useEffect(() => {
    if (allShoes.length === 0) return;

    const validSet = new Set(allShoes.map((shoe) => shoe.id));
    const cleaned = compareIds.filter((id) => validSet.has(id)).slice(0, 3);
    if (cleaned.length !== compareIds.length) {
      setCompareIds(cleaned);
    }
  }, [allShoes, compareIds, setCompareIds]);

  const availableOptions = useMemo(() => allShoes, [allShoes]);
  const shoes = useMemo(
    () =>
      compareIds
        .map((id) => allShoes.find((shoe) => shoe.id === id))
        .filter((item): item is Shoe => Boolean(item)),
    [allShoes, compareIds]
  );

  const onExportCsv = async () => {
    if (shoes.length === 0) return;

    const rows = compareMetrics.map((metric) => {
      const row: Record<string, string | number> = { metric: t(metric.labelKey) };
      shoes.forEach((shoe) => {
        row[shoe.name] = Number(shoe[metric.key]);
      });
      return row;
    });

    const csv = toCsv(rows);
    await window.hoopsole.saveCsv("hoopsole-compare.csv", csv);
  };

  const onSaveScreenshot = async () => {
    if (!screenshotRef.current) return;
    const canvas = await html2canvas(screenshotRef.current, { scale: 2, backgroundColor: "#ffffff" });
    const dataUrl = canvas.toDataURL("image/png");
    await window.hoopsole.savePng("hoopsole-compare.png", dataUrl);
  };

  return (
    <section className="space-y-4">
      <header className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{t("compare.title")}</h2>
          <p className="text-sm text-slate-600">{t("compare.description")}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onExportCsv}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-100"
          >
            {t("compare.exportCsv")}
          </button>
          <button
            type="button"
            onClick={onSaveScreenshot}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-100"
          >
            {t("compare.saveScreenshot")}
          </button>
        </div>
      </header>

      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-3">
        {[0, 1, 2].map((slot) => {
          const slotValue = compareIds[slot] ?? "";
          return (
            <select
              key={slot}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              value={slotValue}
              onChange={(event) => {
                const raw = event.target.value;
                const next = [...compareIds];

                if (!raw) {
                  next.splice(slot, 1);
                } else {
                  const value = Number(raw);
                  if (Number.isFinite(value) && value > 0) {
                    next[slot] = value;
                  }
                }

                const deduped = next.filter((id, index) => next.indexOf(id) === index).slice(0, 3);
                setCompareIds(deduped);
              }}
            >
              <option value="">{t("compare.selectShoe")}</option>
              {availableOptions.map((shoe) => (
                <option key={shoe.id} value={shoe.id}>
                  {shoe.name}
                </option>
              ))}
            </select>
          );
        })}
      </div>

      {shoes.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-3">
          {shoes.map((shoe) => (
            <article key={shoe.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <img
                src={getShoeImageUrl(shoe)}
                alt={shoe.name}
                className="h-40 w-full object-cover"
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.src = getShoeFallbackImage(shoe.name);
                }}
              />
              <div className="p-3 text-sm font-semibold text-slate-800">{shoe.name}</div>
            </article>
          ))}
        </div>
      ) : null}

      <div ref={screenshotRef} className="space-y-4 rounded-xl bg-white p-2">
        {shoes.length >= 2 ? (
          <ComparisonChart shoes={shoes} />
        ) : (
          <p className="text-sm text-slate-600">{t("compare.needTwo")}</p>
        )}

        {shoes.length > 0 ? (
          <div className="overflow-auto rounded-xl border border-slate-200 bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-court-50 text-court-900">
                <tr>
                  <th className="px-3 py-2">{t("compare.metric")}</th>
                  {shoes.map((shoe) => (
                    <th key={shoe.id} className="px-3 py-2">
                      {shoe.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareMetrics.map((metric) => (
                  <tr key={metric.key} className="border-t border-slate-100">
                    <td className="px-3 py-2 font-medium text-slate-700">{t(metric.labelKey)}</td>
                    {shoes.map((shoe) => (
                      <td key={`${shoe.id}-${metric.key}`} className="px-3 py-2">
                        {Number(shoe[metric.key]).toFixed(1)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </section>
  );
}
