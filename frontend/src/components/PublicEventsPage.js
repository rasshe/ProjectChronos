import {
  Carousel,
  Card,
  Col,
  Row,
  Button,
  Container,
  CardGroup,
} from "react-bootstrap";

const PublicEventsPage = () => {
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
          <Card>
            <Card.Img
              variant="top"
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
            />
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
          <Card>
            <Card.Img
              variant="top"
              src="https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"
            />
            <Card.Body>
              <Card.Title> Philosophical programming: Deadline 1</Card.Title>
              <Card.Text>
                <b>Description:</b> Meet up to discuss what is it. To be or not
                to be.
                <br />
                <b>Date and time:</b> Friday 9. October.From 6 pm to 9 pm.
                <br />
                <b>Location:</b> Fat lizard otaniemi.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">11 attendees</small>
              <Button>Join</Button>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img
              variant="top"
              src="https://images.unsplash.com/photo-1520881363902-a0ff4e722963?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            />
            <Card.Body>
              <Card.Title>B1 Spanish: Discussion task 4</Card.Title>
              <Card.Text>
                <b>Description:</b> Discussion task about Football.
                <br />
                <b>Date and time:</b> Monday 20. October.From 4 pm to 7 pm.
                <br />
                <b>Location:</b> Aalto campus Room U301.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">4 attendees</small>
              <Button>Join</Button>
            </Card.Footer>
          </Card>
        </CardGroup>
      </Row>
    </Container>
  );
};

export default PublicEventsPage;
