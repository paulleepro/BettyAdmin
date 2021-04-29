import SearchIcon from "@material-ui/icons/Search";

import { MainLayout } from "../layouts/MainLayout";

import { Input } from "../components/Input";
import AddIcon from "../components/icons/Add";
import { Button } from "../components/Button";

import { SearchBar } from "../features/dashboard/SearchBar";
import { Title } from "../features/dashboard/Title";
import { TitleBar } from "../features/dashboard/TitleBar";
import { BannedUsersTable } from "../features/dashboard/BannedUsersTable";

export default function Home() {
  return (
    <MainLayout>
      <TitleBar>
        <Title>Ban Users</Title>
        <Button color="primary">
          <AddIcon />
          Ban User
        </Button>
      </TitleBar>
      <SearchBar>
        <Input
          placeholder="Search banned users"
          icon={<SearchIcon style={{ color: "#9a9a9a" }} />}
        />
      </SearchBar>
      <BannedUsersTable />
    </MainLayout>
  );
}
