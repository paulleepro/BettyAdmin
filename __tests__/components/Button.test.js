import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Button } from "../../components/Button";

afterEach(cleanup);

describe("Button component test suit", () => {
  it("Should take a snapshot", () => {
    const { asFragment } = render(<Button />);
    expect(asFragment(<Button />)).toMatchSnapshot();
  });

  it("Should render with out error", () => {
    render(<Button />);
  });

  it("Default props test", () => {
    const { getByTestId } = render(<Button />);
    const button = getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("");
    expect(button).not.toBeDisabled();
  });

  it("Text content test", () => {
    const { getByTestId } = render(<Button>Mock Text</Button>);
    const button = getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Mock Text");
  });

  it("Prop value test", () => {
    const { getByTestId } = render(<Button disabled>Mock Text</Button>);
    const button = getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Mock Text");
    expect(button).toBeDisabled();
  });
});
