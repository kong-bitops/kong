import { Navigate, Route, Routes } from "react-router-dom";
import { ComparePage } from "../pages/ComparePage";
import { FavoritesPage } from "../pages/FavoritesPage";
import { HomePage } from "../pages/HomePage";
import { ProfilePage } from "../pages/ProfilePage";
import { RecommendationPage } from "../pages/RecommendationPage";
import { SettingsPage } from "../pages/SettingsPage";
import { ShoeExplorerPage } from "../pages/ShoeExplorerPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/explorer" element={<ShoeExplorerPage />} />
      <Route path="/compare" element={<ComparePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/recommendations" element={<RecommendationPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
