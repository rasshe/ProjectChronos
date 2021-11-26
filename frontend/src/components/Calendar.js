import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Modal, Button, ToggleButton } from "react-bootstrap";
import axiosInstance from "../axios";

const Calendar = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentEventId, setCurrentEventId] = useState("");
  const [event, setEvent] = useState({});

  useEffect(() => {
    setShowError(false)
  }, [currentEventId])
  const fetchEvent = (id) => {
    setCurrentEventId(id);
    axiosInstance.get(`view_event_detail/${id}`).then((res) => {
      console.log(res.data);
      setEvent(res.data);
    });
  };


const deleteData=() =>
{

  if(window.confirm("Are you sure?")){
    axiosInstance.delete(`view_event_detail/${currentEventId}`, {
    })
  }

   }


  const updateField = (field, value) => {
    event[field] = value;
    setEvent({ ...event });
  };
  const handleUpdateEvent = () => {
    if (event.is_public && !event.place) {
      console.log("X", event.place, event.is_public)
      setErrorMessage("Public events need a location")
      setShowError(true)
      return
    }
    axiosInstance
      .post(`view_event_detail/${currentEventId}`, event)
      .then((e) => {
        console.log(e)
        setShowModal(false)
        setShowError(false)
      })
      .catch((e) => {
        setErrorMessage("Not allowed to edit this event")
        setShowError(true)
        console.log("ABC")
      });
  };
  return (
    <>
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        events={props.events}
        eventClick={(e) => {
          setShowModal(true);
          fetchEvent(e.event.id);
        }}
      />
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{fontFamily: 'avenir'}}>
            <label style={{fontWeight: 'bold'}}>Name</label>
            <br/>
            {event["attendees"] > 1 ?
            <p>{event["name"]}</p>
            :
            <textarea
              value={event["name"]}
              cols="50"
              rows="5"
              onChange={(e) => updateField("name", e.target.value)}
            />
            }
          </div>
          <div style={{fontFamily: 'avenir'}}>
            <label  style={{fontWeight: 'bold'}}>Description </label>
            <textarea
              cols="50"
              rows="5"
              value={event["description"]}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </div>
          <div style={{fontFamily: 'avenir'}}>
            <label style={{fontWeight: 'bold'}}>Day</label>
            <p>{event["starting_time"]?.split("T")[0]}</p>
          </div>
          <div style={{fontFamily: 'avenir'}}>
            <label  style={{fontWeight: 'bold'}}>Start Time </label>
            <p>{event["starting_time"]?.substring(11, 16)}</p>
          </div>
          <div style={{fontFamily: 'avenir'}}>
            <label  style={{fontWeight: 'bold'}}>End Time </label>
            <p>{event["end_time"]?.substring(11, 16)}</p>
          </div>
          <div style={{fontFamily: 'avenir'}}>
            <label  style={{fontWeight: 'bold'}}>Status</label>
            <br/>
            <ToggleButton
              id="toggle-check"
              type="checkbox"
              variant="outline-secondary"
              checked={event["is_public"]}
              onChange={(e) => updateField("is_public", e.currentTarget.checked)}
            >
              {event["is_public"] ? "Public" : "Private"}
            </ToggleButton>
          </div>
          <div>
            <br/>
            <label style={{fontFamily: 'avenir', fontWeight: 'bold'}}>Location </label>
            <br/>
            {event["attendees"] > 1 ?
              <p>{event["place"]}</p>
              :
            <input
              style={{width:"90%"}}
              value={event["place"]}
              onChange={(e) => updateField("place", e.target.value)}
            />
          }
          </div>
          <br/>
          <div style={{fontFamily: 'avenir', fontWeight: 'bold'}}>
            <label>Amount of registered users</label>
            <p>{event["attendees"]}</p>
          </div>
          <div>
            <label style={{fontFamily: 'avenir', fontWeight:'bold'}}>Shareable link </label>
            <p><a href={window.location.origin + "/object/" + event["unique_id"]}>{window.location.origin + "/object/" + event["unique_id"]}</a></p>
          </div>
          <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: 'avenir'
          }}
          
          >
          <Button onClick={handleUpdateEvent}>SEND</Button>
          <Button onClick={deleteData} variant="danger">DELETE</Button>
          </div>
          <div style={{background:"#ffaaaa", marginTop:"4", border:"1px solid red", borderRadius:"5"}} hidden={!showError}>
            <p style={{float: "right", marginRight: "10px", cursor: "pointer"}} onClick={() => setShowError(false)}>x</p>
            <h3>Error</h3>
            <p>{errorMessage}</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Calendar;
