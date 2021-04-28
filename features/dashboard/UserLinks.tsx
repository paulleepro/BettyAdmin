import styled from "styled-components";
import { Box } from "@material-ui/core";

const StyledLink = styled.a`
  color: #0b7ce5;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export function UserLinks(props) {
  return (
    <Box display="flex">
      {props.users.map(
        (u, i, a) =>
          u && (
            <Box key={u.id} marginRight="0.25rem">
              <StyledLink href="">
                {u.firstName} {u.lastName}
              </StyledLink>
              {i < a.length - 1 && ","}
            </Box>
          )
      )}
    </Box>
  );
}
