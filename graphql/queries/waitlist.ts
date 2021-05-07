import { gql } from "@apollo/client";

export const GetWaitlsitCount = gql`
  query GetWaitlsitCount {
    userWaitlistCount
  }
`;
