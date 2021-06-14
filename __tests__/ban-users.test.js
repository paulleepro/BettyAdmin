import React from "react";
import { cleanup, render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { Provider } from "react-redux";
import store from "../store";
import Home from "../pages/ban-users";

afterEach(cleanup);

describe("Home component test suit", () => {
  it("Should take a snapshot", () => {
    const { asFragment } = render(
      <MockedProvider>
        <Provider store={store}>
          <Home />
        </Provider>
      </MockedProvider>
    );
    expect(asFragment(<Home />)).toMatchSnapshot();
  });

  it("Should render with out error", async () => {
    render(
      <MockedProvider>
        <Provider store={store}>
          <Home />
        </Provider>
      </MockedProvider>
    );
  });

  it("Correct title rendered", () => {
    const { getByTestId } = render(
      <MockedProvider>
        <Provider store={store}>
          <Home />
        </Provider>
      </MockedProvider>
    );
    const title = getByTestId("title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Ban Users");
  });

  it("Correct button rendered", () => {
    const { getByTestId } = render(
      <MockedProvider>
        <Provider store={store}>
          <Home />
        </Provider>
      </MockedProvider>
    );
    const button = getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Ban User");
  });
});
