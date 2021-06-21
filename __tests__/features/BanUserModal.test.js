import React from "react";
import { cleanup, render } from "@testing-library/react";
import { BanUserModal } from "../../features/dashboard/BanUserModal";

afterEach(cleanup);

describe("BanUserModal component test suit", () => {
  it("Should take a snapshot", () => {
    const { asFragment } = render(
     <BanUserModal />
    );
    expect(asFragment(<BanUserModal />)).toMatchSnapshot();
  });

  it("Should render with out error", async () => {
    render(
      <BanUserModal />
    );
  });
});
