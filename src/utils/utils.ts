
export function formatDate(year: string, month: string, day: string): string {
  return (
    (year || '') +
    (month ? ` ${month}` : '') +
    (day ? ` ${day}` : '')
  );
}
