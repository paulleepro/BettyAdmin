import { useQuery } from "@apollo/client";
import { UpcomingRoom } from "../@types/upcoming";
import { POLL_INTERVAL } from "../constants/query";
import { GetUpcomingRooms } from "../graphql/queries";

type UpcomingRoomsData = {
  upcomingRooms: UpcomingRoom[];
};

export function useUpcomingRooms() {
  const { loading, error, data, refetch } = useQuery<
    UpcomingRoomsData | undefined
  >(GetUpcomingRooms, {
    pollInterval: POLL_INTERVAL,
  });

  return {
    loading,
    error,
    data,
    refetch,
  };
}
