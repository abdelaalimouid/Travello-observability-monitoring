import React from "react";
import "../Flights.css";
import fromto from "../assets/fromto.png";

export default function Flight({ flight, style, onBookFlight }) {
  const calculateDuration = (departureTime, arrivalTime) => {
    const [depHour, depMin] = departureTime.split(":").map(Number);
    const [arrHour, arrMin] = arrivalTime.split(":").map(Number);

    const depMinutes = depHour * 60 + depMin;
    const arrMinutes = arrHour * 60 + arrMin;

    let durationMinutes = arrMinutes - depMinutes;
    if (durationMinutes < 0) {
      durationMinutes += 24 * 60;
    }

    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    const paddedMinutes = minutes.toString().padStart(2, "0");

    return `${hours}h ${paddedMinutes}min`;
  };

  const duration = calculateDuration(flight.departureTime, flight.arrivalTime);
  return (
    <div id={flight.id} className="Flight" style={style}>
      <div className="departure">{flight.departureAirport}</div>
      <div className="departureTime">{flight.departureTime}</div>
      <div className="arrival">{flight.arrivalAirport}</div>
      <div className="arrivalTime">{flight.arrivalTime}</div>
      <div className="duration">{duration}</div>
      <img className="fromto" src={fromto} width="350px" alt="arrow"></img>
      <hr className="separator1"></hr>
      <div className="price">{flight.price}MAD</div>
      <div className="Company">{flight.company}</div>
      <button className="Flight_Info" onClick={onBookFlight}>
        Book Flight
      </button>
    </div>
  );
}
