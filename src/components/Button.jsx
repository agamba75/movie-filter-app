import React from "react";

export function Button({ genreId, name, toggleGenre }) {
  return (
    <button
      className="btn btn-primary mb-3 w-50 ms-auto me-auto "
      type="button"
      id={genreId}
      value={name}
      onClick={toggleGenre}
    >
      {name}
    </button>
  );
}
