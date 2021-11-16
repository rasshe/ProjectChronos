import {
  Carousel,
  Card,
  Col,
  Row,
  Button,
  Container,
  CardGroup,
} from "react-bootstrap";
import { useEffect, useReducer, useState } from "react";
import axiosInstance from "../axios";
import EventCard from "./EventCard";

const images = [
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1520881363902-a0ff4e722963?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
];

const PublicEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState("");
  const [filterData, setFilteredData] = useState([]);

  useEffect(() => {
    axiosInstance.get("public_events/").then((r) => {
      setEvents(r.data.map((e) => e.fields));
      //console.log(r.data.map((e) => e.fields));
    });
  }, []);

  useEffect(() => {
    setFilteredData(
      events.filter((event) => event.name.toLowerCase().includes(query.toLowerCase()))
    )
  }, [query, events])


  return (
    <Container>
      <Row>
        <h1>Public events</h1>
      </Row>
      <Row>
        <Col>
          <h3 class="text-center ">For you: </h3>
        </Col>

        <Col>
          <Carousel>
            <Carousel.Item>
              <Card>
                <Card.Body>
                  <Card.Title>Lab 101: Deadline 4:</Card.Title>
                  <Card.Text>
                    <b>Description:</b> Work on group assigment...
                    <br />
                    <b>Date and time:</b> Monday 4.October from 3 pm to 6 pm.
                    <br />
                    <b>Location:</b> Roberts cafe in Ablock
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">5 attendees</small>
                  <Button>Join</Button>
                </Card.Footer>
              </Card>
            </Carousel.Item>
            <Carousel.Item>
              <Card>
                <Card.Body>
                  <Card.Title>Lab 101: Deadline 4:</Card.Title>
                  <Card.Text>
                    <b>Description:</b> Work on group assigment...
                    <br />
                    <b>Date and time:</b> Monday 4.October from 3 pm to 6 pm.
                    <br />
                    <b>Location:</b> Roberts cafe in Ablock
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">5 attendees</small>
                  <Button>Join</Button>
                </Card.Footer>
              </Card>
            </Carousel.Item>
            <Carousel.Item>
              <Card>
                <Card.Body>
                  <Card.Title>Lab 101: Deadline 4:</Card.Title>
                  <Card.Text>
                    <b>Description:</b> Work on group assigment...
                    <br />
                    <b>Date and time:</b> Monday 4.October from 3 pm to 6 pm.
                    <br />
                    <b>Location:</b> Roberts cafe in Ablock
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">5 attendees</small>
                  <Button>Join</Button>
                </Card.Footer>
              </Card>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
      <Row>
        <label> Search</label>
        <input type="text" onChange={e => setQuery(e.target.value)} />
        <CardGroup>
          {filterData.length === 0 ? <div>No result found</div> : filterData.map((val) => {
            console.log(val)
            return <EventCard info={val}>
            </EventCard>
          })}
        </CardGroup>
      </Row>
    </Container>
  );
};

export default PublicEventsPage;
