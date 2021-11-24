import { useEffect, useState } from "react";
import {
  Carousel,
  Card,
  CardGroup,
  Col,
  Row,
  Button,
  Container,
  Form,
  Offcanvas,
} from "react-bootstrap";
import axiosInstance from "../axios";
import { useHistory } from "react-router-dom";



const FrontPage = () => {
  const history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();


  const [RegisterUser , setRegisterUser] = useState(false);
  
  const [username1, setUsername1] = useState();
  const [password1, setPassword1] = useState();
  const [password2, setPassword2] = useState();


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  const handleLogin = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`token/`, {
        username: username,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        history.push("/input-form");
        window.location.reload(false);
      });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`register/`, {
        'username': username1,
        'password1': password1,
        'password2': password2,
      })

  };


  const handleRegViewChange = (e) =>{


    setRegisterUser( !RegisterUser );
  }
  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      history.push("/events")
    }
  }, [])

  return (


    <>
    <Container fluid className="rounded bg-light p-5">
    <Row><h1 class="lead-1">Project Chronos....</h1></Row>

    <Row>
    <Col>
      <h1>What?</h1>
      <h3 class="lead">Situation being what it is, people are more isolated than they used to be. </h3>
      <p class="lead">Aim of our project is to help people to manage their time better with studies. Also is there a better way to bring people together than thirst for knowledge. 
      So if you see something you like, go ahead and click Continue!
      </p>
      <Button variant="primary" onClick={handleShow}>Continue</Button>
      <Offcanvas show={show} onHide={handleClose} placement="top">
        <Offcanvas.Header closeButton>

          <Offcanvas.Title><h2>Login</h2></Offcanvas.Title>
        
        </Offcanvas.Header>
        <Offcanvas.Body className="align-center">
          <Container>
            <Row>
            
            <Col>

            <h3>Project Chronos</h3>
            <h4 class="lead">No account? No worries. You can create one </h4>
            <Button onClick={handleRegViewChange}>Create</Button>

            </Col>
            <Col>
   
        {!RegisterUser ?
          <Form>
            <p>
              <label for="id_username_L">Username:</label>{" "}
              <input
                type="text"
                autofocus=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength="150"
                id="id_username_L"
              />
            </p>
            <p>
              <label for="id_password_L">Password:</label>{" "}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required=""
                id="id_password_L"
              />
            </p>
            <Button type="submit" onClick={handleLogin}>
              Log In
            </Button>
          </Form>


            :

        
          <Form>
            <p>
              <label for="id_username">Username:</label>{" "}
              <input
                type="text"
                autofocus=""
                value={username1}
                onChange={(e) => setUsername1(e.target.value)}
                maxLength="150"
                id="id_username"
              />
            </p>
            <p>
              <label for="id_password1">Password:</label>{" "}
              <input
                type="password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                required=""
                id="id_password1"
              />
            </p>
            <p>
              <label for="id_password2">Verify Password</label>{" "}
              <input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required=""
                id="id_password2"
              />
                          </p>
            <Button type="submit" onClick={handleRegister}>
              Register
            </Button>
          </Form>
        }

          </Col>
          </Row>
        </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </Col>

      <Col>
      <h2>Promoted events</h2>
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
                  <Button variant="secondary">Join</Button>
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
                  <Button variant="secondary">Join</Button>
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
                  <Button variant="secondary">Join</Button>
                </Card.Footer>
              </Card>
            </Carousel.Item>
          </Carousel>

      </Col>

    </Row>
<hr/>
<Container>
<h2 class="text-center">
  Joinable events
</h2>
<Row xs={2} md={3} className="g-4">
  {Array.from({ length: 4 }).map((_, idx) => (
    <Col>
      
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
                  <Button variant="secondary">Join</Button>
                </Card.Footer>
              </Card>

    </Col>
  ))}
</Row>

</Container>

   

    </Container>    
    
    </>
  );
};

export default FrontPage;
