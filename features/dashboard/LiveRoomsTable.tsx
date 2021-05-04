import styled from "styled-components";
import { useQuery } from "@apollo/client";
import format from "date-fns/format";

import { TableContainer } from "./TableContainer";
import { TableWrapper } from "./TableWrapper";

import { POLL_INTERVAL } from "../../constants/query";
import { GetRooms } from "../../graphql/queries/room";
import { UserLinks } from "./UserLinks";
import { utcToZonedTime } from "date-fns-tz";
import { LA_TZ } from "./constants/timezones";

const StyledTableContainer = styled(TableContainer)`
  .start-at {
    .subtitle {
      color: #a7a7a7;
      font-size: 0.75rem;
    }
  }
  .room-id {
    color: #575757;
  }
`;

export function LiveRoomsTable() {
  const { data } = useQuery(GetRooms, { pollInterval: POLL_INTERVAL });

  if (!data) {
    return null;
  }

  const { rooms } = data;

  return (
    <StyledTableContainer>
      <TableWrapper>
        <table>
          <thead>
            <tr>
              <th>Start (PST)</th>
              <th>Room Title</th>
              <th>Hosts</th>
              <th>Room ID</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => {
              const date = utcToZonedTime(new Date(room.createdAt), LA_TZ);
              const startDate = format(date, "MM/dd");
              const startTime = format(date, "h:mm a");
              return (
                <tr key={room.id}>
                  <td className="start-at">
                    {startTime}
                    <div className="subtitle">{startDate}</div>
                  </td>
                  <td>{room.title}</td>
                  <td>
                    <UserLinks users={room.speakers} />
                  </td>
                  <td className="room-id">{room.id}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableWrapper>
    </StyledTableContainer>
  );
}
