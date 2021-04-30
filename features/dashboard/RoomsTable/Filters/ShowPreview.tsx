import { Box } from "@material-ui/core";

import styled from "styled-components";

const StyledShowPreview = styled(Box)`
  background: #fff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 0.25rem;
  padding: 0.25rem;
`;

export function ShowPreview({ show }) {
  return <StyledShowPreview>{show}</StyledShowPreview>;
}
