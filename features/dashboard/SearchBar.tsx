import styled from "styled-components";
import { InputContainer, StyledInput } from "../../components/Input";

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  ${InputContainer} {
    flex: 0;
  }

  ${StyledInput} {
    width: 23rem;
    background: #f5f5f5;

    &:focus {
      background: #fff;
    }
  }
`;
