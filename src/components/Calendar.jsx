import React from "react";

function Calendar({ events, setSelectedEvent }) {
  return (
    <div className="calendar">
      {[...Array(30).keys()].map((day) => (
        <div className="calendar-day" key={day}>
          <span>Day {day + 1}</span>
          {events
            .filter((event) => new Date(event.date).getDate() === day + 1)
            .map((event) => (
              <div key={event.id} className="calendar-event" onClick={() => setSelectedEvent(event)}>
                {event.title}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default Calendar;
