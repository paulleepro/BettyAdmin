import React from "react";
import { cleanup, render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { Provider } from "react-redux";
import store from "../store";
import Home from "../pages/live";

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

  it("Should render with out error", () => {
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
    expect(title).toHaveTextContent("Live Rooms");
  });
});
