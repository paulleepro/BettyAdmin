import { format, utcToZonedTime } from "date-fns-tz";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { Button } from "../../../components/Button";
import { UpcomingRoomsTableContainer } from "./UpcomingRoomsTableContainer";
import { UpcomingRoomsTableWrapper } from "./UpcomingRoomsTableWrapper";
import { UserLinks } from "../UserLinks";

import { deleteUpcomingRoom } from "../../../lib/api";
import { getRelativeDay } from "../utils/getRelativeDay";
import { LA_TZ } from "../constants/timezones";

import { UpcomingRoom } from "../../../@types/upcoming";
import { User } from "../../../@types/user";

type UpcomingRoomsTableProps = {
  upcomingRooms: UpcomingRoom[];
  onClick: (room: UpcomingRoom) => void;
  refetch: () => void;
};

export function UpcomingRoomsTable(props: UpcomingRoomsTableProps) {
  const { upcomingRooms, refetch } = props;

  const [shouldShowSkipToToday, setshouldShowSkipToToday] = useState(false);

  const mountedRef = useRef<boolean>(null);
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);
  const firstTodayRef = useRef<HTMLTableRowElement>(null);
  const observer = useRef<IntersectionObserver>(null);
  const laNow = utcToZonedTime(new Date(), LA_TZ);

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

  const handleDeleteRoom = async (id) => {
    await deleteUpcomingRoom(id);
    setTimeout(() => {
      refetch();
    }, 250);
  };

  // TODO: Refactor into hook
  useEffect(() => {
    if (!observer.current) {
      // Observe first today row and if it's not visible, show
      // skip to today button
      observer.current = new window.IntersectionObserver(
        ([entry]) => {
          if (!mountedRef.current) {
            mountedRef.current = true;
            return;
          }
          setshouldShowSkipToToday(!entry.isIntersecting);
        },
        { root: null, rootMargin: "0px", threshold: 0.1 }
      );
    } else {
      // clear all entries
      observer.current.disconnect();
    }

    if (upcomingRooms) {
      firstTodayRef.current = null;
      Array.from(tableBodyRef.current?.children || []).forEach(
        (tableRow: HTMLTableRowElement) => {
          if (!firstTodayRef.current && tableRow.className.includes("today")) {
            observer.current.observe(tableRow);
            firstTodayRef.current = tableRow;
          }
        }
      );
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [upcomingRooms]);

  if (!upcomingRooms) {
    return null;
  }

  return (
    <UpcomingRoomsTableContainer>
      {shouldShowSkipToToday && (
        <Button className="skipBtn" onClick={() => skipToToday()}>
          Skip to Today
        </Button>
      )}
      <UpcomingRoomsTableWrapper>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time (PST)</th>
              <th>Title</th>
              <th>Show</th>
              <th>Hosts</th>
              <th>Description</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody ref={tableBodyRef}>
            {upcomingRooms.map((row, rowIdx) => {
              const { laDate, days, relativeDay } = getRelativeDay(row, laNow);

              return (
                <tr
                  key={rowIdx}
                  className={days === 0 ? "today" : ""}
                  onClick={() => props.onClick(row)}
                >
                  <td>
                    <p className="relative-day">{relativeDay}</p>
                    <p className="date">
                      {format(laDate, "MM/dd", { timeZone: LA_TZ })}
                    </p>
                  </td>
                  <td className="nowrap">
                    {format(laDate, "h:mm a", { timeZone: LA_TZ })}
                  </td>
                  <td>{row.title}</td>
                  <td>{row.subtitle}</td>
                  <td>
                    <UserLinks users={row.speakers} />
                  </td>
                  <td className="description">{row.description}</td>
                  <td className="actions">
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRoom(row.id);
                      }}
                    >
                      <DeleteIcon color="action" fontSize="small" />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </UpcomingRoomsTableWrapper>
    </UpcomingRoomsTableContainer>
  );
}
