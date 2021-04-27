import { Box, Typography } from "@material-ui/core";
import styled from "styled-components";

const UserOptionContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  > * {
    margin-right: 0.5rem;
  }
`;

const HostName = styled(Typography)``;
const HostUsername = styled(Typography)`
  color: #858585;
  font-size: 0.6875rem;
`;

export function UserOption({ user }) {
  return (
    <UserOptionContainer>
      <Box
        width="1.25rem"
        height="1.25rem"
        borderRadius="4rem"
        overflow="hidden"
      >
        <img src={user.photoUrl} width="100%" />
      </Box>
      <HostName>
        {user.firstName} {user.lastName}
      </HostName>
      <HostUsername>{user.username}</HostUsername>
    </UserOptionContainer>
  );
}
