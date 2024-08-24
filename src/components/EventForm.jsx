import React, { useState, useEffect } from "react";

function EventForm({ addEvent, selectedEvent, updateEvent }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setDate(selectedEvent.date);
      setDescription(selectedEvent.description);
    }
  }, [selectedEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedEvent) {
      addEvent({ id: Date.now(), title, date, description });
    } else {
      updateEvent({ ...selectedEvent, title, date, description });
    }
    setTitle("");
    setDate("");
    setDescription("");
  };

  return (
    <div className="event-form">
      <h2>{selectedEvent ? "Edit Event" : "Add Event"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">{selectedEvent ? "Update" : "Add"}</button>
      </form>
    </div>
  );
}

export default EventForm;
