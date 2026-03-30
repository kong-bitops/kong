import type { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import type { Language } from "../../i18n/messages";
import { useAppState } from "../state";

const links = [
  { to: "/", key: "nav.home" },
  { to: "/explorer", key: "nav.explorer" },
  { to: "/compare", key: "nav.compare" },
  { to: "/profile", key: "nav.profile" },
  { to: "/recommendations", key: "nav.recommendations" },
  { to: "/favorites", key: "nav.favorites" },
  { to: "/settings", key: "nav.settings" }
];

export function AppLayout({ children }: PropsWithChildren) {
  const { language, setLanguage, t } = useAppState();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-court-100 via-white to-orange-50">
      <aside className="w-64 border-r border-court-200 bg-white/90 p-5 backdrop-blur-sm">
        <h1 className="mb-1 text-2xl font-bold text-court-800">HoopSole</h1>
        <p className="mb-4 text-sm text-slate-600">{t("brand.subtitle")}</p>
        <label className="mb-5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
          {t("language.label")}
          <select
            className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm normal-case"
            value={language}
            onChange={(event) => setLanguage(event.target.value as Language)}
          >
            <option value="ko">{t("language.ko")}</option>
            <option value="en">{t("language.en")}</option>
          </select>
        </label>
        <nav className="space-y-2">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "block rounded-lg px-3 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-court-600 text-white shadow"
                    : "text-slate-700 hover:bg-court-100 hover:text-court-800"
                ].join(" ")
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
