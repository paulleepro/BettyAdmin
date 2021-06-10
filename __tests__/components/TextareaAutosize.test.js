import React from "react";
import { cleanup, render } from "@testing-library/react";
import { TextareaAutosize } from "../../components/TextareaAutosize";

afterEach(cleanup);

describe("TextareaAutosize component test suit", () => {
  it("Should take a snapshot", () => {
    const { asFragment } = render(<TextareaAutosize />);
    expect(asFragment(<TextareaAutosize />)).toMatchSnapshot();
  });

  it("Should render with out error", () => {
    render(<TextareaAutosize />);
  });
});
