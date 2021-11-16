import {
  Carousel,
  Card,
  Col,
  Row,
  Button,
  Container,
  CardGroup,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axiosInstance from "../axios";

const images = [
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1520881363902-a0ff4e722963?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
];

const PublicEventsPage = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axiosInstance.get("public_events/").then((r) => {
      setEvents(r.data.map((e) => e.fields));
      console.log(r.data.map((e) => e.fields));
    }).catch((err) => console.log(err));
  }, []);
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
        <CardGroup>
          {events.map((event) => (
            <Card
              style={{
                margin: "5px",
                minWidth: "24%",
                maxWidth: "25%",
                flex: "1 1 0px",
              }}
            >
              <Card.Img
                variant="top"
                src={images[Math.floor(Math.random() * 3)]}
              />
              <Card.Body>
                <Card.Title>Lab 101: Deadline 4:</Card.Title>
                <Card.Text>
                  <b>Description:</b> Work on group assigment...
                  <br />
                  <b>Date and time:</b> Monday 4.October from 3 pm to 6 pm.
                  <br />
                  <b>Location:</b> {event.place}
                </Card.Text>
              </Card.Body>
              <Card.Footer
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <small className="text-muted">
                  {event.attendees[0]} attendees!
                </small>
                <Button>Join</Button>
              </Card.Footer>
            </Card>
          ))}
        </CardGroup>
      </Row>
    </Container>
  );
};

export default PublicEventsPage;
