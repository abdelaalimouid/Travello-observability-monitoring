import React from "react";
import "../Flights.css";
import qrCode from "../assets/qr_code2.jpg";
export default function Ticket({ flight }) {
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
    <div id="ticket1" className="ticket">
      <div className="circle1"></div>
      <div className="circle2"></div>
      <div className="AiroportDepart">{flight.departureAirport}</div>
      <div className="heureDepart">{flight.departureTime}</div>
      <div className="AiroportArrivee">{flight.arrivalAirport}</div>
      <div className="heureArrivee">{flight.arrivalTime}</div>
      <hr className="line" />
      <div className="Flight_duration">Flight duration:</div>
      <div className="time">{duration}</div>
      <img
        className="qrCode"
        src={qrCode}
        height="150px"
        width="150px"
        alt="QrCode"
      />
    </div>
  );
}
