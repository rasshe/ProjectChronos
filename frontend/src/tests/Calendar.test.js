import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Calendar from "../components/Calendar";

const NOW = new Date();

const fakeEvents = [
  {
    id: 1,
    title: "test1",
    start: NOW,
    end: NOW.setHours(NOW.getHours() + 1),
  },
  {
    id: 2,
    title: "test2",
    start: (new Date()).setHours((new Date()).getHours() - 2),
    end: (new Date()).setHours((new Date()).getHours() - 3),
  },
];

describe("Calendar", () => {
    beforeEach(() => {
        render(<Calendar events={fakeEvents} />);
        jest.mock("axios")
    });

    it("renders event", async () => {
        expect(await screen.findByText(/test2/)).toBeVisible;
        expect(await screen.findByText(/test1/)).toBeVisible;
    });

    it("click requests object", async () => {
        const event = await screen.findByText(/test2/)
        fireEvent.click(event)
        expect(await screen.findByText(/Edit Event/)).toBeVisible;
    });

});
