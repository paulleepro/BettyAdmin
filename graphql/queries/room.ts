import { gql } from "@apollo/client";

export const GetRooms = gql`
  query GetRooms($limit: Int, $offset: Int) {
    rooms(limit: $limit, offset: $offset) {
      id
      ownerId
      title
      subtitle
      imageUrl
      doRecording
      allowChat
      createdAt

      type

      speakers {
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

      listenerCount
      totalUserCount
    }
  }
`;
