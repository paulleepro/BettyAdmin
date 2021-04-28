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

export function put(url, data, config = {}) {
  return req(
    url,
    merge(
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
      config
    )
  );
}

export function del(url, data?, config = {}) {
  return req(
    url,
    merge(
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: data && JSON.stringify(data),
      },
      config
    )
  );
}

export function postLogin({ username, password }) {
  return post("/auth/login", { username, password });
}

export type RoomPayload = {
  title: string;
  subtitle: string;
  description: string;
  startedAt: string;
  speakerIds: string[];
};

export async function getUsersByIds(ids: string[]) {
  return Promise.all(ids.map((id) => get(`/user/${id}`)));
}

export function getUpcomingRooms() {
  return get("/upcoming");
}

export function createUpcomingRoom(room: RoomPayload) {
  return post("/upcoming", { room });
}

export function updateUpcomingRoom(id: string, room: RoomPayload) {
  return put(`/upcoming/${id}`, { room });
}

export function deleteUpcomingRoom(id: string) {
  return del(`/upcoming/${id}`);
}
