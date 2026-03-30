import { Link } from "react-router-dom";
import { useAppState } from "../app/state";
import { labelFootWidth, labelPlayStyle, labelPosition } from "../i18n/messages";

export function HomePage() {
  const { profile, compareIds, t, language } = useAppState();

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-court-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-court-700">{t("home.badge")}</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">{t("home.title")}</h2>
        <p className="mt-3 max-w-3xl text-slate-700">{t("home.description")}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/explorer" className="rounded-lg bg-court-700 px-4 py-2 font-semibold text-white hover:bg-court-800">
            {t("home.explore")}
          </Link>
          <Link to="/profile" className="rounded-lg border border-court-300 px-4 py-2 font-semibold text-court-800 hover:bg-court-50">
            {t("home.editProfile")}
          </Link>
          <Link to="/recommendations" className="rounded-lg border border-court-300 px-4 py-2 font-semibold text-court-800 hover:bg-court-50">
            {t("home.runRecommendation")}
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-base font-semibold text-slate-900">{t("home.snapshot")}</h3>
          <ul className="mt-3 space-y-1 text-sm text-slate-700">
            <li>{t("home.position")}: {labelPosition(language, profile.position)}</li>
            <li>{t("home.playStyle")}: {labelPlayStyle(language, profile.playStyle)}</li>
            <li>{t("home.budget")}: {profile.budgetKRW.toLocaleString()} KRW</li>
            <li>{t("home.indoorOutdoor")}: {profile.indoorRatio}% / {profile.outdoorRatio}%</li>
            <li>{t("home.footWidth")}: {labelFootWidth(language, profile.footWidth)}</li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-base font-semibold text-slate-900">{t("home.quickProgress")}</h3>
          <ul className="mt-3 space-y-1 text-sm text-slate-700">
            <li>{t("home.compareCount")}: {compareIds.length} / 3</li>
            <li>{t("home.scoreCategories")}: 8</li>
            <li>{t("home.sqlite")}: {t("home.sqliteEnabled")}</li>
            <li>{t("home.exportTools")}: {t("home.exportReady")}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
