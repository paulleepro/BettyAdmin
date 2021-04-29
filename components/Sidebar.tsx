import Link, { LinkProps } from 'next/link';
import styled from 'styled-components';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';

import {
  BanIcon,
  CalendarIcon,
  FlagIcon,
  ListViewIcon,
  LiveIcon,
} from '../components/icons';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;

  font-family: spotify-circular;
  margin-right: 1rem;
  width: 200px;
  overflow: auto;
`;

const SidebarSectionLabel = styled.div`
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding-left: 2rem;

  margin: 1.5rem 0 0.75rem 0;
`;

const StyledSidebarItem = styled.a<{ active: boolean }>`
  display: flex;
  align-items: center;

  cursor: pointer;
  height: 1.5rem;
  margin: 1rem 0;

  background: transparent;
  font-family: spotify-circular;
  font-size: 0.875rem;
  font-weight: 900;
  padding-left: 2rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 0.25rem;
    height: 100%;
    background-color: ${(props) => (props.active ? `#1ed760` : 'transparent')};
  }

  color: ${(props) => (props.active ? `#000` : '#868686')};

  &:hover {
    color: #000;
    svg path {
      fill-opacity: 1;
    }
  }

  svg {
    margin-right: 1rem;

    path {
      fill: #000;
      fill-opacity: ${(props) => (props.active ? '1' : '0.5')};
    }
  }
`;

type SidebarItemProps = {
  children: ReactNode;
} & LinkProps;

function SidebarItem(props: SidebarItemProps) {
  const router = useRouter();

  return (
    <Link href={props.href}>
      <StyledSidebarItem active={props.href === router.pathname}>
        {props.children}
      </StyledSidebarItem>
    </Link>
  );
}

export const Sidebar = () => (
  <SidebarContainer>
    <SidebarSectionLabel>Feed</SidebarSectionLabel>
    <SidebarItem href="/live">
      <LiveIcon />
      Live Rooms
    </SidebarItem>
    <SidebarItem href="/">
      <CalendarIcon />
      Schedule
    </SidebarItem>
    <SidebarSectionLabel>Moderation</SidebarSectionLabel>
    <SidebarItem href="/ban-users">
      <BanIcon />
      Ban Users
    </SidebarItem>
    <SidebarItem href="/user-reports">
      <FlagIcon />
      User Reports
    </SidebarItem>
    <SidebarItem href="/waitlist">
      <ListViewIcon />
      Waitlist
    </SidebarItem>
  </SidebarContainer>
);
