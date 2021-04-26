import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  padding: 0 1.5rem;
  margin-top: 1.5rem;
  img {
    height: 2rem;
  }
`;

export const Header = () => (
  <HeaderContainer>
    <img src="/logo.svg" />
  </HeaderContainer>
);
