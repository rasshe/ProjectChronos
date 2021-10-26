import { useState } from "react";
import {
  Carousel,
  Card,
  Col,
  Row,
  Button,
  Container,
  Form,
} from "react-bootstrap";
import axiosInstance from "../axios"
import { useHistory } from 'react-router-dom';


const FrontPage = () => {
  const history = useHistory()
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const handleLogin = (e) => {
    e.preventDefault();
    axiosInstance
			.post(`token/`, {
				username: username,
        password: password,
			},)
      .then((res) => {
				localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
				history.push('/input-form');
			});
  };
  
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
          <Form>
            <p>
              <label for="id_username">Username:</label>{" "}
              <input
                type="text"
                autofocus=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength="150"
                id="id_username"
              />
            </p>
            <p>
              <label for="id_password">Password:</label>{" "}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required=""
                id="id_password"
              />
            </p>
            <Button type="submit" onClick={handleLogin}>
              Log In
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FrontPage;
