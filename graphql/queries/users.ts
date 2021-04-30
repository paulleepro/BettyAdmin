import { gql } from "@apollo/client";

export const SearchUsers = gql`
  query SearchUsers(
    $query: String = ""
    $onlyFollowers: Boolean = false
    $excludedOrbitId: String = ""
    $limit: Int = 5
    $offset: Int = 0
  ) {
    users(
      query: $query
      onlyFollowers: $onlyFollowers
      excludedOrbitId: $excludedOrbitId
      limit: $limit
      offset: $offset
    ) {
      results {
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
  }
`;

export const GetMe = gql`
  query GetMe {
    me {
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
