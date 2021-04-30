import { Box, IconButton, Link } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { isEqual } from "lodash";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Autocomplete } from "./Autocomplete";
import { InputLabel } from "./Input";

const StyledAutocompleteList = styled(Box)`
  > * {
    margin-bottom: 0.5rem;
  }
`;

// DebounceTimer
let searchTO = null;
export function AutocompleteList(props) {
  const { defaultValue } = props;
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

  const handleSelect = (option, i) => {
    const vals = values.slice();
    vals[i] = option;
    setValues(vals);
    setAutocompleteOptions([]);
  };

  const handleAdd = () => {
    if (values.includes(null)) {
      return;
    }
    setValues(values.concat(null));
  };

  useEffect(() => {
    mountRef.current = true;
    return () => {
      mountRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!values.length) {
      setValues([null]);
    } else {
      const vals = values.filter(Boolean).map(props.getOptionValue);

      if (!isEqual(vals.sort(), defaultValue.slice().sort())) {
        props.onChange(
          values.filter(Boolean).map(props.getOptionValue),
          values
        );
      }
    }
  }, [values]);

  useEffect(() => {
    setValues(defaultValue);
  }, [defaultValue]);

  return (
    <StyledAutocompleteList>
      <InputLabel>{props.label}</InputLabel>
      {values.map((value, i) => (
        <Box key={i} display="flex" alignItems="center" width="100%">
          <Autocomplete
            id={`${props.id}[${i}]`}
            value={value}
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
              type="button"
              onClick={() =>
                values.length > 1
                  ? setValues(values.filter((v, vi) => vi !== i))
                  : setValues([])
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
          type="button"
          variant="body1"
          onClick={handleAdd}
        >
          {props.addLabel}
        </Link>
      )}
    </StyledAutocompleteList>
  );
}
