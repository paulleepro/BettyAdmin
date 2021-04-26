import store from "../store";

export function postLogin({ username, password }) {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
}

export function req(url, config) {
  return fetch(url, {
    ...config,
    
  });
}

export function listUpcoming() {}
