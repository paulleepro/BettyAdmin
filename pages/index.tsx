import { useEffect, useMemo, useState } from "react";
import { Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { MainLayout } from "../layouts/MainLayout";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import AddIcon from "../components/icons/Add";

import { UpcomingRoomsTable } from "../features/dashboard/RoomsTable/UpcomingRoomsTable";
import {
  Filters,
  UpcomingRoomFilters,
} from "../features/dashboard/RoomsTable/Filters";
import { SearchBar } from "../features/dashboard/SearchBar";
import { Title } from "../features/dashboard/Title";
import { TitleBar } from "../features/dashboard/TitleBar";
import { CreateEventModal } from "../features/dashboard/CreateEventModal";

import { UpcomingRoom } from "../@types/upcoming";
import { useUpcomingRooms } from "../hooks/upcoming";
import { useDebounce } from "react-use";

export default function Home() {
  const [editingRoom, setEditingRoom] = useState<UpcomingRoom>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [isCreating, setIsCreating] = useState(false);
  const [filters, setFilters] = useState<UpcomingRoomFilters>({});
  const { data, refetch } = useUpcomingRooms();
  const { upcomingRooms = [] } = data || {};
  const shows = useMemo(
    () => (upcomingRooms ? upcomingRooms.map((r) => r.subtitle) : []),
    [data]
  );

  useDebounce(() => setDebouncedSearch(search), 250, [search]);

  useEffect(() => {
    console.log(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <MainLayout>
      <TitleBar>
        <Title>Schedule</Title>
        <Button onClick={() => setIsCreating(true)} color="primary">
          <AddIcon />
          Create Event
        </Button>
      </TitleBar>
      <SearchBar>
        <Box display="flex" alignItems="center">
          <Input
            className="search-input"
            icon={<SearchIcon style={{ color: "#9a9a9a" }} />}
            onChange={(e) => setSearch(e.target.value?.toLowerCase())}
            margin="0 0.5rem 0 0"
            placeholder="Search"
          />
          <Filters shows={shows} filters={filters} onChange={setFilters} />
        </Box>
      </SearchBar>
      <UpcomingRoomsTable
        refetch={refetch}
        upcomingRooms={upcomingRooms.filter(
          filterRoom(filters, debouncedSearch)
        )}
        onClick={setEditingRoom}
      />
      <CreateEventModal
        existing={editingRoom}
        isOpen={isCreating || editingRoom !== null}
        onClose={() => {
          setIsCreating(false);
          setEditingRoom(null);
          refetch();
        }}
      />
    </MainLayout>
  );
}

function filterRoom(
  filters: UpcomingRoomFilters,
  search?: string
): (room: UpcomingRoom) => boolean {
  return (room) => {
    if (search && !JSON.stringify(room).toLowerCase().includes(search)) {
      return false;
    }

    let shouldAllow = true;
    if (filters.shows) {
      if (!filters.shows.includes(room.subtitle)) {
        shouldAllow = false;
      }
    }

    if (filters.toDate || filters.fromDate) {
      if (
        room.startTime < filters.fromDate ||
        room.startTime > filters.toDate
      ) {
        shouldAllow = false;
      }
    }

    if (filters.hostIds) {
      if (
        !filters.hostIds.some((hostId) =>
          room.speakers.find((s) => s.id === hostId)
        )
      ) {
        shouldAllow = false;
      }
    }

    return shouldAllow;
  };
}
