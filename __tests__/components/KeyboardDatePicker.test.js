import React from "react";
import { cleanup } from "@testing-library/react";
import { KeyboardDatePicker } from "../../components/KeyboardDatePicker";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

afterEach(cleanup);

describe("KeyboardDatePicker component test suit", () => {
  it("Should render with out error", () => {
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker />
    </MuiPickersUtilsProvider>;
  });
});
