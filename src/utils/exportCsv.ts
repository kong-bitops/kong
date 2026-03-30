import type { RecommendationResult } from "../types/recommendation";

export function toCsv<T extends Record<string, unknown>>(rows: T[]): string {
  if (rows.length === 0) return "";

  const headers = Object.keys(rows[0]);
  const escapeValue = (value: unknown) => {
    const text = String(value ?? "");
    if (/[",\n]/.test(text)) {
      return `"${text.replace(/"/g, '""')}"`;
    }
    return text;
  };

  const body = rows
    .map((row) => headers.map((header) => escapeValue(row[header])).join(","))
    .join("\n");

  return `${headers.join(",")}\n${body}`;
}

export function recommendationToCsvRows(results: RecommendationResult[]) {
  return results.map((item) => ({
    category: item.category,
    shoeId: item.shoeId,
    name: item.shoe?.name ?? "",
    brand: item.shoe?.brand ?? "",
    era: item.shoe?.era ?? "",
    totalScore: item.totalScore,
    reason: item.reason.join(" | ")
  }));
}
