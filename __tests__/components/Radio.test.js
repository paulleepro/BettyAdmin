import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Radio } from "../../components/Radio";

afterEach(cleanup);

describe("Radio component test suit", () => {
  it("Should take a snapshot", () => {
    const { asFragment } = render(<Radio />);
    expect(asFragment(<Radio />)).toMatchSnapshot();
  });

  it("Should render with out error", () => {
    render(<Radio defaultValue="" />);
  });
});
