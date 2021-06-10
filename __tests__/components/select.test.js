import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Select } from "../../components/Select";

afterEach(cleanup);

describe("Select component test suit", () => {
  it("Should take a snapshot", () => {
    const { asFragment } = render(<Select defaultValue="" />);
    expect(asFragment(<Select />)).toMatchSnapshot();
  });

  it("Should render with out error", () => {
    render(<Select defaultValue="" />);
  });
});
