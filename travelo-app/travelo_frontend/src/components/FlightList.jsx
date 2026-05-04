import React, { useState, useEffect } from "react";
import Flight from "./Flight";
import "../Flights.css";

export default function FlightList({
  flights,
  showSeats,
  onBookFlight,
  selectedFlightId,
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {flights.map((flight, index) => (
        <Flight
          id={flight.idFlight}
          flight={flight}
          style={{
            top:
              showSeats && flight.idFlight === selectedFlightId
                ? "20%"
                : `${20 + index * 50}%`,
            display:
              showSeats && flight.idFlight !== selectedFlightId
                ? "none"
                : "block",
            left:
              showSeats && flight.idFlight === selectedFlightId
                ? "29.32%"
                : "auto",
          }}
          className={isLoaded ? "Flight show" : "Flight"}
          showSeats={showSeats}
          onBookFlight={() => onBookFlight(flight.idFlight)}
        />
      ))}
    </div>
  );
}
