import { gql } from "@apollo/client";

export const GetBannedUsers = gql`
  query GetBannedUsers {
    bannedUsers {
      id
      username
      firstName
      lastName
      bio
      photoUrl
      verified
      admin
      twitterUsername
      isFollowing
      isBanned
      gemCount
    }
  }
`;
