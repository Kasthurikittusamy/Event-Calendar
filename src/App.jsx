import React, { useState } from 'react';
import './App.css';

function App() {
  const [events, setEvents] = useState([
    { id: 1, title: 'Meeting with team', date: '2024-08-30', description: 'Discuss project milestones' },
    { id: 2, title: 'Doctor Appointment', date: '2024-08-29', description: 'Routine check-up' },
    { id: 3, title: 'Conference', date: '2024-09-01', description: 'Attend tech conference' },
  ]);
  const [filterText, setFilterText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '' });
  const [editMode, setEditMode] = useState(false); // New state for edit mode
  const [currentEventId, setCurrentEventId] = useState(null);

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const handleSearch = () => {
    setSearchTerm(filterText);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const addEvent = (e) => {
    e.preventDefault();
    if (newEvent.title && newEvent.date) {
      setEvents([...events, { ...newEvent, id: events.length + 1 }]);
      setNewEvent({ title: '', date: '', description: '' });
    }
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const startEdit = (event) => {
    setEditMode(true);
    setCurrentEventId(event.id);
    setNewEvent({ title: event.title, date: event.date, description: event.description });
  };

  const editEvent = (e) => {
    e.preventDefault();
    if (newEvent.title && newEvent.date) {
      setEvents(events.map(event =>
        event.id === currentEventId ? { ...newEvent, id: currentEventId } : event
      ));
      setEditMode(false);
      setNewEvent({ title: '', date: '', description: '' });
      setCurrentEventId(null);
    }
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Event Calendar</h1>

      {/* Event Filter */}
      <div className="filter">
        <input 
          type="text" 
          placeholder="Filter events by title..." 
          value={filterText} 
          onChange={handleFilterChange} 
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Calendar */}
      <div className="calendar">
        {[...Array(30).keys()].map(i => {
          const day = i + 1;
          const date = `2024-08-${day < 10 ? `0${day}` : day}`;
          const dayEvents = events.filter(event => event.date === date);
          return (
            <div className="calendar-day" key={date}>
              <span>{day}</span>
              {dayEvents.map(event => (
                <div 
                  key={event.id} 
                  className="calendar-event" 
                  onClick={() => alert(event.description)}
                >
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Event List and No Events Message */}
      <div className="event-list">
        <h2>Events</h2>
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div key={event.id} className="event-item">
              <div className="event-info">
                <h3>{event.title}</h3>
                <p>{event.date}</p>
                <p>{event.description}</p>
              </div>
              <div className="event-actions">
                <button onClick={() => deleteEvent(event.id)}>Delete</button>
                <button onClick={() => startEdit(event)}>Edit</button>
              </div>
            </div>
          ))
        ) : (
          <p>No events found</p>
        )}
      </div>

      {/* Event Form */}
      <div className="event-form">
        <h2>{editMode ? 'Edit Event' : 'Add Event'}</h2>
        <form onSubmit={editMode ? editEvent : addEvent}>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={newEvent.description}
            onChange={handleInputChange}
          />
          <br></br>
          <button type="submit">{editMode ? 'Update Event' : 'Add Event'}</button>
          <br></br>
          {editMode && <button onClick={() => { setEditMode(false); setNewEvent({ title: '', date: '', description: '' }); setCurrentEventId(null); }}>Cancel</button>}
        </form>
      </div>
    </div>
  );
}

export default App;
