import { getTimezoneOffset } from "date-fns-tz";

// return the number of milliseconds the local machine is ahead of timezone by
export const getOffsetMs = (timezone: string): number => {
  return (
    -getTimezoneOffset(timezone) - new Date().getTimezoneOffset() * 60 * 1000
  );
};
