import { useQuery } from "@apollo/client";

import { TableContainer } from "./TableContainer";
import { TableWrapper } from "./TableWrapper";

import { POLL_INTERVAL } from "../../constants/query";
import { GetRooms } from "../../graphql/queries/room";
import { getRelativeDay } from "./utils/getRelativeDay";
import { UserLinks } from "./UserLinks";

export function LiveRoomsTable() {
  const { data } = useQuery(GetRooms, { pollInterval: POLL_INTERVAL });

  if (!data) {
    return null;
  }

  const { rooms } = data;

  return (
    <TableContainer>
      <TableWrapper>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Show</th>
              <th>Hosts</th>
              <th>Description</th>
              <th>Listeners</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => {
              return (
                <tr key={room.id}>
                  <td>{room.title}</td>
                  <td>{room.subtitle}</td>
                  <td>
                    <UserLinks users={room.speakers} />
                  </td>
                  <td className="description">{room.description}</td>
                  <td>{room.listenerCount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableWrapper>
    </TableContainer>
  );
}
