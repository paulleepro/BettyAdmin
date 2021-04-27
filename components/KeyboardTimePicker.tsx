import {
  KeyboardTimePicker as MUIKeyboardTimePicker,
  KeyboardTimePickerProps,
} from "@material-ui/pickers";
import styled from "styled-components";

const StyledKeyboardTimePicker = styled(MUIKeyboardTimePicker)`
  border-radius: 0.25rem;
  border: 1px solid #e5e5e5;

  .MuiInput-root {
    padding: 0 0.5rem;
  }

  .MuiIconButton-root {
    padding: 0.25rem;
  }

  .MuiInput-input {
    box-sizing: border-box;
    height: 2.25rem;
  }

  .MuiInput-underline:before,
  .MuiInput-underline:after {
    display: none;
    border: 0;
  }

  .Mui-focused {
    border-color: transparent;
    box-shadow: 0 0 0 2px #005fcc;
    border-radius: 0.25rem;
  }
`;

export const KeyboardTimePicker = (props: KeyboardTimePickerProps) => {
  return <StyledKeyboardTimePicker {...props} />;
};
