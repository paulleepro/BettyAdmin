import { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Divider, MenuItem } from "@material-ui/core";
import { useForm } from "react-hook-form";

import { Button } from "../../components/Button";
import { Input, InputContainer, InputLabel } from "../../components/Input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "../../components/Modal";
import { Select } from "../../components/Select";
import { TextareaAutosize } from "../../components/TextareaAutosize";
import { KeyboardDatePicker } from "../../components/KeyboardDatePicker";
import { AutocompleteList } from "../../components/AutocompleteList";
import { CustomRecurrenceModal } from "./CustomRecurrenceModal";
import { HostOptionPreview } from "./HostOptionPreview";

import { client } from "../../graphql/client";
import { SearchUsers } from "../../graphql/queries";

type CreateEventModalProps = ModalProps & {
  event?: any;
};

export function CreateEventModal(props: CreateEventModalProps) {
  const { handleSubmit, register, setValue, trigger, watch } = useForm();
  const title = props.event ? "Edit Event" : "Create Event";
  const [isEditingRecurrence, setIsEditingRecurrence] = useState(false);
  const values = watch();
  const isDisabled = validate(values);
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

  const handleRenderOption = (option) => <div>{option.username}</div>;
  const renderHostInput = (user) => {
    return <HostOptionPreview user={user} />;
  };
  const onSubmit = (data) => console.log(data);

  return (
    <Modal
      {...props}
      component="form"
      componentProps={{ onSubmit: handleSubmit(onSubmit) }}
    >
      <Preview />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <Input
            id="title"
            label="Room Title"
            margin="0 0 1.5rem 0"
            {...register("title")}
          />
          <Input id="subtitle" label="Show Title" margin="0 0 1.5rem 0" />
          <AutocompleteList
            label="Hosts"
            addLabel="Add another host"
            renderInput={renderHostInput}
            renderOption={handleRenderOption}
            loadOptions={handleLoadOptions}
            getOptionValue={(option) => option?.id || null}
            onChange={(hosts) => setValue("hosts", hosts)}
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
              value={Date.now()}
              onChange={console.log}
            />
          </InputContainer>
          <InputContainer marginBottom="1.5rem">
            <InputLabel>Time</InputLabel>
            <Box display="flex" alignItems="center" justifyContent="flex-start">
              <KeyboardDatePicker
                format="MM/dd/yyyy"
                value={Date.now()}
                onChange={console.log}
              />
              <Box marginLeft="1rem">
                <Select defaultValue="PST" {...register("time")}>
                  <MenuItem value="EST">EST</MenuItem>
                  <MenuItem value="CST">CST</MenuItem>
                  <MenuItem value="PST">PST</MenuItem>
                </Select>
              </Box>
            </Box>
          </InputContainer>
          <InputContainer maxWidth="11.5rem">
            <InputLabel>Repeat</InputLabel>
            <Select defaultValue="never" {...register("repeat")}>
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

const PreviewTitle = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 21.5rem;
  height: 1.75rem;

  background: #858585;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  color: #fff;
`;

const StyledPreview = styled(Box)`
  margin-right: 1rem;
  margin-top: 20rem;

  @media screen and (max-height: 800px) {
    align-self: center;
    margin-top: 0;
  }
`;

function Preview(props: any) {
  return (
    <StyledPreview marginRight="1rem">
      <PreviewTitle>Preview</PreviewTitle>
    </StyledPreview>
  );
}

function validate(values) {
  return false;
}
