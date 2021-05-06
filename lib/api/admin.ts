import { del } from "./api";

export function removeNumUsersFromWaitlist(numUsers: number) {
  return del("/waitlist", { numUsers });
}
