import {
  Box,
  FormControlLabel,
  MenuItem,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Button";

import { Input, InputContainer, InputLabel } from "../../components/Input";
import { KeyboardDatePicker } from "../../components/KeyboardDatePicker";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "../../components/Modal";
import { Radio } from "../../components/Radio";
import { Select } from "../../components/Select";

export function CustomRecurrenceModal(props: ModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const values = watch();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleDateChange = (d) => {
    if (d && !Number.isNaN(d?.getTime())) {
      setValue("repeat_on", d.getTime());
    } else {
      setValue("repeat_on", null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal {...props}>
        <ModalContent alignSelf="center">
          <ModalHeader>Custom Recurrence</ModalHeader>
          <ModalBody>
            <Box marginBottom="1.5rem">
              <InputLabel htmlFor="repeat_amount">Repeat every</InputLabel>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Box maxWidth="3.5rem">
                  <Input
                    id="repeat_amount"
                    type="number"
                    defaultValue={1}
                    margin="0"
                    {...register("repeat_amount")}
                  />
                </Box>
                <Box marginLeft="1rem">
                  <Select defaultValue="day" {...register("repeat_frequency")}>
                    <MenuItem value="day">Day</MenuItem>
                    <MenuItem value="week">Week</MenuItem>
                    <MenuItem value="month">Month</MenuItem>
                    <MenuItem value="year">Year</MenuItem>
                  </Select>
                </Box>
              </Box>
            </Box>
            <InputContainer>
              <InputLabel>Ends</InputLabel>
              <RadioGroup defaultValue={"never"} {...register("ends")}>
                <Box width="7.5rem">
                  <FormControlLabel
                    value="never"
                    control={<Radio />}
                    label="Never"
                  />
                </Box>
                <Box display="flex" alignItems="center">
                  <Box width="7.5rem">
                    <FormControlLabel
                      value="on"
                      control={<Radio />}
                      label="On"
                    />
                  </Box>
                  <Box maxWidth="9.5rem">
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      value={values.repeat_on}
                      onChange={handleDateChange}
                    />
                  </Box>
                </Box>
                <Box display="flex" alignItems="center">
                  <Box width="7.5rem">
                    <FormControlLabel
                      value="after"
                      control={<Radio />}
                      label="After"
                    />
                  </Box>
                  <Box maxWidth="3.5rem" marginRight="0.5rem">
                    <Input
                      id="repeat_occurrences"
                      type="number"
                      defaultValue={1}
                      margin="0"
                    />
                  </Box>
                  <Typography>occurrences</Typography>
                </Box>
              </RadioGroup>
            </InputContainer>
          </ModalBody>
          <ModalFooter>
            <Button color="default" onClick={() => props.onClose()}>
              Cancel
            </Button>
            <Button color="secondary" variant="text" type="submit">
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </form>
  );
}
