import styled from "styled-components";

import { TableWrapper } from "../TableWrapper";

export const UpcomingRoomsTableWrapper = styled(TableWrapper)`
  tr {
    td {
      &.description {
        color: #858585;
        max-width: 12rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &.actions {
        text-align: right;
        opacity: 0;
      }
    }

    &:hover {
      td.actions {
        opacity: 1;
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
