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
        start: Date.parse(event.fields.starting_time.slice(0, -1)),
        end: Date.parse(event.fields.end_time.slice(0, -1)),
        backgroundColor: event.fields.is_public ? "#ddaa00" : "",
        borderColor: event.fields.is_public ? "#cc9900" : "",
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
          <br/>
          <br/>
          <br/>
          <div style= {{height: 100, alignItems: 'center', justifyContent: 'center'}}><Button style={{}} onClick={() => setHiddenForm(!hiddenForm)}>{hiddenForm ? "Create new event" : "Close form"}</Button></div>
          <div hidden={hiddenForm}>
            <b>Name </b><input value={newName} onChange={(e) => setNewName(e.target.value)}/>
            <br/>
            <b>StartDate </b><input type="date" value={newStartDate} onChange={(e) => setNewStartDate(e.target.value)}/>
            <br/>
            <b>StartTime </b><input type="time" value={newStartTime} onChange={(e) => setNewStartTime(e.target.value)}/>
            <br/>
            <b>Length (h) </b><input type="number" value={newLength} onChange={(e) => setNewLength(e.target.value)}/>
            <br/>
            <br/>
            <Button onClick={handleCreateNew}>Send</Button>
            <br/>
            <br/>
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
