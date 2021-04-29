import { MainLayout } from "../layouts/MainLayout";

import { Input } from "../components/Input";
import AddIcon from "../components/icons/Add";
import { Button } from "../components/Button";

import { SearchBar } from "../features/dashboard/SearchBar";
import { Title } from "../features/dashboard/Title";
import { TitleBar } from "../features/dashboard/TitleBar";
import SearchIcon from "@material-ui/icons/Search";
import { LiveRoomsTable } from "../features/dashboard/LiveRoomsTable";

export default function Home() {
  return (
    <MainLayout>
      <TitleBar>
        <Title>Live Rooms</Title>
        <Button color="primary">
          <AddIcon />
        </Button>
      </TitleBar>
      <SearchBar>
        <Input
          placeholder="Search live rooms"
          icon={<SearchIcon style={{ color: "#9a9a9a" }} />}
        />
      </SearchBar>
      <LiveRoomsTable />
    </MainLayout>
  );
}