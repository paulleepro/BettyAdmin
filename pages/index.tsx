import { useState } from "react";
import { MainLayout } from "../layouts/MainLayout";

import { Input } from "../components/Input";
import AddIcon from "../components/icons/Add";
import { Button } from "../components/Button";

import { RoomsTable } from "../features/dashboard/RoomsTable/RoomsTable";
import { SearchBar } from "../features/dashboard/SearchBar";
import { Title } from "../features/dashboard/Title";
import { TitleBar } from "../features/dashboard/TitleBar";
import { CreateEventModal } from "../features/dashboard/CreateEventModal";
import SearchIcon from "@material-ui/icons/Search";

import { UpcomingRoom } from "../@types/upcoming";
import { useQuery } from "@apollo/client";
import { GetBannedUsers } from "../graphql/queries/ban";

export default function Home() {
  const [editingRoom, setEditingRoom] = useState<UpcomingRoom>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [lastFetchRequested, setLastFetchRequested] = useState(Date.now());

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
          placeholder="Search"
          icon={<SearchIcon style={{ color: "#9a9a9a" }} />}
        />
      </SearchBar>
      <RoomsTable
        lastFetchRequested={lastFetchRequested}
        onClick={setEditingRoom}
      />
      <CreateEventModal
        isOpen={isCreating || editingRoom !== null}
        existing={editingRoom}
        onClose={() => {
          setLastFetchRequested(Date.now());
          setIsCreating(false);
          setEditingRoom(null);
        }}
      />
    </MainLayout>
  );
}
