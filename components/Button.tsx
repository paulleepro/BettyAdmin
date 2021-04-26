import { FC } from "react";
import { ButtonProps } from "@material-ui/core";
import MUIButton from "@material-ui/core/Button";
import styled from "styled-components";

const StyledButton = styled(MUIButton)`
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 0.25rem;
  box-shadow: none;
  color: #1f1f1f;
  text-transform: none;
  font-size: 0.9375rem;
  font-family: inherit;
  line-height: 1.25rem;
  padding: 0.5rem 0.75rem;

  &:hover,
  &:focus {
    box-shadow: none;
  }

  .MuiTouchRipple-child {
    background-color: #1f1f1f;
  }

  &.MuiButton-contained {
    background: transparent;
    border-color: transparent;
    color: #858585;

    &:hover {
      color: #1f1f1f;
      background: #e5e5e5;
    }
  }

  &.MuiButton-containedPrimary {
    background: linear-gradient(266.53deg, #ff0000 0%, #ff5c00 100%);
    color: #fff;

    &:hover {
      background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.15),
          rgba(0, 0, 0, 0.15)
        ),
        linear-gradient(266.53deg, #ff0000 0%, #ff5c00 100%);
      color: #fff;
    }

    &:active {
      background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.25),
          rgba(0, 0, 0, 0.25)
        ),
        linear-gradient(266.53deg, #ff0000 0%, #ff5c00 100%);
    }

    &.Mui-disabled {
      background: #bfbfbf;
    }
  }

  &.MuiButton-containedSecondary {
    color: #0b7ce5;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

export const Button: FC<ButtonProps> = (props) => {
  return (
    <StyledButton variant="contained" {...props}>
      {props.children}
    </StyledButton>
  );
};
