import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

const Calendar = (props) => {
  return (
    <FullCalendar
      plugins={[timeGridPlugin]}
      initialView="timeGridWeek"
      selectable={true}
      events={props.events}
      height="500px"
    />
  );
};

export default Calendar;
