import React from "react";
import { useEffect } from "react";
import { Row, Container } from "react-bootstrap";
import Calendar from "./Calendar";
import axiosInstance from "../axios";

const mockEvents = [
  {
    title: "Maths 101 - DL 4",
    start: Date.parse("18 Oct 2021 13:00:00 GMT"),
    end: Date.parse("18 Oct 2021 15:00:00 GMT"),
  },
  {
    title: "Programming 2 - Assignment B",
    start: Date.parse("19 Oct 2021 12:00:00 GMT"),
    end: Date.parse("19 Oct 2021 16:00:00 GMT"),
  },
];

const CalendarPage = () => {
  useEffect(() => {
    axiosInstance.get("calendar/").then((r) => console.log(r.data));
  }, []);
  return (
    <>
      <Container>
        <Row>
          <h1 data-testid="calendar-title">Calendar</h1>
          <div className="calendar-container">
            <Calendar events={mockEvents} />
          </div>
        </Row>
      </Container>
    </>
  );
};

export default CalendarPage;
