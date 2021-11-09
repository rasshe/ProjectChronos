import React, { useState } from "react";
import { useEffect } from "react";
import { Row, Container } from "react-bootstrap";
import Calendar from "./Calendar";
import axiosInstance from "../axios";


const CalendarPage = () => {
  const [events, setEvents] = useState([])
  useEffect(() => {
    axiosInstance.get("calendar/").then((r) => {
      console.log()
      const parsed_data = JSON.parse(r.data)
      console.log(parsed_data)
      const formatted = parsed_data.map(event => {
        console.log(event)
        return {
        title: event.fields.name,
        start: Date.parse(event.fields.starting_time),
        end: Date.parse(event.fields.end_time),
      }
      })
      setEvents(formatted)
    });
  }, []);
  return (
    <>
      <Container>
        <Row>
          <h1 data-testid="calendar-title">Calendar</h1>
          <div className="calendar-container">
            <Calendar events={events} />
          </div>
        </Row>
      </Container>
    </>
  );
};

export default CalendarPage;
