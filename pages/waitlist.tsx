import { MainLayout } from "../layouts/MainLayout";

import { Input } from "../components/Input";
import AddIcon from "../components/icons/Add";
import { Button } from "../components/Button";

import { SearchBar } from "../features/dashboard/SearchBar";
import { Title } from "../features/dashboard/Title";
import { TitleBar } from "../features/dashboard/TitleBar";
import SearchIcon from "@material-ui/icons/Search";

export default function Home() {
  return (
    <MainLayout>
      <TitleBar>
        <Title>Waitlist</Title>
        <Button color="primary">
          <AddIcon />
        </Button>
      </TitleBar>
      <SearchBar>
        <Input
          placeholder="Search"
          icon={<SearchIcon style={{ color: "#9a9a9a" }} />}
        />
      </SearchBar>
    </MainLayout>
  );
}
