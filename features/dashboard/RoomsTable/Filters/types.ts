import { User } from "../../../../@types/user";

export type UpcomingRoomFilters = {
  hosts?: User[];
  hostIds?: string[];
  shows?: string[];
  fromDate?: number;
  toDate?: number;
};

export type EnabledFilters = {
  date?: boolean;
  show?: boolean;
  hosts?: boolean;
};
