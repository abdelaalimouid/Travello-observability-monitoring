import React from "react";

export default function Dates({
  class: className,
  name,
  placeholder,
  value,
  onChange,
}) {
  // Destructure props
  return (
    <div className={className}>
      <p className="Departure">{name}</p>
      <div className="input_container">
        <input
          type="date"
          className="departure_input"
          placeholder={placeholder}
          name={name === "Departure" ? "departureDate" : "returnDate"}
          value={value}
          onChange={onChange}
        ></input>
      </div>
    </div>
  );
}
