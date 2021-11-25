import { useState } from "react";
import { Button, Form, Col, Row, Container, Offcanvas } from "react-bootstrap";
import axiosInstance from "../axios";
import { useHistory } from "react-router-dom";

const RegisterForm = (props) => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [username1, setUsername1] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [RegisterUser, setRegisterUser] = useState(false);

  const handleClose = () => props.setShow(false);
  const handleRegViewChange = (e) => {
      console.log("X")
    setRegisterUser(!RegisterUser);
  };

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
          props.setShow(false)
          window.location.reload(false);
      });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    axiosInstance.post(`register/`, {
      username: username1,
      password1: password1,
      password2: password2,
    });
    setUsername(username1)
    setPassword(password1)
    setRegisterUser(false)
  };

  return (
    <Offcanvas show={props.show} onHide={handleClose} placement="top">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <h2 style={{fontFamily: 'avenir'}}>Login</h2>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="align-center">
        <Container>
          <Row>
            <Col style={{fontFamily: 'avenir'}}>
              <h3>Project Chronos</h3>
              <h4 class="lead">No account? No worries. You can create one </h4>
              <Button onClick={handleRegViewChange}>Create</Button>
            </Col>
            <Col>
              {!RegisterUser ? (
                <Form style={{fontFamily: 'avenir'}}>
                  <p>
                    <label style={{fontFamily: 'avenir'}} for="id_username_L">Username:</label>{" "}
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
                    <label style={{fontFamily: 'avenir'}} for="id_password_L">Password:</label>{" "}
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
              ) : (
                <Form style={{fontFamily: 'avenir'}}>
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
              )}
            </Col>
          </Row>
        </Container>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default RegisterForm;
