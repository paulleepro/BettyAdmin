import { getOffsetMs } from "../utils/date";
import { LA_TZ } from "./timezones";

export const oneHourMs = 1000 * 60 * 60;

export function nextHour() {
  const d = new Date(Date.now() + oneHourMs);
  d.setMinutes(0, 0, 0);

  return d;
}

export function laStartDay(date: Date): number {
  const offsetMs = getOffsetMs(LA_TZ);
  date.setHours(0, 0, 0, 0);
  return date.getTime() + offsetMs;
}

export function laEndDay(date: Date): number {
  const offsetMs = getOffsetMs(LA_TZ);
  date.setHours(23, 59, 59, 999);

  return date.getTime() + offsetMs;
}
