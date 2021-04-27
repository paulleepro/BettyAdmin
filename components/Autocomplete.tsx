import { Box, BoxProps } from "@material-ui/core";
import { ComponentType, ReactNode, useEffect, useRef, useState } from "react";
import { useClickAway, useDebounce } from "react-use";
import styled, { StyledComponent } from "styled-components";

import { Input, InputContainer, InputLabel } from "./Input";

export const OptionMenu = styled.div`
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

type AutocompleteProps<T = any> = {
  id: string;
  label?: string;
  options: T[];
  value?: T;
  renderInput?: (option: T) => ReactNode;
  renderOption: (option: T) => Promise<T[]>;
  getOptionValue: (option: T) => any;
  onChange: (value: string) => void;
  onSelect: (option: T) => void;
};

export const Autocomplete = (props: AutocompleteProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<any>(null);
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape" && isOpen) {
      setIsOpen(false);
    }

    if (e.key === "Enter") {
      handleSelect(props.options[selectedIndex]);
    }

    if (value) {
      if (e.key === "ArrowDown") {
        if (!isOpen) {
          setIsOpen(true);
        } else if (selectedIndex < props.options.length - 1) {
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

  const handleSelect = (option) => {
    props.onSelect && props.onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedIndex(-1);
    } else {
      focusInput();
    }
  }, [isOpen]);

  useClickAway(containerRef, () => setIsOpen(false));

  return (
    <InputContainer {...{ onKeyDown: handleKeyDown, ref: containerRef }}>
      {props.label && (
        <InputLabel htmlFor={props.id} onClick={() => focusInput()}>
          {props.label}
        </InputLabel>
      )}
      {!isOpen && props.renderInput && props.value ? (
        <Box onClick={() => setIsOpen(true)}>
          {props.renderInput(props.value)}
        </Box>
      ) : (
        <Input
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          ref={inputRef}
          value={value}
          margin="0"
        />
      )}
      {isOpen && props.options.length > 0 && value.length > 0 && (
        <OptionMenu>
          {props.options.map((option, i) => (
            <Option
              key={i}
              onClick={() => handleSelect(option)}
              className={`${i === selectedIndex ? "selected" : ""}`}
            >
              {props.renderOption(option)}
            </Option>
          ))}
        </OptionMenu>
      )}
    </InputContainer>
  );
};
