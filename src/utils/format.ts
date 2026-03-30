export function formatDateTime(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleString();
}
