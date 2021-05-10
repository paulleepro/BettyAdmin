import { useQuery } from "@apollo/client";

import { TableContainer } from "./TableContainer";
import { TableWrapper } from "./TableWrapper";
import { UserOption } from "./UserOption";

import { POLL_INTERVAL } from "../../constants/query";
import { SearchUsers } from "../../graphql/queries";
import VerifiedIcon from "../../components/icons/Verified";

type UserInformationTableProps = {
  search?: string;
};

export function UserInformationTable(props: UserInformationTableProps) {
  const { data } = useQuery(SearchUsers, {
    pollInterval: POLL_INTERVAL,
  });

  if (!data) {
    return null;
  }

  const {
    users: { results },
  } = data;

  return (
    <TableContainer>
      <TableWrapper>
        <table>
          <thead>
            <tr>
              <th>Name/Username</th>
              <th>Verified</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            {results
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
                  <td>{user.verified ? <VerifiedIcon /> : null}</td>
                  <td>{user.id}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </TableWrapper>
    </TableContainer>
  );
}
