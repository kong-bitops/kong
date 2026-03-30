import { ProfileForm } from "../components/ProfileForm";
import { useAppState } from "../app/state";

export function ProfilePage() {
  const { profile, setProfile, t } = useAppState();

  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-2xl font-bold text-slate-900">{t("profile.title")}</h2>
        <p className="text-sm text-slate-600">{t("profile.description")}</p>
      </header>

      <ProfileForm
        initialValue={profile}
        onSubmit={(next) => {
          setProfile(next);
        }}
      />
    </section>
  );
}
