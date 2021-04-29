import { Box } from "@material-ui/core";
import styled from "styled-components";
import { Button } from "../../../components/Button";

import { Checkbox } from "../../../components/Checkbox";

const StyledFilters = styled(Box)`
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.2);

  position: absolute;
  left: 40rem;
  top: 4rem;
  width: 17.5rem;
  z-index: 20;
`;

const FilterHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.5rem;
`;

const FilterHeaderTitle = styled.span`
  font-weight: 600;
`;

const FilterSection = styled.div``;
const FilterSectionHeader = styled.label`
  cursor: pointer;
  display: block;
  height: 2.25rem;
  border-top: 1px solid #e5e5e5;
`;

export function Filters() {
  return (
    <StyledFilters>
      <FilterHeader>
        <Button size="small" variant="outlined">
          Clear
        </Button>
        <FilterHeaderTitle>Filters</FilterHeaderTitle>
        <Button size="small" color="secondary" variant="contained">
          Apply
        </Button>
      </FilterHeader>
      <FilterSection>
        <FilterSectionHeader>
          <Checkbox size="small" title="asd" />
          Date
        </FilterSectionHeader>
      </FilterSection>
      <FilterSection>
        <FilterSectionHeader>
          <Checkbox size="small" title="asd" />
          Show
        </FilterSectionHeader>
      </FilterSection>
      <FilterSection>
        <FilterSectionHeader>
          <Checkbox size="small" title="asd" />
          Host
        </FilterSectionHeader>
      </FilterSection>
    </StyledFilters>
  );
}
