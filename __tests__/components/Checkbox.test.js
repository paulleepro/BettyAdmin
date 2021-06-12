import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Checkbox } from "../../components/Checkbox";

afterEach(cleanup);

describe("Checkbox component test suit", () => {
  it("Should take a snapshot", () => {
    const { asFragment } = render(<Checkbox />);
    expect(asFragment(<Checkbox />)).toMatchSnapshot();
  });

  it("Should render with out error", () => {
    render(<Checkbox />);
  });
});
