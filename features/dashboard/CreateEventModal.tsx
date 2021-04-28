import { useEffect, useState } from "react";
import { Box, Divider, MenuItem } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { getTimezoneOffset } from "date-fns-tz";

import { AutocompleteList } from "../../components/AutocompleteList";
import { Button } from "../../components/Button";
import { CustomRecurrenceModal } from "./CustomRecurrenceModal";
import { EventPreview } from "./EventPreview";
import { Input, InputContainer, InputLabel } from "../../components/Input";
import { KeyboardDatePicker } from "../../components/KeyboardDatePicker";
import { KeyboardTimePicker } from "../../components/KeyboardTimePicker";
import { Select } from "../../components/Select";
import { TextareaAutosize } from "../../components/TextareaAutosize";
import { UserOption } from "./UserOption";
import { UserOptionPreview } from "./UserOptionPreview";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "../../components/Modal";

import { createUpcomingRoom } from "../../lib/api";
import { client } from "../../graphql/client";
import { SearchUsers } from "../../graphql/queries";
import { timezones } from "./constants/timezones";
import { nextHour } from "./constants/time";

type CreateEventModalProps = ModalProps & {
  event?: any;
};

export function CreateEventModal(props: CreateEventModalProps) {
  const { isOpen } = props;
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
  const title = props.event ? "Edit Event" : "Create Event";
  const [isEditingRecurrence, setIsEditingRecurrence] = useState(false);
  const values = watch();
  const isDisabled = !validate(values);
  const handleLoadOptions = (q) =>
    client
      .query({ query: SearchUsers, variables: { query: q } })
      .then((d) => {
        return d.data.users.results;
      })
      .catch((e) => {
        console.log(e);
        return [];
      });

  const handleRenderOption = (option) => <UserOption user={option} />;
  const renderHostInput = (user) => {
    return <UserOptionPreview user={user} />;
  };
  const onSubmit = (data) => {
    const startDate = new Date(data.startDate);
    const startTime = new Date(data.startTime);
    startDate.setHours(startTime.getHours());
    startDate.setMinutes(startTime.getMinutes());
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);

    // offsetMs is the number of milliseconds the local machine
    // is ahead of data.timezone by
    const offsetMs =
      -getTimezoneOffset(data.timezone) -
      startDate.getTimezoneOffset() * 60 * 1000;

    const startedAt = new Date(startDate.getTime() + offsetMs).toISOString();

    createUpcomingRoom({
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      speakerIds: data.speakerIds,
      startedAt,
    })
      .then((r) => {
        if (r.ok) {
          props.onClose();
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen]);

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
            {...register("title")}
          />
          <Input
            id="subtitle"
            label="Show Title"
            margin="0 0 1.5rem 0"
            {...register("subtitle")}
          />
          <AutocompleteList
            label="Hosts"
            addLabel="Add another host"
            renderInput={renderHostInput}
            renderOption={handleRenderOption}
            loadOptions={handleLoadOptions}
            getOptionValue={(option) => option?.id || null}
            onChange={(hosts, rawHosts) => {
              setValue("speakerIds", hosts);
              setValue("speakers", rawHosts);
            }}
          />
          <InputContainer marginBottom="1.5rem">
            <InputLabel htmlFor="description">Description</InputLabel>
            <TextareaAutosize
              id="description"
              rowsMin={5}
              {...register("description")}
            />
          </InputContainer>
          <InputContainer maxWidth="11.5rem" marginBottom="1.5rem">
            <InputLabel>Date</InputLabel>
            <KeyboardDatePicker
              format="MM/dd/yyyy"
              minDate={Date.now()}
              value={values.startDate || null}
              onChange={(d) => setValue("startDate", d?.getTime())}
            />
          </InputContainer>
          <InputContainer marginBottom="1.5rem">
            <InputLabel>Time</InputLabel>
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
            Create Event
          </Button>
        </ModalFooter>
      </ModalContent>
      <CustomRecurrenceModal
        isOpen={isEditingRecurrence}
        onClose={() => setIsEditingRecurrence(false)}
      />
    </Modal>
  );
}

function validate(values) {
  if (!values.title || !values.description || !values.startDate) return false;
  if (!values.speakerIds?.length || !values.speakerIds.every(Boolean)) {
    return false;
  }

  return true;
}
