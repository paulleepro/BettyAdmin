import React from "react";
import { cleanup } from "@testing-library/react";
import { KeyboardTimePicker } from "../../components/KeyboardTimePicker";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

afterEach(cleanup);

describe("KeyboardTimePicker component test suit", () => {
  it("Should render with out error", () => {
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker />
    </MuiPickersUtilsProvider>;
  });
});
