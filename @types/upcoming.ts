import { User } from "./user";

export type UpcomingRoom = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  startTime: number;
  interestedCount: string;

  speakers: User[];
};
