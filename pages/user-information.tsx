import { useState } from "react";

import { MainLayout } from "../layouts/MainLayout";
import { Input } from "../components/Input";

import { SearchBar } from "../features/dashboard/SearchBar";
import { Title } from "../features/dashboard/Title";
import { TitleBar } from "../features/dashboard/TitleBar";
import { UserInformationTable } from "../features/dashboard/UserInformationTable";
import SearchIcon from "@material-ui/icons/Search";
import { useDebounce } from "react-use";

export default function UserInformation() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useDebounce(() => setDebouncedSearch(search), 250, [search]);

  return (
    <MainLayout>
      <TitleBar>
        <Title>User Information</Title>
      </TitleBar>
      <SearchBar>
        <Input
          placeholder="Search"
          icon={<SearchIcon style={{ color: "#9a9a9a" }} />}
          onChange={(e) => setSearch(e.target.value?.toLowerCase())}
        />
      </SearchBar>
      <UserInformationTable search={debouncedSearch} />
    </MainLayout>
  );
}
