import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "./App";
import { getAppDetailMock } from "./api/__mocks__/clients";

jest.mock("./api/clients");

describe("<App /> ", () => {
  beforeEach(() => {
    getAppDetailMock.mockReset();
  });
  test("Should show not found message if app does not exist", async () => {
    const appId = "8500f5dd-8b41-4cb8-95fa-246b1f25855b";
    getAppDetailMock.mockResolvedValue(null);
    render(<App appId={appId} />);
    await waitForElementToBeRemoved(() => screen.getByText("Loading"));
    expect(getAppDetailMock).toHaveBeenCalledTimes(1);
    expect(getAppDetailMock).toHaveBeenCalledWith(appId);
    expect(screen.getByText(`App not found found`)).toBeInTheDocument();
  });
  test("Should show not found message if app does not exist", async () => {
    const appId = "8500f5dd-8b41-4cb8-95fa-246b1f25855b";
    getAppDetailMock.mockResolvedValue({ appId });
    render(<App appId={appId} />);
    await waitForElementToBeRemoved(() => screen.getByText("Loading"));
    expect(getAppDetailMock).toHaveBeenCalledTimes(1);
    expect(getAppDetailMock).toHaveBeenCalledWith(appId);
    expect(
      screen.getByText(`App found with id '${appId}'`)
    ).toBeInTheDocument();
  });
});
