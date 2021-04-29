import styled from "styled-components";

import { TableWrapper } from "../TableWrapper";

export const RoomsTableWrapper = styled(TableWrapper)`
  tr {
    th {
      td {
        &.description {
          color: #858585;
          max-width: 12rem;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        &.actions {
          * {
            opacity: 0;
          }
        }
      }
    }
  }

  &.today {
    scroll-margin: 2rem;

    td {
      background: rgba(255, 121, 46, 0.05);
    }
  }
`;
