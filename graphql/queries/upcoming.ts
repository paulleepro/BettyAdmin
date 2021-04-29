import { gql } from "@apollo/client";


export const GetUpcomingRooms = gql`
  query getUpcomingRooms($limit: Int = -1, $offset: Int = 0) {
    upcomingRooms(limit: $limit, offset: $offset) {
      id
      title
      subtitle
      description
      startTime
      interestedCount

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
        followerCount
        followingCount
        # teams {
        #   id
        #   league
        #   name
        #   location
        #   logoUrl
        # }
      }
    }
  }
`;
