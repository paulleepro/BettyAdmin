import styled from "styled-components";

export const RoomsTableContainer = styled.div`
  flex: 1;
  margin-top: 1rem;
  overflow: hidden;
  position: relative;

  .skipBtn {
    background: #fff;
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
    font-weight: 600;
    border: 0;
    color: #1f1f1f;
    padding: 0.5rem 0.75rem;
    position: absolute;
    right: 1.5rem;
    top: 2.5rem;
    z-index: 10;
  }
`;
