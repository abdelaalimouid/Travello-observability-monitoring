import React from "react";
import "../Flights.css";

export default function Seat({ id, name, status, onClick, isSelected }) {
  const seatClassName = `seat ${name} ${status} ${
    isSelected ? "selected" : ""
  }`;

  return (
    <button className={seatClassName} id={id} onClick={onClick}>
      {name}
    </button>
  );
}
