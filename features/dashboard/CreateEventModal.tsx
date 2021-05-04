import { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Divider, MenuItem } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { getTimezoneOffset, utcToZonedTime } from "date-fns-tz";

import { AutocompleteList } from "../../components/AutocompleteList";
import { Button } from "../../components/Button";
import { CustomRecurrenceModal } from "./CustomRecurrenceModal";
import { EventPreview } from "./EventPreview";
import { Input, InputContainer, InputLabel } from "../../components/Input";
import { KeyboardDatePicker } from "../../components/KeyboardDatePicker";
import { KeyboardTimePicker } from "../../components/KeyboardTimePicker";
import { Select } from "../../components/Select";
import { TextareaAutosize } from "../../components/TextareaAutosize";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "../../components/Modal";

import {
  RoomPayload,
  createUpcomingRoom,
  updateUpcomingRoom,
} from "../../lib/api";

import { LA_TZ, timezones } from "./constants/timezones";
import { nextHour } from "./constants/time";

import { UpcomingRoom } from "../../@types/upcoming";
import {
  handleRenderOption,
  renderHostInput,
  searchHosts,
} from "./utils/hostsAutocomplete";
import { getOffsetMs } from "./utils/date";

const EventID = styled(Box)`
  align-self: flex-start;

  background: #f5f5f5;
  border-radius: 0.25rem;
  color: #858585;
  font-size: 0.8125rem;
  padding: 0.25rem 0.5rem;
  margin-top: -1rem;
  margin-bottom: 1.5rem;
`;

type CreateEventModalProps = ModalProps & {
  existing?: UpcomingRoom;
};

export const CreateEventModal = (props: CreateEventModalProps) => {
  const { isOpen, existing } = props;
  const { handleSubmit, register, reset, setValue, trigger, watch } = useForm({
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      startDate: Date.now(),
      startTime: nextHour().getTime(),
      timezone: "America/Los_Angeles",
      speakerIds: [],
      speakers: [],
    },
  });
  const title = existing ? "Edit Event" : "Create Event";
  const submitLabel = existing ? "Save Changes" : "Create Event";
  const [isEditingRecurrence, setIsEditingRecurrence] = useState(false);
  const values = watch();
  const isDisabled = !validate(values);

  const onSubmit = (data) => {
    const startDate = new Date(data.startDate);
    const startTime = new Date(data.startTime);
    startDate.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0);

    const offsetMs = getOffsetMs(data.timezone);
    const startedAt = new Date(startDate.getTime() + offsetMs).toISOString();
    const payload: RoomPayload = {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      speakerIds: data.speakerIds,
      startedAt,
    };

    let resp: Promise<any>;

    if (existing) {
      resp = updateUpcomingRoom(existing.id, payload);
    } else {
      resp = createUpcomingRoom(payload);
    }

    resp
      .then((r) => {
        if (r.ok) {
          // Give some time to create the room
          setTimeout(() => {
            props.onClose();
          }, 250);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen]);

  useEffect(() => {
    if (existing) {
      const laStartTime = utcToZonedTime(existing.startTime, LA_TZ);
      setValue("title", existing.title);
      setValue("subtitle", existing.subtitle);
      setValue("description", existing.description);
      setValue("startDate", laStartTime.getTime());
      setValue("startTime", laStartTime.getTime());
      setValue("timezone", "America/Los_Angeles");
      setValue(
        "speakerIds",
        existing.speakers.map((s) => s.id)
      );
      setValue("speakers", existing.speakers);
    } else {
      reset();
    }
  }, [existing]);

  return (
    <Modal
      {...props}
      component="form"
      componentProps={{ onSubmit: handleSubmit(onSubmit) }}
    >
      <EventPreview values={values} />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <Input
            id="title"
            label="Room Title"
            margin="0 0 1.5rem 0"
            required
            {...register("title")}
          />
          {existing && (
            <EventID borderRadius="0.25rem">ID: {existing.id}</EventID>
          )}
          <Input
            id="subtitle"
            label="Show Title"
            margin="0 0 1.5rem 0"
            required
            {...register("subtitle")}
          />
          <Box marginBottom="1.5rem">
            <AutocompleteList
              label="Hosts"
              addLabel="Add another host"
              required
              renderInput={renderHostInput}
              renderOption={handleRenderOption}
              loadOptions={searchHosts}
              defaultValue={values.speakers}
              getOptionValue={(option) => option?.id || null}
              onChange={(hosts, rawHosts) => {
                setValue("speakerIds", hosts);
                setValue("speakers", rawHosts);
              }}
            />
          </Box>
          <InputContainer marginBottom="1.5rem">
            <InputLabel htmlFor="description" required>Description</InputLabel>
            <TextareaAutosize
              id="description"
              rowsMin={5}
              {...register("description")}
            />
          </InputContainer>
          <InputContainer maxWidth="11.5rem" marginBottom="1.5rem">
            <InputLabel required>Date</InputLabel>
            <KeyboardDatePicker
              format="MM/dd/yyyy"
              minDate={Date.now()}
              value={values.startDate || null}
              onChange={(d) => setValue("startDate", d?.getTime())}
            />
          </InputContainer>
          <InputContainer marginBottom="1.5rem">
            <InputLabel required>Time</InputLabel>
            <Box display="flex" alignItems="center" justifyContent="flex-start">
              <Box maxWidth="8rem">
                <KeyboardTimePicker
                  value={values.startTime || null}
                  onChange={(d) => setValue("startTime", d?.getTime())}
                />
              </Box>
              <Box marginLeft="1rem">
                <Select value={values.timezone} {...register("timezone")}>
                  {Object.entries(timezones).map(([value, label]) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          </InputContainer>
          <InputContainer maxWidth="11.5rem">
            <InputLabel>Repeat</InputLabel>
            <Select defaultValue="never">
              <MenuItem value="never">Never</MenuItem>
              <MenuItem value="every_day">Every Day</MenuItem>
              <MenuItem value="every_week">Every Week</MenuItem>
              <MenuItem value="every_2_weeks">Every 2 Weeks</MenuItem>
              <MenuItem value="every_month">Every Month</MenuItem>
              <MenuItem value="every_year">Every Year</MenuItem>
              <Box marginBottom="0.5rem">
                <Divider light />
              </Box>
              <MenuItem
                value="custom"
                onClick={() => setIsEditingRecurrence(true)}
              >
                Custom
              </MenuItem>
            </Select>
          </InputContainer>
        </ModalBody>
        <ModalFooter>
          <Button color="default" onClick={() => props.onClose()}>
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            disabled={isDisabled}
            onClick={() => trigger()}
          >
            {submitLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
      <CustomRecurrenceModal
        isOpen={isEditingRecurrence}
        onClose={() => setIsEditingRecurrence(false)}
      />
    </Modal>
  );
};

function validate(values) {
  if (!values.title || !values.description || !values.startDate) return false;
  if (!values.speakerIds?.length || !values.speakerIds.every(Boolean)) {
    return false;
  }

  return true;
}
