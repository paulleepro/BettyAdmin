import styled from "styled-components";
import MUIRadio, { RadioProps } from "@material-ui/core/Radio";

const StyledRadio = styled(MUIRadio)``;

export function Radio(props: RadioProps) {
  return <StyledRadio {...props} color="primary" />;
}
