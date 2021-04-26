import { FC } from "react";
import styled from "styled-components";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { LayoutContainer } from "../components/LayoutContainer";

const Wrapper = styled.div`
  display: flex;
  margin: 1.5rem 1.5rem 0 1.5rem;
  padding-bottom: 1.5rem;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  overflow: hidden;
`;

export const MainLayout: FC = (props) => {
  return (
    <LayoutContainer>
      <Header />
      <Wrapper>
        <Sidebar />
        <ContentContainer>{props.children}</ContentContainer>
      </Wrapper>
    </LayoutContainer>
  );
};
