import {
  Carousel,
  Card,
  Col,
  Row,
  Button,
  Container,
  CardGroup,
  Form,
} from "react-bootstrap";

import { Link } from "react-router-dom";

const FrontPage = () => {
  return (
    <Container className="rounded bg-light p-5">
      <Row>
        <h1 class="lead-1 p-5"> Welcome to our awesome service.</h1>
      </Row>
      <Row>
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

        <Col>
          <h2> See something interesting? </h2>
          <p class="text-muted"> Go ahead and log in to our awesome service</p>
          <Form method="POST" action="http://127.0.0.1:8000/login/">
          <input type="hidden" name="csrfmiddlewaretoken" value="wEEtqlkXd1duytu6uGzgRRCf1BuiiKyq1a89b1LTvSFfkF6V4eUu4JWKGTZg2jPP"/>
           <p><label for="id_username">Username:</label> <input type="text" name="username" autofocus="" autocapitalize="none" autocomplete="username" maxlength="150" required="" id="id_username"/></p>
          <p><label for="id_password">Password:</label> <input type="password" name="password" autocomplete="current-password" required="" id="id_password"/></p>
            <Button type="submit">Log In</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};


export default FrontPage;