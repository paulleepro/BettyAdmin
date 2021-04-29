import { Box } from "@material-ui/core";
import { forwardRef, InputHTMLAttributes, ReactNode, useState } from "react";
import styled from "styled-components";

export const InputContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;

  position: relative;
`;

export const StyledInput = styled.input`
  border-radius: 0.25rem;
  border: 1px solid #e5e5e5;
  font-family: "Infra";
  font-size: 0.9375rem;
  height: 2.25rem;
  outline: 0;
  padding: 0 0.5rem;

  &:focus {
    border-color: transparent;
    box-shadow: 0 0 0 2px #005fcc;
  }

  &::placeholder {
    color: #bfbfbf;
  }

  &.icon {
    padding-left: 2.5rem;
  }
`;

export const InputLabel = styled.label`
  align-items: center;
  display: flex;
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.25rem;
  margin-bottom: 0.5rem;
`;

const StyledCharsLeftLabel = styled.span`
  color: #bfbfbf;
  font-weight: 400;
  font-size: 0.8125rem;
  margin-left: 0.5rem;
`;

const RequiredSpan = styled.span`
  color: #ff0000;
`;

type InputProps = {
  label?: string;
  margin?: string;
  icon?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, children, icon, ...props }, ref) => {
    const [val, setVal] = useState(props.defaultValue);
    const handleChange = (e) => {
      props.onChange && props.onChange(e);
      setVal(e.target.value);
    };

    return (
      <InputContainer margin={props.margin || "0 0 1rem 0"}>
        {label && (
          <InputLabel htmlFor={props.id}>
            {label}
            {props.maxLength && (
              <CharsLeftLabel
                length={val?.toString().length || 0}
                maxLength={props.maxLength}
              />
            )}
            {props.required && <RequiredSpan>*</RequiredSpan>}
          </InputLabel>
        )}
        <StyledInput
          {...props}
          ref={ref}
          className={`${props.className} ${icon ? "icon" : ""}`}
          onChange={handleChange}
        />
        {icon && (
          <Box
            position="absolute"
            top="0"
            left="0"
            padding="0.5rem"
            width="1.5rem"
            height="1.5rem"
          >
            {icon}
          </Box>
        )}
      </InputContainer>
    );
  }
);

type CharsLeftLabelProps = {
  length: number;
  maxLength: number;
};

function CharsLeftLabel(props: CharsLeftLabelProps) {
  const charsLeft = props.maxLength - props.length;
  if (charsLeft > 10) {
    return null;
  }
  return <StyledCharsLeftLabel>({charsLeft})</StyledCharsLeftLabel>;
}
