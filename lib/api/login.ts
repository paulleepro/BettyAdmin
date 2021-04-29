import { post } from "./api";

export function postLogin({ username, password }) {
  return post("/auth/login", { username, password });
}
