import { useState } from "react";
import { MainLayout } from "../layouts/MainLayout";

import { Input } from "../components/Input";
import AddIcon from "../components/icons/Add";
import { Button } from "../components/Button";

import { UpcomingRoomsTable } from "../features/dashboard/RoomsTable/UpcomingRoomsTable";
import { Filters } from "../features/dashboard/RoomsTable/Filters";
import { SearchBar } from "../features/dashboard/SearchBar";
import { Title } from "../features/dashboard/Title";
import { TitleBar } from "../features/dashboard/TitleBar";
import { CreateEventModal } from "../features/dashboard/CreateEventModal";
import SearchIcon from "@material-ui/icons/Search";

import { UpcomingRoom } from "../@types/upcoming";
import { useUpcomingRooms } from "../hooks/upcoming";

export default function Home() {
  const [editingRoom, setEditingRoom] = useState<UpcomingRoom>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { data = {}, loading, error, refetch } = useUpcomingRooms();
  const { upcomingRooms = [] } = data;

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
        <Input
          className="search-input"
          placeholder="Search"
          icon={<SearchIcon style={{ color: "#9a9a9a" }} />}
          margin="0"
        />
        {/* <Filters /> */}
      </SearchBar>
      <UpcomingRoomsTable
        upcomingRooms={upcomingRooms}
        refetch={refetch}
        onClick={setEditingRoom}
      />
      <CreateEventModal
        isOpen={isCreating || editingRoom !== null}
        existing={editingRoom}
        onClose={() => {
          refetch();
          setIsCreating(false);
          setEditingRoom(null);
        }}
      />
    </MainLayout>
  );
}
