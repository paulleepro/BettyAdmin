import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Sidebar } from "../../components/Sidebar";

afterEach(cleanup);

describe("Side Bar component test suit", () => {
  it("Should take a snapshot", () => {
    const { asFragment } = render(<Sidebar />);
    expect(asFragment(<Sidebar />)).toMatchSnapshot();
  });

  it("Should render with out error", () => {
    render(<Sidebar />);
  });

  it("Live Rooms item is part of side bar ", () => {
    const { getByTestId } = render(<Sidebar />);
    const liveRoomElement = getByTestId("Live Rooms");
    expect(liveRoomElement).toBeInTheDocument();
    expect(liveRoomElement).toHaveTextContent("Live Rooms");
    expect(liveRoomElement).not.toBeDisabled();
  });

  it("Schedule item is part of side bar ", () => {
    const { getByTestId } = render(<Sidebar />);
    const schedule = getByTestId("Schedule");
    expect(schedule).toBeInTheDocument();
    expect(schedule).toHaveTextContent("Schedule");
    expect(schedule).not.toBeDisabled();
  });

  it("Ban Users item is part of side bar ", () => {
    const { getByTestId } = render(<Sidebar />);
    const banUsers = getByTestId("Ban Users");
    expect(banUsers).toBeInTheDocument();
    expect(banUsers).toHaveTextContent("Ban Users");
    expect(banUsers).not.toBeDisabled();
  });

  it("User Reports item is part of side bar ", () => {
    const { getByTestId } = render(<Sidebar />);
    const userReports = getByTestId("User Reports");
    expect(userReports).toBeInTheDocument();
    expect(userReports).toHaveTextContent("User Reports");
    expect(userReports).not.toBeDisabled();
  });

  it("User Information item is part of side bar ", () => {
    const { getByTestId } = render(<Sidebar />);
    const userInformation = getByTestId("User Information");
    expect(userInformation).toBeInTheDocument();
    expect(userInformation).toHaveTextContent("User Information");
    expect(userInformation).not.toBeDisabled();
  });

  it("Waitlist item is part of side bar ", () => {
    const { getByTestId } = render(<Sidebar />);
    const waitlist = getByTestId("Waitlist");
    expect(waitlist).toBeInTheDocument();
    expect(waitlist).toHaveTextContent("Waitlist");
    expect(waitlist).not.toBeDisabled();
  });
});
