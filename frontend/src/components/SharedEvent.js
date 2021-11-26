import axiosInstance from "../axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Carousel,
  Card,
  Col,
  Row,
  Button,
  Container,
  CardGroup,
} from "react-bootstrap";
import RegisterForm from "./RegisterForm";
import Moment from 'react-moment';
const SharedEvent = (props) => {
  let { topicId } = useParams();
  const [show, setShow] = useState(false);
  const [isLoggedIn, _] = useState(localStorage.getItem("access_token"));
  const [event, setEvent] = useState({
    id: "",
    name: "",
    description: "",
    starting_time: "",
    end_time: "",
    is_public: "",
    place: "",
    attendees: "",
    unique_id: "",
    owner_id: "",
  });

  useEffect(() => {
    console.log(topicId);
    axiosInstance.get("sharedevent/" + topicId).then((r) => {
      console.log("data", r.data);

      //const parsed_data = JSON.parse(r)
      //console.log("parsed",parsed_data)

      //const formatted = (r.data).map(event => {
      setEvent(Object(r.data));
    });
    //setEvents(formatted)
  }, []);

  const handlejoin = () => {
    if (!isLoggedIn) {
      setShow(true)
    }
    else {
    axiosInstance
      .post("joinevent/" + topicId, {
        ey: true,
      })
      .then((r) => {
        console.log(r);
      });
    }
  };

  return (
    <>
      <Container>
        <Row >
          <h1 style= {{
          display: 'flex',
          fontFamily: "avenir",
          fontSize: 30,
          margin: 20,
          paddingRight: 99
        }}>Event: {event.name} </h1>
        </Row>
        <Row>
          <Card>
            <Card.Img
            className="h-50 w-50"  
              fluid="false"
              variant="top"
              width= "100rem"
              src="https://cdn.pixabay.com/photo/2015/05/31/13/45/young-woman-791849_960_720.jpg"
            
            />
            <Card.Body>
              <Card.Title style={{fontFamily: 'avenir'}}>{event.name}</Card.Title>
              <Card.Text 
              style={{
                fontFamily: "avenir"
              }}
              >
                <b>Description: </b> 
                {event.description}
                <br/>
                 <br/>
                 <b>
                {event["is_public"] ? " - This event is public - " : "- This event is private -"}
                </b>
                <br />
                <br/>
                <b>Date: </b> 
                <Moment format= "DD/MM/YYYY, dddd">{event.starting_time}</Moment>
                <br/>
                <b>Time: </b>
               <Moment format= "HH:mm">{event.starting_time}</Moment>
                 <b> to  </b>
               <Moment format= " HH:mm">{event.end_time}</Moment>
               <br/>
                <b>Location:</b> {event.place}
               
              </Card.Text>
            </Card.Body>
            <Card.Footer
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: 'avenir'
              }}
            >
              <small className="text-muted">{event.attendees} attendees </small>
              <Button variant="primary" onClick={handlejoin}>
                Join
              </Button>
            </Card.Footer>
          </Card>
        </Row>
      </Container>
      <RegisterForm show={show} setShow={setShow} />
    </>
  );
};

export default SharedEvent;
