import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { TableContainer } from "./TableContainer";
import { TableWrapper } from "./TableWrapper";
import { UserOption } from "./UserOption";

import { POLL_INTERVAL } from "../../constants/query";
import { GetBannedUsers } from "../../graphql/queries/ban";
import { Button } from "../../components/Button";
import { unbanUser } from "../../lib/api";

type BannedUsersTableProps = {
  search?: string;
  lastFetchRequested?: number;
};

export function BannedUsersTable(props: BannedUsersTableProps) {
  const { lastFetchRequested } = props;
  const [banning, setBanning] = useState({});
  const { data, refetch } = useQuery(GetBannedUsers, {
    pollInterval: POLL_INTERVAL,
  });
  const handleUnban = (user) => {
    setBanning({ [user.id]: true });
    unbanUser([user.id])
      .then((r) => {
        if (r.ok) {
          // Update banned users list
        }
      })
      .catch(console.error)
      .finally(() => {
        setBanning({ [user.id]: false });
        setTimeout(() => {
          refetch();
        }, 250);
      });
  };

  useEffect(() => {
    refetch();
  }, [lastFetchRequested]);

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
            {bannedUsers
              .filter((user) => {
                if (props.search == "") {
                  return true;
                }

                return JSON.stringify(user)
                  .toLowerCase()
                  .includes(props.search);
              })
              .map((user) => (
                <tr key={user.id}>
                  <td>
                    <UserOption user={user} />
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <Button
                      color="primary"
                      variant="text"
                      disabled={banning[user.id]}
                      onClick={() => handleUnban(user)}
                    >
                      {banning[user.id] ? "Unbanning" : "Unban"}
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </TableWrapper>
    </TableContainer>
  );
}
