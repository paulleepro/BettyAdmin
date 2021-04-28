export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  photoUrl: string;
  verified: boolean;
  admin: boolean;
  twitterUsername: string;
  isFollowing: boolean;
  followerCount: number;
  followingCount: number;
};
