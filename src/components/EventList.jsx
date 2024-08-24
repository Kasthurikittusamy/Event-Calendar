import React from "react";

function EventList({ events, deleteEvent, setSelectedEvent }) {
  return (
    <div className="event-list">
      <h2>Event List</h2>
      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        events.map((event) => (
          <div key={event.id} className="event-item">
            <div className="event-info">
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <p>{event.description}</p>
            </div>
            <button onClick={() => setSelectedEvent(event)}>Edit</button>
            <button onClick={() => deleteEvent(event.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default EventList;
