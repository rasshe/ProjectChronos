import React, { useState } from "react";
import { Form, Row, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const FormPage = () => {
  const [listHidden, setListHidden] = useState(true);

  const handleSubmit = (e) => {
    setListHidden(false);
    e.preventDefault();
  };

  return (
    <>
      <Container>
        <h1>Form!</h1>

        <Form>
          <Form.Group as={Row}>
            <Form.Label>Enter File</Form.Label>
            <Form.Control type="file"></Form.Control>
          </Form.Group>

          <Button
            as={Row}
            onClick={handleSubmit}
            variant="success"
            type="submit"
          >
            {" "}
            Check{" "}
          </Button>
        </Form>

        <br />

        <div hidden={listHidden}>
          <h3>DL1: maths</h3>
          Time allocation: <input type="number"></input>
          <hr />
          <h3>DL2: programming 1</h3>
          Time allocation: <input type="number"></input>
          <hr />
          <Link class="btn btn-primary" to="/calendar">
            {" "}
            Allocate and submit{" "}
          </Link>
        </div>
      </Container>
    </>
  );
};

export default FormPage;
