import React from "react";

function Filter({ filter, setFilter }) {
  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Filter events by title..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
}

export default Filter;
