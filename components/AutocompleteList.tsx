import { Box, Button, IconButton, Link, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Autocomplete } from "./Autocomplete";
import { Input, InputLabel } from "./Input";

const StyledAutocompleteList = styled(Box)`
  margin-bottom: 1.5rem;

  > * {
    margin-bottom: 0.5rem;
  }
`;

// DebounceTimer
let searchTO = null;
export function AutocompleteList(props) {
  const [values, setValues] = useState([null]);
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

  const handleSelect = (option, i) => {
    const vals = values.slice();
    vals[i] = option;
    setValues(vals);
    setAutocompleteOptions([]);
  };

  useEffect(() => {
    mountRef.current = true;
    return () => {
      mountRef.current = false;
    };
  }, []);

  useEffect(() => {
    props.onChange(values.map(props.getOptionValue));
  }, [values]);

  return (
    <StyledAutocompleteList>
      <InputLabel>{props.label}</InputLabel>
      {Array(values.length)
        .fill(null)
        .map((_, i) => (
          <Box key={i} display="flex" alignItems="center" width="100%">
            <Autocomplete
              id={`${props.id}[${i}]`}
              value={values[i]}
              onChange={handleSearch}
              onSelect={(option) => handleSelect(option, i)}
              options={autocompleteOptions}
              renderInput={props.renderInput}
              renderOption={props.renderOption}
              getOptionValue={props.getOptionValue}
            />
            <Box marginLeft="0.75rem">
              <IconButton
                size="small"
                onClick={() =>
                  values.length > 1
                    ? setValues(values.filter((v, vi) => vi !== i))
                    : setValues([null])
                }
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ))}
      {values.length > 0 && (
        <Link
          component="button"
          variant="body1"
          onClick={() => setValues(values.concat(null))}
        >
          {props.addLabel}
        </Link>
      )}
    </StyledAutocompleteList>
  );
}
