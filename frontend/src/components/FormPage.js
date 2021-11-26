import React, { useState } from "react";
import { Form, Row, Button,Col, Container } from "react-bootstrap";
import axiosInstance from "../axios";
import { useHistory } from "react-router-dom";

const FormPage = () => {
  const history = useHistory();
  const [noNewEvents, setNoNewEvents] = useState(false)
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
      if (r.data.length == 0) {
        setFile("")
        setNoNewEvents(true)
      }
      else {
      console.log(r.data);
      setFile("")
      setNewDeadlines(r.data);
      setNoNewEvents(false)
      }
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
        <Row style={{fontFamily: 'avenir'}}>
          <Col>
          <br/>
            <h1 class="text-center">Calendar import </h1>
            <p class="">Import your ical file. ICal file can be found in bottom part of Mycourses 'calendar'-section.</p>
          </Col>
          <Col>
          <br/>
              
            <Form>
              <Form.Group as={Row}>
              
                <Form.Label style={{fontFamily: 'avenir'}}>Enter File</Form.Label>
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
          </Col>
        </Row>
        <br />
        <h2 style={{fontFamily: 'avenir'}} hidden={!noNewEvents}>There were no new deadlines in this file! Check a new file or go to calendar</h2>
        <div hidden={newDeadlines.length === 0}>
          <h2 class="text-center pt-5">Found events</h2>
          <p style={{fontFamily: 'avenir'}} class="text-center lead pb-5">Found events via parsing the Ical. Now you have an option to allocate how many hours you might need for completion of each deadline.</p>
          {newDeadlines.map((dl, i) => (
            <div key={i} className={i%2==0 ? 'bg-light': 'bg-white'}>
              <h3>{dl.summary}</h3>
              <p class="small">{dl.description}</p>
              <p>
                <b>Deadline:</b>
                {new Date(dl.time).toGMTString()}
              </p>
              <div class="input-group">
                <b style={{fontFamily: 'avenir'}}>Time allocation:</b>{" "}
                <input
                type="number"
                  class="form-control"
                  onChange={(e) => handleTimeAllocation(e.target.value, i)}
                />
                <div class="input-group-append">
                <span class="input-group-text">Hours</span>
                </div>
                </div>
              <hr />
            </div>
          ))}
          <Button style={{fontFamily: 'avenir'}} onClick={handleSubmitDeadlines}> Allocate and submit </Button>
        </div>
      </Container>
    </>
  );
};

export default FormPage;
