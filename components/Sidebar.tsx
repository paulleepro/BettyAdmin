import styled from "styled-components";

const SidebarContainer = styled.div`
  font-family: spotify-circular;
  margin-right: 1rem;
  padding: 1.25rem 0;
  width: 200px;
`;

const SidebarSectionLabel = styled.div`
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  margin-bottom: 1rem;
`;

export const Sidebar = () => (
  <SidebarContainer>
    <SidebarSectionLabel>Feed</SidebarSectionLabel>
    <SidebarSectionLabel>Moderation</SidebarSectionLabel>
  </SidebarContainer>
);
