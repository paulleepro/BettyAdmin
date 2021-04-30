import { User } from "../../../@types/user";
import { client } from "../../../graphql/client";
import { SearchUsers } from "../../../graphql/queries";
import { UserOption } from "../UserOption";
import { UserOptionPreview } from "../UserOptionPreview";

export const searchHosts = async (q: string): Promise<User[]> =>
  client
    .query({ query: SearchUsers, variables: { query: q } })
    .then((d) => {
      return d.data.users.results;
    })
    .catch((e) => {
      return [];
    });

export const handleRenderOption = (option: User) => (
  <UserOption user={option} />
);
export const renderHostInput = (user: User) => {
  return <UserOptionPreview user={user} />;
};
