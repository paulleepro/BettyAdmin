import { BoxProps } from "@material-ui/core";
import { ComponentType, useEffect, useRef, useState } from "react";
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

type AutocompleteOption = {
  value: string;
};

type AutocompleteProps<T = any> = {
  id: string;
  label?: string;
  options: T[];
  renderOption: (option: T) => Promise<T[]>;
  getOptionValue: (option: T) => any;
  onChange: (value: string) => void;
};

export const Autocomplete = (props: AutocompleteProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const selectRef = useRef(null);
  const containerRef = useRef<any>(null);
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const focusSelect = () => {
    selectRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape" && isOpen) {
      setIsOpen(false);
    }

    if (e.key === "Enter") {
      handleSelect(props.getOptionValue(props.options[selectedIndex]));
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

  const handleSelect = (val) => {
    handleChange({ target: { value: val } });
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  useClickAway(containerRef, () => setIsOpen(false));

  console.log(selectedIndex);

  return (
    <InputContainer {...{ onKeyDown: handleKeyDown, ref: containerRef }}>
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
      {isOpen && props.options.length > 0 && value.length > 0 && (
        <OptionMenu>
          {props.options.map((option, i) => (
            <Option
              key={i}
              onClick={() =>
                handleSelect(props.getOptionValue(props.options[i]))
              }
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
