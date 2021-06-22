import React from "react";
import { cleanup, render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { CenteredLayout } from "../layouts/CenteredLayout";
import { Provider } from "react-redux";
import store from "../store";

afterEach(cleanup);

describe("CenteredLayout component test suit", () => {
  it("Should take a snapshot", () => {
    const { asFragment } = render(
      <MockedProvider>
        <Provider store={store}>
          <CenteredLayout />
        </Provider>
      </MockedProvider>
    );
    expect(asFragment(<CenteredLayout />)).toMatchSnapshot();
  });

  it("Should render with out error", async () => {
    render(
      <MockedProvider>
        <Provider store={store}>
         <CenteredLayout />
        </Provider>
      </MockedProvider>
    );
  });

  it("Logo renders correctly", () => {
    const { getByTestId } =  render(
        <MockedProvider>
          <Provider store={store}>
           <CenteredLayout />
          </Provider>
        </MockedProvider>
      );
    const logo = getByTestId("logo");
    expect(logo).toBeInTheDocument();
  });
});
