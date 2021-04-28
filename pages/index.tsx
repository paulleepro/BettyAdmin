import { useState } from "react";
import { MainLayout } from "../layouts/MainLayout";

import { Input } from "../components/Input";
import AddIcon from "../components/icons/Add";
import { Button } from "../components/Button";

import { RoomsTable } from "../features/dashboard/RoomsTable";
import { SearchBar } from "../features/dashboard/SearchBar";
import { Title } from "../features/dashboard/Title";
import { TitleBar } from "../features/dashboard/TitleBar";
import { CreateEventModal } from "../features/dashboard/CreateEventModal";
import SearchIcon from "@material-ui/icons/Search";

export default function Home() {
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [lastFetchRequested, setLastFetchRequested] = useState(Date.now());

  return (
    <MainLayout>
      <TitleBar>
        <Title>Schedule</Title>
        <Button onClick={() => setIsCreatingEvent(true)} color="primary">
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
      <RoomsTable lastFetchRequested={lastFetchRequested} />
      <CreateEventModal
        isOpen={isCreatingEvent}
        onClose={() => {
          setLastFetchRequested(Date.now());
          setIsCreatingEvent(false);
        }}
      />
    </MainLayout>
  );
}
