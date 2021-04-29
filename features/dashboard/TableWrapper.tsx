import styled from "styled-components";

export const TableWrapper = styled.div`
  overflow: auto;
  position: relative;
  height: 100%;

  table {
    border-collapse: collapse;
    font-size: 0.9375rem;
    position: relative;
    width: 100%;

    thead {
      tr {
        position: sticky;
        top: 0;
      }
    }

    tr {
      position: relative;
      z-index: 0;

      th {
        position: sticky;
        top: 0;
        box-shadow: 0 2px 2px -1px #e5e5e5;

        background: #fff;
        z-index: 1;

        color: #858585;
        font-size: 0.6875rem;
        font-weight: 700;
        padding: 0.5rem;
        text-align: left;
        text-transform: uppercase;
        white-space: nowrap;
      }

      td {
        padding: 0.5rem;
        border-bottom: 1px solid #e5e5e5;

        b {
          font-weight: 600;
        }

        p {
          margin: 0;
          padding: 0;

          &.date {
            color: #bfbfbf;
          }
        }

        &.nowrap {
          white-space: nowrap;
        }
      }

      &:hover {
        background: #f5f5f5;

        td {
          &.actions {
            text-align: center;

            * {
              opacity: 1;
            }
          }
        }
      }
    }
  }
`;
