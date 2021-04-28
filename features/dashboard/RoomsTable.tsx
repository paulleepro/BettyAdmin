import { useQuery } from "@apollo/client";
import { Box, Typography } from "@material-ui/core";
import { differenceInCalendarDays } from "date-fns";
import { format, utcToZonedTime } from "date-fns-tz";
import { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import { Button } from "../../components/Button";
import { GetUpcomingRooms } from "../../graphql/queries";

const LA_TZ = "America/Los_Angeles";

const RoomsTableContainer = styled.div`
  flex: 1;
  margin-top: 1rem;
  overflow: hidden;
  position: relative;

  .skipBtn {
    background: #fff;
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
    font-weight: 600;
    border: 0;
    color: #1f1f1f;
    padding: 0.5rem 0.75rem;
    position: absolute;
    right: 1.5rem;
    top: 2.5rem;
    z-index: 10;
  }
`;

const RoomsTableWrapper = styled.div`
  overflow: auto;
  position: relative;
  height: 100%;

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
        border-bottom: 1px solid #e5e5e5;

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

        &.description {
          color: #858585;
          max-width: 12rem;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      &:hover {
        background: #f5f5f5;
      }

      &.today {
        scroll-margin: 2rem;
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

type RoomsTableProps = {
  lastFetchRequested?: Number;
};

export function RoomsTable(props: RoomsTableProps) {
  const { lastFetchRequested } = props;
  const { loading, error, data, refetch } = useQuery(GetUpcomingRooms);
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);
  const firstTodayRef = useRef<HTMLTableRowElement>(null);
  const observer = useRef<IntersectionObserver>(null);
  const laNow = utcToZonedTime(new Date(), LA_TZ);
  const [shouldShowToday, setShouldShowToday] = useState(false);
  const skipToToday = () => {
    if (!firstTodayRef.current) {
      return;
    }

    firstTodayRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
  };

  // TODO: Refactor into hook
  useEffect(() => {
    if (!observer.current) {
      // Observe first today row and if it's not visible, show
      // skip to today button
      observer.current = new window.IntersectionObserver(
        ([entry]) => {
          setShouldShowToday(!entry.isIntersecting);
        },
        { root: tableBodyRef.current, rootMargin: "0px", threshold: 0.1 }
      );
    } else {
      // clear all entries
      observer.current.disconnect();
    }

    if (data) {
      firstTodayRef.current = null;
      Array.from(tableBodyRef.current.children || []).forEach(
        (tableRow: HTMLTableRowElement) => {
          if (!firstTodayRef.current && tableRow.className.includes("today")) {
            observer.current.observe(tableRow);
            firstTodayRef.current = tableRow;
          }
        }
      );
    }

    return () => observer.current?.disconnect();
  }, [data]);

  useEffect(() => {
    refetch();
  }, [lastFetchRequested]);

  if (loading || error) {
    return null;
  }

  const { upcomingRooms } = data;

  return (
    <RoomsTableContainer>
      {shouldShowToday && (
        <Button className="skipBtn" onClick={() => skipToToday()}>
          Skip to Today
        </Button>
      )}
      <RoomsTableWrapper>
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
          <tbody ref={tableBodyRef}>
            {upcomingRooms.map((row, rowIdx) => {
              const { laDate, days, relativeDay } = getRelativeDay(row, laNow);

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
                  <td className="description">{row.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </RoomsTableWrapper>
    </RoomsTableContainer>
  );
}

function getRelativeDay(
  upcomingRoom,
  laNow = utcToZonedTime(new Date(), LA_TZ)
) {
  const laDate = utcToZonedTime(upcomingRoom.startTime, LA_TZ);
  const days = differenceInCalendarDays(laDate, laNow);
  const relativeDay =
    days < 2 ? days > 0 ? "Tomorrow" : <b>Today</b> : format(laDate, "eee");

  return { laDate, days, relativeDay };
}
