import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CalendarPage from "./components/CalendarPage";
import FrontPage from "./components/FrontPage";
import PublicEventsPage from "./components/PublicEventsPage";
import FormPage from "./components/FormPage";

import { Navbar, Nav, Container } from "react-bootstrap";

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Project Chronos</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/input-form">Form</Nav.Link>
            <Nav.Link href="/calendar">Calendar</Nav.Link>
            <Nav.Link href="/events">Events</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Switch>
        <Route path="/calendar">
          <CalendarPage />
        </Route>
        <Route path="/input-form">
          <FormPage />
        </Route>
        <Route path="/events">
          <PublicEventsPage />
        </Route>
        <Route exact path="/">
          <FrontPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
