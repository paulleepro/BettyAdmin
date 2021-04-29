import styled from "styled-components";
import { Checkbox as MUICheckbox, CheckboxProps } from "@material-ui/core";

const StyledCheckbox = styled(MUICheckbox)`
  .MuiSvgIcon-root {
    color: #bfbfbf;
  }

  &.Mui-checked {
    .MuiSvgIcon-root {
      color: #0b7ce5;
    }
  }
`;

export const Checkbox = (props: CheckboxProps) => {
  return <StyledCheckbox {...props} color="primary" />;
};
