import { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";

import { MainLayout } from "../layouts/MainLayout";

import { Input } from "../components/Input";
import AddIcon from "../components/icons/Add";
import { Button } from "../components/Button";

import { SearchBar } from "../features/dashboard/SearchBar";
import { Title } from "../features/dashboard/Title";
import { TitleBar } from "../features/dashboard/TitleBar";
import { BannedUsersTable } from "../features/dashboard/BannedUsersTable";
import { BanUserModal } from "../features/dashboard/BanUserModal";

export default function Home() {
  const [isBanning, setIsBanning] = useState(false);
  const [lastFetchRequested, setLastFetchRequested] = useState(Date.now());

  return (
    <MainLayout>
      <TitleBar>
        <Title>Ban Users</Title>
        <Button color="primary" onClick={() => setIsBanning(true)}>
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
      <BannedUsersTable lastFetchRequested={lastFetchRequested} />
      <BanUserModal
        isOpen={isBanning}
        onClose={() => {
          setIsBanning(false);
          setLastFetchRequested(Date.now());
        }}
      />
    </MainLayout>
  );
}
