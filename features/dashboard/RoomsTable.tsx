import { useQuery } from "@apollo/client";
import { Box, Typography } from "@material-ui/core";
import { differenceInCalendarDays } from "date-fns";
import { format, utcToZonedTime } from "date-fns-tz";

import styled from "styled-components";
import { GetUpcomingRooms } from "../../graphql/queries";

const LA_TZ = "America/Los_Angeles";

const RoomsTableContainer = styled.div`
  flex: 1;
  margin-top: 1rem;
  overflow: auto;

  table {
    border-collapse: collapse;
    font-size: 0.9375rem;
    position: relative;
    width: 100%;

    thead {
      tr {
        position: sticky;
        top: 0;
      }
    }

    tr {
      position: relative;
      z-index: 0;

      th {
        position: sticky;
        top: 0; /* Don't forget this, required for the stickiness */
        box-shadow: 0 2px 2px -1px #e5e5e5;

        background: #fff;
        z-index: 1;

        color: #858585;
        font-size: 0.6875rem;
        font-weight: 700;
        padding: 0.5rem;
        text-align: left;
        text-transform: uppercase;
      }

      td {
        padding: 0.5rem;

        b {
          font-weight: 600;
        }

        p {
          margin: 0;
          padding: 0;

          &.date {
            color: #bfbfbf;
          }
        }
      }

      &:hover {
        background: #f5f5f5;
      }

      &.today {
        td {
          background: rgba(255, 121, 46, 0.05);
        }
      }
    }
  }
`;

const StyledLink = styled.a`
  color: #0b7ce5;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export function RoomsTable() {
  const { loading, error, data } = useQuery(GetUpcomingRooms);
  const laNow = utcToZonedTime(new Date(), LA_TZ);

  if (loading || error) {
    return null;
  }

  const { upcomingRooms } = data;

  return (
    <RoomsTableContainer>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time (PST)</th>
            <th>Title</th>
            <th>Show</th>
            <th>Hosts</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {upcomingRooms.map((row, rowIdx) => {
            const laDate = utcToZonedTime(row.startTime, LA_TZ);
            const days = differenceInCalendarDays(laDate, laNow);
            const relativeDay =
              days < 2 ? (
                days > 0 ? (
                  "Tomorrow"
                ) : (
                  <b>Today</b>
                )
              ) : (
                format(laDate, "eee")
              );
            return (
              <tr key={rowIdx} className={days === 0 ? "today" : ""}>
                <td>
                  <p className="relative-day">{relativeDay}</p>
                  <p className="date">
                    {format(laDate, "MM/dd", { timeZone: LA_TZ })}
                  </p>
                </td>
                <td>{format(laDate, "h:mm a", { timeZone: LA_TZ })}</td>
                <td>{row.title}</td>
                <td>{row.subtitle}</td>
                <td>
                  {row.speakers.map((s, i, a) => (
                    <Box key={s.id}>
                      <StyledLink href="">
                        {s.firstName} {s.lastName}
                      </StyledLink>
                      {i < a.length - 1 && ","}
                    </Box>
                  ))}
                </td>
                <td
                  style={{
                    maxWidth: "12rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row.description}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </RoomsTableContainer>
  );
}
