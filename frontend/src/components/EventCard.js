import {
    Carousel,
    Card,
    Col,
    Row,
    Button,
    Container,
    CardGroup,
  } from "react-bootstrap";
import { useEffect, useReducer, useState } from "react";
import axiosInstance from "../axios";
import Moment from 'react-moment';
import 'moment-timezone';
import React from 'react';

  const images = [
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1520881363902-a0ff4e722963?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  ];


  const EventCard=(props)=>{


      return(
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
              <Card.Title>{props.info.name}</Card.Title>
              <Card.Text>
                <b>Description:</b> <span style={{display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden"}}>{props.info.description}</span>
                <br />
                <b>Date: </b>
                <Moment format= "DD/MM/YYYY, dddd">{props.info.starting_time}</Moment>
                <br/>
                <b>Time: </b>
               <Moment format= "HH:mm">{props.info.starting_time}</Moment>
                 <b> to  </b>
               <Moment format= " HH:mm">{props.info.end_time}</Moment>
               <br/>
                <b>Location:</b> {props.info.place}
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
                {props.info.attendees} attendees!
              </small>
              <Button>Read more</Button>
            </Card.Footer>
          </Card>

      )
  }

  export default EventCard