import { del, put } from "./api";

export function banUser(ids: string[]) {
  return put("/ban", { userIds: ids });
}

export function unbanUser(ids: string[]) {
  return del("/ban", { userIds: ids });
}
