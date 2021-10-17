import React from "react";
import { render, screen } from "@testing-library/react";
import CalendarPage from "../components/CalendarPage";

test("renders page title", () => {
  render(<CalendarPage />);
  const titleElement = screen.getByTestId("calendar-title");
  expect(titleElement).toHaveTextContent("Calendar");
});
