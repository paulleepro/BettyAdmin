import { Box } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components";
import { Autocomplete } from "./Autocomplete";
import { Input, InputLabel } from "./Input";

const StyledAutocompleteList = styled(Box)`
  > * {
    margin-bottom: 0.5rem;
  }
`;

export function AutocompleteList(props) {
  const [values, setValues] = useState([]);

  return (
    <StyledAutocompleteList>
      <InputLabel>{props.label}</InputLabel>
    </StyledAutocompleteList>
  );
}
