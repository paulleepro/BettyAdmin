import styled from "styled-components";
import {
  TextareaAutosize as MUITextareaAutosize,
  TextareaAutosizeProps,
} from "@material-ui/core";

const StyledTextareaAutosize = styled(MUITextareaAutosize)`
  border: 1px solid #e5e5e5;
  font-size: 0.9375rem;
  line-height: 1.25rem;
  padding: 0.5rem;

  &:focus {
    border-color: transparent;
    box-shadow: 0 0 0 2px #005fcc;
    outline: 0;
    border-radius: 0.25rem;
  }
`;

export const TextareaAutosize = (props: TextareaAutosizeProps) => {
  return <StyledTextareaAutosize {...props} />;
};
