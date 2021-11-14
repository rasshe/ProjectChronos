import React, { useState } from "react";
import { Form, Row, Button, Container } from "react-bootstrap";
import axiosInstance from "../axios";
import { useHistory } from "react-router-dom";

const FormPage = () => {
  const history = useHistory();
  const [newDeadlines, setNewDeadlines] = useState([]);
  const [file, setFile] = useState("");
  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!file) {
      alert("No file selected");
      return;
    }
    let formData = new FormData();
    formData.append("file", file);
    axiosInstance.post("calendar_file/", formData).then((r) => {
      console.log(r.data);
      setNewDeadlines(r.data);
    });
  };
  const handleTimeAllocation = (value, index) => {
    newDeadlines[index]["allocation"] = value;
    setNewDeadlines(newDeadlines);
  };
  const handleSubmitDeadlines = () => {
    const check = newDeadlines.every((dl) => dl.allocation);
    if (!check) {
      alert("Not all deadlines allocated");
      return;
    }
    let formData = new FormData();
    formData.append("data", JSON.stringify(newDeadlines));
    axiosInstance.post("deadlines/", formData).then((r) => {
      history.push("/calendar");
    });
  };
  return (
    <>
      <Container>
        <h1>Form!</h1>

        <Form>
          <Form.Group as={Row}>
            <Form.Label>Enter File</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            ></Form.Control>
          </Form.Group>
          <Button
            as={Row}
            variant="success"
            type="submit"
            onClick={handleSubmitFile}
          >
            {" "}
            Check{" "}
          </Button>
        </Form>

        <br />

        <div hidden={newDeadlines.length === 0}>
          {newDeadlines.map((dl, i) => (
            <div key={i}>
              <h3>{dl.summary}</h3>
              <p>{dl.description}</p>
              <p>
                <b>DL:</b>
                {dl.time}
              </p>
              Time allocation:{" "}
              <input
                type="number"
                onChange={(e) => handleTimeAllocation(e.target.value, i)}
              />
              <hr />
            </div>
          ))}
          <Button onClick={handleSubmitDeadlines}> Allocate and submit </Button>
        </div>
      </Container>
    </>
  );
};

export default FormPage;
