import { Box, Typography } from "@material-ui/core";
import { isEqual } from "lodash";
import {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { AutocompleteList } from "../../../components/AutocompleteList";
import { Button } from "../../../components/Button";

import { Checkbox } from "../../../components/Checkbox";
import { KeyboardDatePicker } from "../../../components/KeyboardDatePicker";
import {
  handleRenderOption,
  renderHostInput,
  searchHosts,
} from "../utils/hostsAutocomplete";

const StyledFilters = styled(Box)`
  background: #f5f5f5;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.2);

  top: 4rem;
  left: 40rem;
  min-width: 17.5rem;

  overflow: hidden;
  position: absolute;
  user-select: none;
  z-index: 20;
`;

const FilterHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;

  padding: 0.5rem;
`;

const FilterHeaderTitle = styled.span`
  font-weight: 600;
`;

const FilterSectionContainer = styled.div``;

const FilterSectionHeader = styled.label`
  display: flex;
  align-items: center;

  background: #fff;
  cursor: pointer;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  margin-top: -1px;
  line-height: 1.25rem;
`;
const FilterSectionContent = styled(Box)`
  padding: 0.5rem 1rem;
  .sublabel {
    color: #858585;
  }
`;

type FilterSectionProps = {
  label: string;
  children: ReactNode;
};

const FilterSection = memo((props: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <FilterSectionContainer>
      <FilterSectionHeader>
        <Checkbox
          checked={isOpen}
          onChange={(e) => setIsOpen(e.target.checked)}
          size="small"
        />

        {props.label}
      </FilterSectionHeader>
      {isOpen && <FilterSectionContent>{props.children}</FilterSectionContent>}
    </FilterSectionContainer>
  );
});

export function Filters() {
  const { watch, setValue, reset } = useForm({
    defaultValues: { hostIds: [], hosts: [] },
  });
  const values = watch();
  const handleChange = useCallback(
    (hostIds, hosts) => {
      if (!isEqual(hostIds.sort(), values.hostIds.sort())) {
        setValue("hostIds", hostIds);
        setValue("hosts", hosts);
        console.log(hostIds);
      }
    },
    [values]
  );

  const handleSubmit = () => {
    console.log(values);
  };

  return (
    <StyledFilters>
      <FilterHeader>
        <Button size="small" variant="outlined">
          Clear
        </Button>
        <FilterHeaderTitle>Filters</FilterHeaderTitle>
        <Button
          size="small"
          color="secondary"
          variant="contained"
          onClick={handleSubmit}
        >
          Apply
        </Button>
      </FilterHeader>
      <FilterSection label="Date">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography className="sublabel">From</Typography>
          <Box bgcolor="#fff" width="10rem" marginBottom="0.5rem">
            <KeyboardDatePicker
              format="MM/dd/yyyy"
              value={Date.now()}
              onChange={(d) => console.log(d)}
              fullWidth
            />
          </Box>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography className="sublabel">To</Typography>
          <Box bgcolor="#fff" width="10rem">
            <KeyboardDatePicker
              format="MM/dd/yyyy"
              value={Date.now()}
              onChange={(d) => console.log(d)}
              fullWidth
            />
          </Box>
        </Box>
      </FilterSection>
      <FilterSection label="Show">yah YEET</FilterSection>
      <FilterSection label="Host">
        <AutocompleteList
          addLabel="Add another host"
          renderInput={renderHostInput}
          renderOption={handleRenderOption}
          loadOptions={searchHosts}
          defaultValue={values.hosts}
          getOptionValue={(option) => option?.id || null}
          onChange={handleChange}
        />
      </FilterSection>
    </StyledFilters>
  );
}
