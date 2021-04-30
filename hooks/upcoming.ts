import { useQuery } from "@apollo/client";
import { POLL_INTERVAL } from "../constants/query";
import { GetUpcomingRooms } from "../graphql/queries";

export function useUpcomingRooms() {
  const { loading, error, data, refetch } = useQuery(GetUpcomingRooms, {
    pollInterval: POLL_INTERVAL,
  });

  return {
    loading,
    error,
    data,
    refetch,
  };
}
