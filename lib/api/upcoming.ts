import { del, get, post, put } from "./api";

export type RoomPayload = {
  title: string;
  subtitle: string;
  description: string;
  startedAt: string;
  speakerIds: string[];
};

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
