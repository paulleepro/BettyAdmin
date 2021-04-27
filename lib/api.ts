import merge from "lodash/merge";
import store from "../store";

export function req(url, config) {
  const token = store.getState().auth.user?.token;
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    merge(
      {
        headers: token && {
          Authorization: `bearer ${token}`,
        },
      },
      config
    )
  );
}

export function get(url, config = {}) {
  return req(url, config);
}

export function post(url, data, config = {}) {
  return req(
    url,
    merge(
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
      config
    )
  );
}

export function postLogin({ username, password }) {
  return post("/auth/login", { username, password });
}

type CreateRoomPayload = {
  title: string;
  subtitle: string;
  description: string;
  startedAt: string;
  speakerIds: string[];
};

export function getUpcomingRooms() {
  return get("/upcoming");
}
export function createUpcomingRoom(room: CreateRoomPayload) {
  return post("/upcoming", { room });
}
