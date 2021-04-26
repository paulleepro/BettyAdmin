import styled from "styled-components";

export const SearchBar = styled.div`
  display: flex;
  align-items: center;

  input {
    width: 23rem;
    background: #f5f5f5;

    &:focus {
      background: #fff;
    }
  }
`;
