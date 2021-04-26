import { Box } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Autocomplete } from "./Autocomplete";
import { Input, InputLabel } from "./Input";

const StyledAutocompleteList = styled(Box)`
  > * {
    margin-bottom: 0.5rem;
  }
`;

// DebounceTimer
let searchTO = null;
export function AutocompleteList(props) {
  const [values, setValues] = useState([]);
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const mountRef = useRef(null);
  const handleSearch = async (q: string) => {
    clearTimeout(searchTO);
    searchTO = setTimeout(async () => {
      if (!mountRef.current) {
        return;
      }

      const options = await props.loadOptions(q);
      setAutocompleteOptions(options);
    }, 200);
  };

  useEffect(() => {
    mountRef.current = true;
    return () => {
      mountRef.current = false;
    };
  }, []);

  return (
    <StyledAutocompleteList>
      <InputLabel>{props.label}</InputLabel>
      <Autocomplete
        id={`${props.id}[${values.length}]`}
        onChange={handleSearch}
        options={autocompleteOptions}
        renderOption={props.renderOption}
        getOptionValue={props.getOptionValue}
      />
    </StyledAutocompleteList>
  );
}
