import { useEffect, useState } from "react";
import {
  Carousel,
  Card,
  Col,
  Row,
  Button,
  Container,
} from "react-bootstrap";
import axiosInstance from "../axios";
import { useHistory } from "react-router-dom";

import EventCard from "./EventCard";
import RegisterForm from "./RegisterForm";

const FrontPage = () => {
  const history = useHistory();

  const [hyped, setHyped] = useState([]);

  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  useEffect(() => {
    axiosInstance.get("hypedevents/").then((r) => {
      console.log(r);
      setHyped(r.data);
    });
  }, []);

  useEffect(() => {
    axiosInstance
      .get("public_events/")
      .then((r) => {
        setEvents(r.data.map((e) => e.fields));
        console.log(r.data.map((e) => e.fields));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      history.push("/events");
    }
  }, []);

  return (
    <>
      <Container fluid className="rounded bg-light p-5">
        <Row>
          <h1 class="lead-1">Project Chronos....</h1>
        </Row>

        <Row>
          <Col>
            <h1>What?</h1>
            <h3 class="lead">
              Situation being what it is, people are more isolated than they
              used to be.{" "}
            </h3>
            <p class="lead">
              Aim of our project is to help people to manage their time better
              with studies. Also is there a better way to bring people together
              than thirst for knowledge. So if you see something you like, go
              ahead and click Continue!
            </p>
            <Button variant="primary" onClick={handleShow}>
              Continue
            </Button>
            <RegisterForm show={show} setShow={setShow} />
          </Col>
          <Col>
            <h2>Promoted events</h2>
            <Carousel>
              {hyped.map((hypedEvent) => (
                <Carousel.Item>
                  <Card>
                    <Card.Body>
                      <Card.Title>{hypedEvent.name.slice(0, 50)}</Card.Title>
                      <Card.Text>
                        <b>Description:</b>{" "}
                        {hypedEvent.description.slice(0, 50)}
                        <br />
                        <b>Date and time:</b>
                        {hypedEvent.starting_time}
                        <br />
                        <b>Location:</b> {hypedEvent.place}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        {hypedEvent.attendees} attendees
                      </small>
                      <Button variant="secondary">Join</Button>
                    </Card.Footer>
                  </Card>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
        <hr />
        <Container>
          <h2 class="text-center">Joinable events</h2>

          <Row xs={2} md={3} className=" p-5 g-4">
            {
              <>
                {events.map((val) => {
                  return <EventCard info={val}></EventCard>;
                })}
              </>
            }
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default FrontPage;
