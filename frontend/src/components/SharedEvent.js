import axiosInstance from "../axios";
import React, { useState } from "react";
import { useEffect } from "react";
import {useParams } from "react-router-dom";
import {
  Carousel,
  Card,
  Col,
  Row,
  Button,
  Container,
  CardGroup,
} from "react-bootstrap";
const SharedEvent = (props) => {
    let { topicId } = useParams();
    const [event, setEvent] = useState({

      id:"",
      name:"",
      description:"",
      starting_time:"", 
      end_time:"", 
      is_public:"", 
      place:"", 
      attendees:"", 
      unique_id:"", 
      owner_id:""
    })

    
    useEffect(() => {
      console.log(topicId);
        axiosInstance.get("sharedevent/"+topicId).then((r) => {
          console.log("data",r.data)
          
          //const parsed_data = JSON.parse(r)
          //console.log("parsed",parsed_data)
          
          //const formatted = (r.data).map(event => {
            
              setEvent(Object(r.data))
           
          })
          //setEvents(formatted)
      
      }, []);

      const handlejoin =() => {


      axiosInstance.post("joinevent/"+topicId, {

        "ey":true
          }).then((r) => {
          console.log(r)
      });


      }
      
      


    return (
    <>
    <Container>
      <Row>
            <h1>Event: {event.name} </h1>
      </Row>
      <Row >
        <Card>
        <Card.Img fluid="false" variant="top" src="https://cdn.pixabay.com/photo/2015/05/31/13/45/young-woman-791849_960_720.jpg"/>
      <Card.Body>
                  <Card.Title>{event.name}</Card.Title>
                  <Card.Text>
                    <b>Description:</b> {event.description}
                    <br />
                    <b>Starting Date and time:</b> {event.starting_time.to}
                    <br />
                    <b>Location:</b> {event.place}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">{event.attendees} attendees</small>
                  <Button variant="secondary" onClick={handlejoin}>Join</Button>
                </Card.Footer>
              </Card>
      </Row>
    </Container>
    
    </>);

};

export default SharedEvent;
