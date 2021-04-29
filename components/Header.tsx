import Link from "next/link";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  padding: 0 1.5rem;
  margin-top: 1.5rem;
  .logo,
  img {
    height: 2rem;
  }
`;

export const Header = () => (
  <HeaderContainer>
    <Link href="/">
      <a className="logo">
        <img src="/logo.svg" />
      </a>
    </Link>
  </HeaderContainer>
);
