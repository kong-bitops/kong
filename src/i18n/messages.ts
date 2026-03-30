import type { FootWidth, PositionTag, ShoeEra } from "../types/shoe";
import type { PlayStyle } from "../types/profile";

export type Language = "en" | "ko";

const messages: Record<Language, Record<string, string>> = {
  en: {
    "brand.subtitle": "Modern vs Retro Utility",
    "language.label": "Language",
    "language.ko": "Korean",
    "language.en": "English",

    "nav.home": "Home",
    "nav.explorer": "Shoe Explorer",
    "nav.compare": "Compare",
    "nav.profile": "Profile Setup",
    "nav.recommendations": "Recommendations",
    "nav.favorites": "Favorites",
    "nav.settings": "Settings",

    "home.badge": "Windows Utility",
    "home.title": "HoopSole Compare",
    "home.description": "Era-based basketball shoe analysis utility. Compare modern performance models against retro classics, then get explainable recommendations based on your playing profile.",
    "home.explore": "Explore Shoes",
    "home.editProfile": "Edit Profile",
    "home.runRecommendation": "Run Recommendation",
    "home.snapshot": "Current Profile Snapshot",
    "home.position": "Position",
    "home.playStyle": "Play style",
    "home.budget": "Budget",
    "home.indoorOutdoor": "Indoor/Outdoor",
    "home.footWidth": "Foot width",
    "home.quickProgress": "Quick Progress",
    "home.compareCount": "Selected compare shoes",
    "home.scoreCategories": "Explainable score categories",
    "home.sqlite": "Local persistence",
    "home.sqliteEnabled": "SQLite enabled",
    "home.exportTools": "Export tools",
    "home.exportReady": "CSV and PNG ready",

    "explorer.title": "Shoe Explorer",
    "explorer.description": "Browse modern and retro models with performance filters.",
    "explorer.loading": "Loading shoes...",
    "explorer.empty": "No shoes matched your filters.",

    "filter.search": "Search shoes",
    "filter.allBrands": "All Brands",
    "filter.allEras": "All Eras",
    "filter.allPositions": "All Positions",
    "filter.maxPrice": "Max price KRW",

    "compare.title": "Side-by-Side Compare",
    "compare.description": "Select up to three shoes and compare their era profile.",
    "compare.exportCsv": "Export CSV",
    "compare.saveScreenshot": "Save Screenshot",
    "compare.selectShoe": "Select shoe",
    "compare.needTwo": "Pick at least 2 shoes to visualize the chart.",
    "compare.metric": "Metric",

    "profile.title": "Player Profile Setup",
    "profile.description": "Set your play style to drive explainable recommendation scoring.",
    "profile.position": "Position",
    "profile.playStyle": "Play Style",
    "profile.budget": "Budget KRW",
    "profile.footWidth": "Foot Width",
    "profile.indoorRatio": "Indoor Ratio",
    "profile.outdoorRatio": "Outdoor Ratio",
    "profile.priorityTraction": "Traction Priority",
    "profile.priorityCushion": "Cushion Priority",
    "profile.prioritySupport": "Support Priority",
    "profile.priorityWeight": "Weight Priority",
    "profile.retroPref": "I want retro look preference in recommendations",
    "profile.save": "Save Profile",

    "recommend.title": "Recommendations",
    "recommend.description": "Get modern top 3 + retro top 2 with explainable reasons.",
    "recommend.running": "Running...",
    "recommend.run": "Run Recommendation",
    "recommend.export": "Export CSV",
    "recommend.empty": "Run recommendation to see results.",
    "recommend.top5": "Top 5 Overall",

    "favorites.title": "Favorites",
    "favorites.description": "Locally saved shoes and recommendation sessions.",
    "favorites.savedShoes": "Saved Shoes",
    "favorites.noShoes": "No favorites yet.",
    "favorites.logs": "Recommendation Logs",
    "favorites.noLogs": "No saved recommendation sessions yet.",
    "favorites.session": "Session",

    "settings.title": "Settings",
    "settings.description": "Manage local utility data and presets.",
    "settings.reset": "Reset seed database",
    "settings.resetDesc": "Reinitialize shoes, favorites, and logs.",
    "settings.clear": "Clear profile presets",
    "settings.clearDesc": "Remove saved profile and compare shortcuts.",
    "settings.resetDone": "Database reset complete. Seed data reloaded.",
    "settings.clearDone": "Local profile and compare presets cleared.",

    "card.traction": "Traction",
    "card.cushion": "Cushion",
    "card.support": "Support",
    "card.weight": "Weight",
    "card.favorite": "Favorite",
    "card.selected": "Selected",
    "card.compare": "Compare",

    "category.modern_best": "Modern Best",
    "category.retro_best": "Retro Best",
    "category.budget_best": "Budget Best",
    "category.overall_best": "Overall Best",
    "category.score": "Score",

    "metric.traction": "Traction",
    "metric.cushioning": "Cushioning",
    "metric.support": "Support",
    "metric.stability": "Support / Stability",
    "metric.weight": "Weight / Agility",
    "metric.breathability": "Materials / Breathability",
    "metric.outdoor": "Outdoor Durability",
    "metric.era": "Era Character"
  },
  ko: {
    "brand.subtitle": "현대 vs 레트로 비교 유틸",
    "language.label": "언어",
    "language.ko": "한국어",
    "language.en": "영어",

    "nav.home": "홈",
    "nav.explorer": "신발 탐색",
    "nav.compare": "비교",
    "nav.profile": "프로필 설정",
    "nav.recommendations": "추천",
    "nav.favorites": "즐겨찾기",
    "nav.settings": "설정",

    "home.badge": "Windows 유틸리티",
    "home.title": "HoopSole Compare",
    "home.description": "시대별 농구화 분석 유틸리티입니다. 현대 퍼포먼스 모델과 레트로 클래식을 비교하고, 플레이 프로필 기반의 설명 가능한 추천을 제공합니다.",
    "home.explore": "신발 탐색",
    "home.editProfile": "프로필 수정",
    "home.runRecommendation": "추천 실행",
    "home.snapshot": "현재 프로필 요약",
    "home.position": "포지션",
    "home.playStyle": "플레이 스타일",
    "home.budget": "예산",
    "home.indoorOutdoor": "실내/실외",
    "home.footWidth": "발볼",
    "home.quickProgress": "빠른 진행 현황",
    "home.compareCount": "비교 선택 수",
    "home.scoreCategories": "설명 가능한 점수 항목",
    "home.sqlite": "로컬 저장",
    "home.sqliteEnabled": "SQLite 사용 중",
    "home.exportTools": "내보내기 기능",
    "home.exportReady": "CSV/Png 준비됨",

    "explorer.title": "신발 탐색",
    "explorer.description": "성능 필터로 현대/레트로 모델을 둘러보세요.",
    "explorer.loading": "신발 데이터를 불러오는 중...",
    "explorer.empty": "조건에 맞는 신발이 없습니다.",

    "filter.search": "신발 검색",
    "filter.allBrands": "브랜드 전체",
    "filter.allEras": "시대 전체",
    "filter.allPositions": "포지션 전체",
    "filter.maxPrice": "최대 가격(KRW)",

    "compare.title": "나란히 비교",
    "compare.description": "최대 3개 신발을 선택해 시대별 특성을 비교하세요.",
    "compare.exportCsv": "CSV 내보내기",
    "compare.saveScreenshot": "스크린샷 저장",
    "compare.selectShoe": "신발 선택",
    "compare.needTwo": "차트를 보려면 최소 2개를 선택하세요.",
    "compare.metric": "지표",

    "profile.title": "플레이어 프로필 설정",
    "profile.description": "플레이 스타일을 입력하면 설명 가능한 추천 점수가 계산됩니다.",
    "profile.position": "포지션",
    "profile.playStyle": "플레이 스타일",
    "profile.budget": "예산(KRW)",
    "profile.footWidth": "발볼",
    "profile.indoorRatio": "실내 비중",
    "profile.outdoorRatio": "실외 비중",
    "profile.priorityTraction": "접지 우선순위",
    "profile.priorityCushion": "쿠셔닝 우선순위",
    "profile.prioritySupport": "지지력 우선순위",
    "profile.priorityWeight": "경량성 우선순위",
    "profile.retroPref": "추천 시 레트로 감성을 반영",
    "profile.save": "프로필 저장",

    "recommend.title": "추천 결과",
    "recommend.description": "현대 추천 3개 + 레트로 추천 2개를 이유와 함께 제공합니다.",
    "recommend.running": "계산 중...",
    "recommend.run": "추천 실행",
    "recommend.export": "CSV 내보내기",
    "recommend.empty": "추천 실행 후 결과를 확인하세요.",
    "recommend.top5": "상위 5개 종합 추천",

    "favorites.title": "즐겨찾기",
    "favorites.description": "로컬에 저장된 신발과 추천 세션입니다.",
    "favorites.savedShoes": "저장한 신발",
    "favorites.noShoes": "즐겨찾기한 신발이 없습니다.",
    "favorites.logs": "추천 로그",
    "favorites.noLogs": "저장된 추천 세션이 없습니다.",
    "favorites.session": "세션",

    "settings.title": "설정",
    "settings.description": "로컬 데이터와 프리셋을 관리합니다.",
    "settings.reset": "시드 데이터 초기화",
    "settings.resetDesc": "신발/즐겨찾기/로그를 초기 상태로 재구성합니다.",
    "settings.clear": "프로필 프리셋 삭제",
    "settings.clearDesc": "저장된 프로필과 비교 바로가기를 삭제합니다.",
    "settings.resetDone": "DB 초기화 완료. 샘플 데이터가 다시 로드되었습니다.",
    "settings.clearDone": "로컬 프로필/비교 프리셋을 삭제했습니다.",

    "card.traction": "접지",
    "card.cushion": "쿠셔닝",
    "card.support": "지지력",
    "card.weight": "경량",
    "card.favorite": "즐겨찾기",
    "card.selected": "선택됨",
    "card.compare": "비교",

    "category.modern_best": "현대 최고 추천",
    "category.retro_best": "레트로 최고 추천",
    "category.budget_best": "가성비 추천",
    "category.overall_best": "종합 최고",
    "category.score": "점수",

    "metric.traction": "접지력",
    "metric.cushioning": "쿠셔닝",
    "metric.support": "지지력",
    "metric.stability": "지지/안정성",
    "metric.weight": "무게/민첩성",
    "metric.breathability": "소재/통기성",
    "metric.outdoor": "실외 내구성",
    "metric.era": "시대 캐릭터"
  }
};

const reasonMapKo: Record<string, string> = {
  "Traction score is strong for quick stops and cuts.": "급정지와 방향 전환에 유리한 높은 접지 점수입니다.",
  "Cushioning score is high for impact comfort.": "충격 흡수에 유리한 쿠셔닝 점수입니다.",
  "Support and stability profile is reliable.": "지지력과 안정성이 안정적입니다.",
  "Weight profile is light and agile.": "가벼워 민첩한 움직임에 유리합니다.",
  "Fits within your budget range.": "설정한 예산 범위에 맞습니다.",
  "Foot width match is favorable.": "발볼 조건과 잘 맞습니다.",
  "Matches your retro style preference.": "레트로 감성 선호와 잘 맞습니다.",
  "Durability is suitable for outdoor-heavy play.": "실외 비중이 높은 플레이에 적합한 내구성입니다.",
  "Guard profile bonus from high traction and mobility.": "가드 플레이에 필요한 접지력과 민첩성에서 보너스를 받았습니다.",
  "Center profile bonus from cushioning and stability.": "센터 플레이에 필요한 쿠셔닝과 안정성에서 보너스를 받았습니다.",
  "Balanced match across your selected priorities.": "선택한 우선순위 전반에서 균형 잡힌 매칭입니다."
};

export function t(language: Language, key: string): string {
  return messages[language][key] ?? messages.en[key] ?? key;
}

export function labelPosition(language: Language, value: PositionTag): string {
  const map: Record<PositionTag, string> = {
    guard: language === "ko" ? "가드" : "Guard",
    forward: language === "ko" ? "포워드" : "Forward",
    center: language === "ko" ? "센터" : "Center",
    all: language === "ko" ? "올라운드" : "All Around"
  };
  return map[value];
}

export function labelPlayStyle(language: Language, value: PlayStyle): string {
  const map: Record<PlayStyle, string> = {
    fast: language === "ko" ? "스피드" : "Fast",
    balanced: language === "ko" ? "밸런스" : "Balanced",
    power: language === "ko" ? "파워" : "Power",
    shooting: language === "ko" ? "슈팅" : "Shooting",
    defense: language === "ko" ? "수비" : "Defense"
  };
  return map[value];
}

export function labelFootWidth(language: Language, value: FootWidth): string {
  const map: Record<FootWidth, string> = {
    narrow: language === "ko" ? "좁음" : "Narrow",
    regular: language === "ko" ? "보통" : "Regular",
    wide: language === "ko" ? "넓음" : "Wide"
  };
  return map[value];
}

export function labelEra(language: Language, value: ShoeEra): string {
  return value === "modern"
    ? language === "ko"
      ? "현대"
      : "Modern"
    : language === "ko"
      ? "레트로"
      : "Retro";
}

export function localizeReason(language: Language, reason: string): string {
  if (language === "ko") {
    return reasonMapKo[reason] ?? reason;
  }
  return reason;
}
