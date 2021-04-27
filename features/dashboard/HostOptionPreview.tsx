import { Box, Typography } from "@material-ui/core";
import styled from "styled-components";

const HostOptionPreviewContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  border-radius: 0.25rem;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  height: 2.25rem;
  padding: 0.5rem;

  > * {
    margin-right: 0.5rem;
  }
`;

const HostName = styled(Typography)``;
const HostUsername = styled(Typography)`
  color: #858585;
  font-size: 0.6875rem;
`;

export function HostOptionPreview({ user }) {
  return (
    <HostOptionPreviewContainer>
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
    </HostOptionPreviewContainer>
  );
}
