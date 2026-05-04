import React from "react";
import Seat from "./Seat"; // Import Seat component

export default function Seats({
  seatData,
  flightId,
  onSeatClick,
  selectedSeat,
}) {
  /*const seatData = [
    // Row 1
    { id: "a1", name: "a1", status: "empty" },
    { id: "b1", name: "b1", status: "taken" },
    { id: "c1", name: "c1", status: "empty" },
    { id: "d1", name: "d1", status: "empty" },
    // Row 2
    { id: "a2", name: "a2", status: "empty" },
    { id: "b2", name: "b2", status: "empty" },
    { id: "c2", name: "c2", status: "taken" },
    { id: "d2", name: "d2", status: "empty" },
    // Row 3
    { id: "a3", name: "a3", status: "empty" },
    { id: "b3", name: "b3", status: "empty" },
    { id: "c3", name: "c3", status: "empty" },
    { id: "d3", name: "d3", status: "empty" },
    // Row 4
    { id: "a4", name: "a4", status: "taken" },
    { id: "b4", name: "b4", status: "empty" },
    { id: "c4", name: "c4", status: "taken" },
    { id: "d4", name: "d4", status: "empty" },
    // Row 5
    { id: "a5", name: "a5", status: "empty" },
    { id: "b5", name: "b5", status: "taken" },
    { id: "c5", name: "c5", status: "empty" },
    { id: "d5", name: "d5", status: "empty" },
    // Row 6
    { id: "a6", name: "a6", status: "empty" },
    { id: "b6", name: "b6", status: "taken" },
    { id: "c6", name: "c6", status: "empty" },
    { id: "d6", name: "d6", status: "taken" },
    // Row 7
    { id: "a7", name: "a7", status: "empty" },
    { id: "b7", name: "b7", status: "empty" },
    { id: "c7", name: "c7", status: "taken" },
    { id: "d7", name: "d7", status: "empty" },
    // Row 8
    { id: "a8", name: "a8", status: "taken" },
    { id: "b8", name: "b8", status: "empty" },
    { id: "c8", name: "c8", status: "empty" },
    { id: "d8", name: "d8", status: "empty" },
    // Row 9
    { id: "a9", name: "a9", status: "empty" },
    { id: "b9", name: "b9", status: "empty" },
    { id: "c9", name: "c9", status: "taken" },
    { id: "d9", name: "d9", status: "empty" },
  ];*/

  return (
    <div className="Seats">
      {seatData.map((seat) => (
        <Seat
          id={seat.id}
          status={seat.status}
          name={seat.name}
          onClick={() => onSeatClick(seat.id)}
          isSelected={seat.id === selectedSeat}
        />
      ))}
    </div>
  );
}
