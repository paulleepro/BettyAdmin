import styled from "styled-components";
import {
  FormControlLabel as MUIFormControlLabel,
  FormControlLabelProps,
} from "@material-ui/core";

const StyledFormControlLabel = styled(MUIFormControlLabel)`
  font-size: 0.9375rem;
`;

export const FormControlLabel = (props: FormControlLabelProps) => {
  return <StyledFormControlLabel {...props} />;
};
