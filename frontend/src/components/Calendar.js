import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  Modal, Button
} from "react-bootstrap";
import axiosInstance from "../axios";


const Calendar = (props) => {
  const [showModal, setShowModal] = useState(false)
  const [currentEventId, setCurrentEventId] = useState("")
  const [event, setEvent] = useState({})
  console.log(props.events)
  const fetchEvent = (id) => {
    setCurrentEventId(id)
    axiosInstance
      .get(`view_event_detail/${id}`)
      .then((res) => {
        console.log(res.data)
        setEvent(res.data)
      })
  }

  const updateField = (field, value) => {
    console.log(field, value, event)

    event[field] = value
    setEvent({...event})
  }
  const handleUpdateEvent = () => {
    console.log(event)
    axiosInstance
      .post(`view_event_detail/${currentEventId}`, event).then(e => console.log(e))
  }
  return (
    <>
    <FullCalendar
      plugins={[timeGridPlugin]}
      initialView="timeGridWeek"
      events={props.events}
      height="500px"
      eventClick={(e) => {
        setShowModal(true)
        fetchEvent(e.event.id)
      }}
    />
    <Modal 
    show={showModal}
    onHide={() => setShowModal(false)}
    >
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Object.keys(event).map(field => (
            <div key={field}><label>{field}</label><input value={event[field]} onChange={(e) => updateField(field, e.target.value)}/></div>
          ))}
          <Button onClick={handleUpdateEvent}>SEND</Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Calendar;
