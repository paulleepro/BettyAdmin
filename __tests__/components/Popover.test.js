import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Popover } from "../../components/Popover";

afterEach(cleanup);

describe("Popover component test suit", () => {
  it("Should take a snapshot", () => {
    const { asFragment } = render(<Popover />);
    expect(asFragment(<Popover />)).toMatchSnapshot();
  });

  it("Should render with out error", () => {
    render(<Popover />);
  });
});
