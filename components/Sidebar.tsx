import Link, { LinkProps } from "next/link";
import {
  Experimental__IconStations,
  IconBanActive,
  IconFlag,
  IconReleased,
} from "@spotify-internal/encore-web";
import styled from "styled-components";
import { ReactNode } from "react";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;

  font-family: spotify-circular;
  margin-right: 1rem;
  width: 200px;
`;

const SidebarSectionLabel = styled.div`
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  margin: 1.5rem 0 0.75rem 0;
`;

const StyledSidebarItem = styled.a`
  display: flex;
  align-items: center;

  color: #868686;
  cursor: pointer;
  height: 2.25rem;
  margin-bottom: 0.5rem;

  background: transparent;
  font-family: spotify-circular;
  font-size: 0.875rem;
  font-weight: 900;

  svg {
    margin-right: 1rem;
  }
`;

type SidebarItemProps = {
  children: ReactNode;
} & LinkProps;

function SidebarItem(props: SidebarItemProps) {
  return (
    <Link href={props.href}>
      <StyledSidebarItem>{props.children}</StyledSidebarItem>
    </Link>
  );
}

export const Sidebar = () => (
  <SidebarContainer>
    <SidebarSectionLabel>Feed</SidebarSectionLabel>
    <SidebarItem href="/live">
      <Experimental__IconStations />
      Live Rooms
    </SidebarItem>
    <SidebarItem href="/">
      <IconReleased />
      Schedule
    </SidebarItem>
    <SidebarSectionLabel>Moderation</SidebarSectionLabel>
    <SidebarItem href="/ban-users">
      <IconBanActive />
      Ban Users
    </SidebarItem>
    <SidebarItem href="/user-reports">
      <IconFlag />
      User Reports
    </SidebarItem>
    <SidebarItem href="/waitlist">
      <IconReleased />
      Waitlist
    </SidebarItem>
  </SidebarContainer>
);
