import styled from "styled-components";
import { Box } from "@material-ui/core";
import { UserLinks } from "./UserLinks";
import { timezones } from "./constants/timezones";
import { format } from "date-fns";

const StyledPreview = styled(Box)`
  margin-right: 1rem;
  margin-top: 20rem;
  width: 21.5rem;

  @media screen and (max-height: 800px) {
    align-self: center;
    margin-top: 0;
  }
`;

const PreviewTitle = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 1.75rem;

  background: #858585;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  color: #fff;
`;

const PreviewContent = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;

  margin-top: 1rem;

  background: #ffffff;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
`;

const ShowTitle = styled(Box)`
  color: #ff5c00;
  font-weight: 600;
  font-size: 0.8125rem;

  margin-bottom: 0.25rem;
`;

const RoomTitle = styled(Box)`
  font-weight: 600;
  font-size: 1.3125rem;

  margin-bottom: 0.5rem;
`;

const RoomTime = styled(Box)`
  margin-bottom: 0.125rem;
`;

const RoomHosts = styled(Box)`
  color: #0b7ce5;
`;

export function EventPreview(props: any) {
  const values = props.values;
  const dayOfWeek = format(values.startDate, "eeee");
  const date = format(values.startDate, "MMM d");
  const time = format(values.startTime, "h:mma");
  return (
    <StyledPreview marginRight="1rem">
      <PreviewTitle>Preview</PreviewTitle>
      <PreviewContent>
        <ShowTitle>🎙️ {values.subtitle}</ShowTitle>
        <RoomTitle>{values.title}</RoomTitle>
        <RoomTime>
          {dayOfWeek}, {date} • {time} {timezones[values.timezone]}
        </RoomTime>
        <RoomHosts>
          <UserLinks users={values.speakers} />
        </RoomHosts>
      </PreviewContent>
    </StyledPreview>
  );
}
