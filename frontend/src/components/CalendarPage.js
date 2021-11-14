import React, { useState } from "react";
import { useEffect } from "react";
import { Row, Container, Button } from "react-bootstrap";
import Calendar from "./Calendar";
import axiosInstance from "../axios";


const CalendarPage = () => {
  const [events, setEvents] = useState([])
  const [hiddenForm, setHiddenForm] = useState(true)
  const [newName, setNewName] = useState("")
  const [newStartDate, setNewStartDate] = useState("")
  const [newStartTime, setNewStartTime] = useState("")
  const [newLength, setNewLength] = useState("")
  useEffect(() => {
    axiosInstance.get("calendar/").then((r) => {
      const parsed_data = JSON.parse(r.data)
      const formatted = parsed_data.map(event => {
        return {
        id: event.pk,
        title: event.fields.name,
        start: Date.parse(event.fields.starting_time),
        end: Date.parse(event.fields.end_time),
      }
      })
      setEvents(formatted)
    });
  }, []);
  const handleCreateNew = () => {
    const eventStartTime = newStartDate + "T" + newStartTime
    const [hour, minute] = newStartTime.split(":")
    const eventEndTime = newStartDate + "T" + (parseInt(newLength) + parseInt(hour)) + ":" + minute
    axiosInstance.post("custom_event_and_move/", {
      starting_time: eventStartTime,
      end_time: eventEndTime,
      name: newName
    }).then((r) => {
      console.log(r)
    }).catch((e) => {
      console.log(e)
    })
  }
  return (
    <>
      <Container>
        <Row>
          <h1 data-testid="calendar-title">Calendar</h1>
          <Button onClick={() => setHiddenForm(!hiddenForm)}>{hiddenForm ? "Create new" : "Close form"}</Button>
          <div hidden={hiddenForm}>
            <label>Name</label><input value={newName} onChange={(e) => setNewName(e.target.value)}/>
            <label>StartDate</label><input type="date" value={newStartDate} onChange={(e) => setNewStartDate(e.target.value)}/>
            <label>StartTime</label><input type="time" value={newStartTime} onChange={(e) => setNewStartTime(e.target.value)}/>
            <label>Length (h)</label><input type="number" value={newLength} onChange={(e) => setNewLength(e.target.value)}/>
            <Button onClick={handleCreateNew}>Send</Button>
          </div>
          <div className="calendar-container">
            <Calendar events={events} />
          </div>
        </Row>
      </Container>
    </>
  );
};

export default CalendarPage;
