import React from "react";
import { cleanup, render } from "@testing-library/react";
import { MainLayout } from "../layouts/MainLayout";
import { Provider } from "react-redux";
import store from "../store";

afterEach(cleanup);

describe("MainLayout component test suit", () => {
  it("Should take a snapshot", () => {
    const { asFragment } = render(
       <Provider store={store}>
          <MainLayout />
        </Provider>
    );
    expect(asFragment(<MainLayout />)).toMatchSnapshot();
  });

  it("Should render with out error", async () => {
    render(
      <Provider store={store}>
        <MainLayout />
      </Provider>
    );
  });

  it("Logo renders correctly", () => {
    const { getByTestId } =  render(
        <Provider store={store}>
          <MainLayout />
        </Provider>
      );
    const logo = getByTestId("logo");
    expect(logo).toBeInTheDocument();
  });
});
