import { useQuery } from "@apollo/client";
import { format, utcToZonedTime } from "date-fns-tz";
import { useEffect, useRef, useState } from "react";

import { Button } from "../../../components/Button";
import { GetUpcomingRooms } from "../../../graphql/queries";
import { getRelativeDay } from "../utils/getRelativeDay";
import { UserLinks } from "../UserLinks";
import { LA_TZ } from "../constants/timezones";
import { deleteUpcomingRoom } from "../../../lib/api";
import { RoomsTableContainer } from "./RoomsTableContainer";
import { RoomsTableWrapper } from "./RoomsTableWrapper";

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
                <tr
                  key={rowIdx}
                  className={days === 0 ? "today" : ""}
                  onDoubleClick={() => {
                    if (
                      confirm(
                        "Are you sure you want to delete this upcoming room?"
                      )
                    ) {
                      deleteUpcomingRoom(row.id);
                      refetch();
                    }
                  }}
                >
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
                    <UserLinks users={row.speakers} />
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
