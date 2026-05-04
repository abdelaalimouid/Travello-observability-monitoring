import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../Flights.css";
import FlightList from "../components/FlightList";
import Seats from "../components/Seats";
import Ticket from "../components/Ticket";
import TraveloFooter from "../components/TraveloFooter.jsx";

const Flights = () => {
  const location = useLocation();
  const [showSeats, setShowSeats] = useState(false);
  const [selectedFlightId, setSelectedFlightId] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [showTicket, setShowTicket] = useState(false);
  const [flights, setFlights] = useState([]);
  const [seatData, setSeatData] = useState([]);
  const [passengerData, setPassengerData] = useState(null);

  useEffect(() => {
    const { state } = location;
    if (state) {
      const { oneWayFlights, returnFlights, passengerData } = state;
      setPassengerData(state.passengerData);
      const combinedFlights =
        oneWayFlights || returnFlights
          ? [...(oneWayFlights || []), ...(returnFlights || [])]
          : state.flights;
      setFlights(combinedFlights || []);
    }
  }, [location]);

  useEffect(() => {
    const fetchSeatData = async (flightId) => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/seats/${flightId}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched seat data:", data); // Debug
          const processedSeatData = processSeatData(data);
          setSeatData(processedSeatData);
        } else {
          console.error("Failed to fetch seat data");
        }
      } catch (error) {
        console.error("Error fetching seat data:", error);
      }
    };

    if (selectedFlightId) fetchSeatData(selectedFlightId);
  }, [selectedFlightId]);

  const processSeatData = (data) => {
    return Object.entries(data).map(([key, value]) => ({
      id: key, // The seat ID (e.g., "d1")
      name: key,
      status: value, // Status ("empty" or "taken")
    }));
  };

  const handleBookFlightClick = (flightId) => {
    setShowSeats(true);
    setSelectedFlightId(flightId);
  };

  const handleReserveButtonClick = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/reservations/reserve",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            flightId: selectedFlightId,
            seatName: selectedSeat,
            passenger: {
              // Include passenger data from your passengerData state
              firstName: passengerData.firstName,
              familyName: passengerData.familyName,
              gender: passengerData.gender,
              age: passengerData.age,
              passport: passengerData.passport,
            },
          }),
        }
      );

      if (response.ok) {
        // Handle successful reservation (e.g., show a success message)
        console.log("Reservation successful");
        setShowTicket(true); // Show the ticket or confirmation
      } else {
        // Handle reservation error (e.g., display an error message)
        console.error("Failed to reserve seat");
      }
    } catch (error) {
      console.error("Error reserving seat:", error);
    }
  };

  const handleSeatClick = (seatId) => {
    console.log("Selected Seat:", seatId);
    setSelectedSeat(seatId); // Update the selectedSeat state
  };

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  useEffect(() => {
    if (selectedFlightId && showSeats) {
      scrollToTop();
    }
  }, [selectedFlightId, showSeats]);

  return (
    <body>
      <Navbar />
      <div className="content">
        <div className="content3">
          <FlightList
            flights={flights}
            showSeats={showSeats}
            onBookFlight={handleBookFlightClick}
            selectedFlightId={selectedFlightId}
          />
          {showSeats && (
            <>
              {!showTicket ? (
                <>
                  <Seats
                    flightId={selectedFlightId}
                    onSeatClick={handleSeatClick}
                    selectedSeat={selectedSeat}
                    seatData={seatData}
                  />
                  <button
                    className={`reserveButton ${selectedSeat ? "" : "hidden"}`}
                    onClick={handleReserveButtonClick}
                  >
                    Reserve Seat
                  </button>
                  <div className="blue_box">
                    <p className="Reserve_Your_Seats">Reserve Your Seats</p>
                    <div className="arrow">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="white_box">
                    <p class="Reservation">Reservation completed</p>
                  </div>
                  <div class="success-checkmark">
                    <div class="check-icon">
                      <span class="icon-line line-tip"></span>
                      <span class="icon-line line-long"></span>
                      <div class="icon-circle"></div>
                      <div class="icon-fix"></div>
                    </div>
                  </div>
                  <div class="tickets">
                    <Ticket
                      flight={flights.find(
                        (flight) => flight.idFlight === selectedFlightId
                      )}
                    />
                    <div id="ticket2" className="ticket">
                      <div className="circle1"></div>
                      <div className="circle2"></div>
                    </div>
                    <div id="ticket3" className="ticket">
                      <div className="circle1"></div>
                      <div className="circle2"></div>
                    </div>
                    <div id="ticket4" className="ticket">
                      <div className="circle1"></div>
                      <div className="circle2"></div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <TraveloFooter />
    </body>
  );
};
export default Flights;
