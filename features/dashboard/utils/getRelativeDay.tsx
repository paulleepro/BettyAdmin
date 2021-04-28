import { differenceInCalendarDays } from "date-fns";
import { format, utcToZonedTime } from "date-fns-tz";
import { LA_TZ } from "../constants/timezones";

export function getRelativeDay(
  upcomingRoom,
  laNow = utcToZonedTime(new Date(), LA_TZ)
) {
  const laDate = utcToZonedTime(upcomingRoom.startTime, LA_TZ);
  const days = differenceInCalendarDays(laDate, laNow);
  const relativeDay =
    days < 2 ? days > 0 ? "Tomorrow" : <b>Today</b> : format(laDate, "eee");

  return { laDate, days, relativeDay };
}
