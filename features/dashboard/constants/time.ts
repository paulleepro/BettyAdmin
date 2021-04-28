export const oneHourMs = 1000 * 60 * 60;

export function nextHour() {
  const d = new Date(Date.now() + oneHourMs);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);

  return d;
}
