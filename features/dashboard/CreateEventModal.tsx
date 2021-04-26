import { useState } from "react";
import styled from "styled-components";
import { Box, Divider, MenuItem } from "@material-ui/core";
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
import { CustomRecurrenceModal } from "./CustomRecurrenceModal";
import { TextareaAutosize } from "../../components/TextareaAutosize";
import { KeyboardDatePicker } from "../../components/KeyboardDatePicker";
import { AutocompleteList } from "../../components/AutocompleteList";

type CreateEventModalProps = ModalProps & {
  event: any;
};

export function CreateEventModal(props: CreateEventModalProps) {
  const title = props.event ? "Edit Event" : "Create Event";
  const [isEditingRecurrence, setIsEditingRecurrence] = useState(false);

  return (
    <Modal {...props}>
      <Preview />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <Input id="title" label="Room Title" margin="0 0 1.5rem 0" />
          <Input id="subtitle" label="Show Title" margin="0 0 1.5rem 0" />
          <AutocompleteList label="Hosts" />
          <InputContainer marginBottom="1.5rem">
            <InputLabel htmlFor="description">Description</InputLabel>
            <TextareaAutosize id="description" rowsMin={5} />
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
                <Select defaultValue="PST">
                  <MenuItem value="EST">EST</MenuItem>
                  <MenuItem value="CST">CST</MenuItem>
                  <MenuItem value="PST">PST</MenuItem>
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
          <Button color="primary" type="submit" disabled>
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

function Preview() {
  return (
    <StyledPreview marginRight="1rem">
      <PreviewTitle>Preview</PreviewTitle>
    </StyledPreview>
  );
}
