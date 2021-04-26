import { BoxProps } from "@material-ui/core";
import { ComponentType, useEffect, useRef, useState } from "react";
import { useClickAway, useDebounce } from "react-use";
import styled, { StyledComponent } from "styled-components";

import { Input, InputContainer, InputLabel } from "./Input";

const OptionMenu = styled.div`
  background: #fff;
  border-radius: 0.25rem;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.2);
  margin-top: 0.5rem;
`;

const Option = styled.div`
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  min-height: 2.25rem;
  padding: 0.5rem;

  &:hover,
  &.selected {
    background: #f5f5f5;
  }
`;

type AutocompleteProps = {
  id: string;
  label: string;
  options: any[];
  loadOptions: (value: string) => Promise<void>;
  onChange: (value: string) => void;
};

export const Autocomplete = (props: AutocompleteProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(props.options || []);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const selectRef = useRef(null);
  const containerRef = useRef<any>(null);
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState("");
  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue(value);
    },
    200,
    [value]
  );
  const focusSelect = () => {
    selectRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape" && isOpen) {
      setIsOpen(false);
    }

    if (e.key === "Enter") {
      handleSelect(options[selectedIndex].value);
    }

    if (value) {
      if (e.key === "ArrowDown") {
        if (!isOpen) {
          setIsOpen(true);
        } else if (selectedIndex < options.length - 1) {
          setSelectedIndex(selectedIndex + 1);
        }
      } else if (e.key === "ArrowUp") {
        if (isOpen && selectedIndex > 0) {
          setSelectedIndex(selectedIndex - 1);
        }
      }
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    props.onChange && props.onChange(e.target.value);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleSelect = (val) => {
    handleChange({ target: { value: val } });
    setIsOpen(false);
  };

  useEffect(() => {
    if (props.loadOptions) {
      setIsLoading(true);
      props.loadOptions(debouncedValue).then((o) => {
        setTimeout(() => {
          setIsLoading(false);
          setOptions(o);
        }, 100);
      });
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (!isOpen) {
      cancel();
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  useClickAway(containerRef, () => setIsOpen(false));

  return (
    <InputContainer ref={containerRef} onKeyDown={handleKeyDown}>
      {props.label && (
        <InputLabel htmlFor={props.id} onClick={() => focusSelect()}>
          {props.label}
        </InputLabel>
      )}
      <Input
        onChange={handleChange}
        onFocus={() => setIsOpen(true)}
        value={value}
      />
      {isOpen && options.length > 0 && value.length > 0 && (
        <OptionMenu>
          {options.map((option, i) => (
            <Option
              key={i}
              onClick={() => handleSelect(options[i].value)}
              className={`${i === selectedIndex ? "selected" : ""}`}
            >
              {option.value}
            </Option>
          ))}
        </OptionMenu>
      )}
    </InputContainer>
  );
};
