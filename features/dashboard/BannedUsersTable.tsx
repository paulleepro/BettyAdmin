import { useQuery } from "@apollo/client";

import { TableContainer } from "./TableContainer";
import { TableWrapper } from "./TableWrapper";
import { UserOption } from "./UserOption";

import { POLL_INTERVAL } from "../../constants/query";
import { GetBannedUsers } from "../../graphql/queries/ban";

export function BannedUsersTable() {
  const { data } = useQuery(GetBannedUsers, { pollInterval: POLL_INTERVAL });

  if (!data) {
    return null;
  }

  const { bannedUsers } = data;

  return (
    <TableContainer>
      <TableWrapper>
        <table>
          <thead>
            <tr>
              <th>Banned Users</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {bannedUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <UserOption user={user} />
                </td>
                <td style={{ textAlign: "right" }}>Unban</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>
    </TableContainer>
  );
}
