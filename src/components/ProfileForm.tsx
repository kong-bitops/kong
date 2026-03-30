import { useState } from "react";
import { useAppState } from "../app/state";
import { labelFootWidth, labelPlayStyle, labelPosition } from "../i18n/messages";
import { defaultUserProfile, type UserProfile } from "../types/profile";

interface ProfileFormProps {
  initialValue?: UserProfile;
  onSubmit: (profile: UserProfile) => void;
}

export function ProfileForm({ initialValue = defaultUserProfile, onSubmit }: ProfileFormProps) {
  const [profile, setProfile] = useState<UserProfile>(initialValue);
  const { language, t } = useAppState();

  const update = <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <form
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-5"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(profile);
      }}
    >
      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-sm">
          {t("profile.position")}
          <select
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            value={profile.position}
            onChange={(event) => update("position", event.target.value as UserProfile["position"])}
          >
            <option value="guard">{labelPosition(language, "guard")}</option>
            <option value="forward">{labelPosition(language, "forward")}</option>
            <option value="center">{labelPosition(language, "center")}</option>
            <option value="all">{labelPosition(language, "all")}</option>
          </select>
        </label>

        <label className="text-sm">
          {t("profile.playStyle")}
          <select
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            value={profile.playStyle}
            onChange={(event) => update("playStyle", event.target.value as UserProfile["playStyle"])}
          >
            <option value="fast">{labelPlayStyle(language, "fast")}</option>
            <option value="balanced">{labelPlayStyle(language, "balanced")}</option>
            <option value="power">{labelPlayStyle(language, "power")}</option>
            <option value="shooting">{labelPlayStyle(language, "shooting")}</option>
            <option value="defense">{labelPlayStyle(language, "defense")}</option>
          </select>
        </label>

        <label className="text-sm">
          {t("profile.budget")}
          <input
            type="number"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            value={profile.budgetKRW}
            onChange={(event) => update("budgetKRW", Number(event.target.value))}
          />
        </label>

        <label className="text-sm">
          {t("profile.footWidth")}
          <select
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            value={profile.footWidth}
            onChange={(event) => update("footWidth", event.target.value as UserProfile["footWidth"])}
          >
            <option value="narrow">{labelFootWidth(language, "narrow")}</option>
            <option value="regular">{labelFootWidth(language, "regular")}</option>
            <option value="wide">{labelFootWidth(language, "wide")}</option>
          </select>
        </label>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-sm">
          {t("profile.indoorRatio")}: {profile.indoorRatio}%
          <input
            type="range"
            min={0}
            max={100}
            value={profile.indoorRatio}
            className="mt-1 w-full"
            onChange={(event) => {
              const indoor = Number(event.target.value);
              update("indoorRatio", indoor);
              update("outdoorRatio", 100 - indoor);
            }}
          />
        </label>

        <label className="text-sm">
          {t("profile.outdoorRatio")}: {profile.outdoorRatio}%
          <input type="range" min={0} max={100} value={profile.outdoorRatio} readOnly className="mt-1 w-full" />
        </label>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <label className="text-sm">
          {t("profile.priorityTraction")} ({profile.priorityTraction})
          <input
            type="range"
            min={1}
            max={5}
            value={profile.priorityTraction}
            className="mt-1 w-full"
            onChange={(event) => update("priorityTraction", Number(event.target.value))}
          />
        </label>

        <label className="text-sm">
          {t("profile.priorityCushion")} ({profile.priorityCushioning})
          <input
            type="range"
            min={1}
            max={5}
            value={profile.priorityCushioning}
            className="mt-1 w-full"
            onChange={(event) => update("priorityCushioning", Number(event.target.value))}
          />
        </label>

        <label className="text-sm">
          {t("profile.prioritySupport")} ({profile.prioritySupport})
          <input
            type="range"
            min={1}
            max={5}
            value={profile.prioritySupport}
            className="mt-1 w-full"
            onChange={(event) => update("prioritySupport", Number(event.target.value))}
          />
        </label>

        <label className="text-sm">
          {t("profile.priorityWeight")} ({profile.priorityWeight})
          <input
            type="range"
            min={1}
            max={5}
            value={profile.priorityWeight}
            className="mt-1 w-full"
            onChange={(event) => update("priorityWeight", Number(event.target.value))}
          />
        </label>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={profile.wantsRetroLook}
          onChange={(event) => update("wantsRetroLook", event.target.checked)}
        />
        {t("profile.retroPref")}
      </label>

      <button
        type="submit"
        className="rounded-lg bg-court-700 px-4 py-2 font-semibold text-white hover:bg-court-800"
      >
        {t("profile.save")}
      </button>
    </form>
  );
}
