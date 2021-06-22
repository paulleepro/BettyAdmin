import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Autocomplete } from "../../components/Autocomplete";

afterEach(cleanup);

describe("Autocomplete component test suit", () => {
  it("Should take a snapshot", () => {
    const { asFragment } = render(<Autocomplete />);
    expect(asFragment(<Autocomplete />)).toMatchSnapshot();
  });

  it("Should render with out error", () => {
    render(
      <Autocomplete
        format="MM/dd/yyyy"
        minDate={Date.now()}
        value={null}
        onChange={render}
      />
    );
  });
});
