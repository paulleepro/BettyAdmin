import { FC } from "react";
import styled from "styled-components";
import { Header } from "../components/Header";

const LayoutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  position: fixed;

  height: 100vh;
  left: 0;
  top: 0;
  width: 100vw;

  background: #f5f5f5;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1.5rem;
  overflow: hidden;
  max-width: 32rem;
  width: 100%;
  margin: 0 auto;
`;

type ContentContainerProps = {
  maxWidth?: string;
};

const ContentContainer = styled.div<ContentContainerProps>`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin: 1.5rem;
  overflow: hidden;
  max-width: ${(props) => props.maxWidth || "32rem"};
`;

type CneteredLayoutProps = {
  maxWidth?: string;
};

export const CenteredLayout: FC<CneteredLayoutProps> = (props) => {
  return (
    <LayoutContainer>
      <Wrapper>
        <Header />
        <ContentContainer maxWidth={props.maxWidth}>
          {props.children}
        </ContentContainer>
      </Wrapper>
    </LayoutContainer>
  );
};
