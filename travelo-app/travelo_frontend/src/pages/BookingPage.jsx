import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackgroundImage from "../components/BackgroundImage";
import FlightTypeButon from "../components/FlightTypeButton.jsx";
import Dates from "../components/Dates.jsx";
import WhiteArrow from "../assets/straightFlecheBlanc.png";
import GreyArrow from "../assets/GreyArrow.png";
import RoundWhite from "../assets/RoundWhite.png";
import RoundGrey from "../assets/Round3.png";
import refreshButton from "../assets/refresh-button_7022719.png";
import "../index.css";
import PassengerINFO from "../components/PassengerINFO.jsx";
import TraveloFooter from "../components/TraveloFooter.jsx";
import Navbar from "../components/Navbar";

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSearchButton, setShowSearchButton] = useState(false);
  const [roundFlight, setRoundFlight] = useState(true);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
  });
  const [passengerData, setPassengerData] = useState({
    firstName: "",
    familyName: "",
    gender: "M",
    age: "",
    nationality: "",
    passport: "",
  });

  const handleRoundTripClick = () => {
    setRoundFlight(true);
  };

  const handleOneWayClick = () => {
    setRoundFlight(false);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleRefreshButtonClick = () => {
    setFormData({
      ...formData, // Keep other form data if needed
      from: "",
      to: "",
      departureDate: "",
      returnDate: "",
    });
  };

  useEffect(() => {
    // Check if all required fields are filled
    const isFormFilled =
      formData.from &&
      formData.to &&
      formData.departureDate &&
      (roundFlight ? formData.returnDate : true) &&
      // ... check other required fields ...
      passengerData.firstName &&
      passengerData.familyName &&
      passengerData.age &&
      passengerData.nationality &&
      passengerData.passport;

    setShowSearchButton(isFormFilled);
  }, [formData, passengerData, roundFlight]);

  const handleSubmit = async () => {
    try {
      const queryParams = new URLSearchParams({
        from: formData.from,
        to: formData.to,
        departureDate: new Date(formData.departureDate)
          .toISOString()
          .split("T")[0],
        ...(formData.returnDate && {
          returnDate: new Date(formData.returnDate).toISOString().split("T")[0],
        }),
      }).toString();

      const response = await fetch(
        `http://localhost:8080/api/flights/search?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch flights:", response.statusText);
        return;
      }

      const flights = await response.json();
      console.log("Fetched Flights:", flights);

      if (formData.returnDate) {
        navigate("/Flights", {
          state: {
            oneWayFlights: flights.oneWayFlights,
            returnFlights: flights.returnFlights,
            passengerData: passengerData,
          },
        });
      } else {
        navigate("/Flights", {
          state: { flights, passengerData: passengerData },
        });
      }
    } catch (error) {
      console.error("Error occurred during flight search:", error);
    }
  };

  return (
    <body>
      <Navbar />
      <content>
        <BackgroundImage />
        <h2 className="Find">Find your trip</h2>
        <FlightTypeButon
          class="FlightType"
          visibility={roundFlight ? "active" : "inactive"}
          id="White1"
          arrowimg={roundFlight ? RoundWhite : RoundGrey}
          height="25px"
          width="23px"
          name="Round"
          styling={{ margin: "0 10px 0 -5px" }}
          onClick={handleRoundTripClick}
        />
        <FlightTypeButon
          class="FlightType1"
          visibility={!roundFlight ? "active" : "inactive"}
          id="Grey2"
          arrowimg={!roundFlight ? WhiteArrow : GreyArrow}
          height="10px"
          width="27px"
          name="One way"
          styling={{ marginRight: "7px" }}
          onClick={handleOneWayClick}
        />

        <div className="search-form">
          <div className="from-to">
            <div className="form__group from">
              <input
                type="input"
                className="form__field"
                placeholder="From"
                name="from"
                id="from"
                required
                value={formData.from}
                onChange={handleChange}
                style={{ borderBottom: "0", fontSize: "30px" }}
              />
              <label
                for="from"
                className="form__label"
                style={{ fontSize: "20px" }}
              >
                From
              </label>
            </div>
            <hr
              className="separator1"
              style={{ height: "4px", width: "580px", top: "44%" }}
            />
            <div className="form__group to">
              <input
                type="input"
                className="form__field"
                placeholder="To"
                name="to"
                id="to"
                required
                value={formData.to}
                onChange={handleChange}
                style={{
                  borderBottom: "0",
                  fontSize: "30px",
                  marginTop: "25px",
                }}
              />
              <label
                for="to"
                className="form__label"
                style={{ fontSize: "20px", marginTop: "25px" }}
              >
                To
              </label>
            </div>
            <button
              className="RefreshButton"
              onClick={handleRefreshButtonClick}
            >
              <img
                className="refresh"
                src={refreshButton}
                height="35px"
                width="35px"
                alt=""
              ></img>
            </button>
          </div>
          <Dates
            class="DepartureDate"
            name="Departure"
            placeholder="Departure Date"
            value={formData.departureDate}
            onChange={handleChange}
          />
          {roundFlight && (
            <Dates
              class="ReturnDate"
              name="Return"
              placeholder="Return Date"
              value={formData.returnDate}
              onChange={handleChange}
            />
          )}
          <PassengerINFO
            passengerData={passengerData}
            setPassengerData={setPassengerData}
          />
        </div>
        <button
          className={`SearchButton ${showSearchButton ? "activeSearchButton" : "inactiveSearchButton"
            }`}
          onClick={() => {
            if (showSearchButton) {
              console.log("Search button clicked. Submitting...");
              handleSubmit();
            } else {
              console.log("Search button inactive. Cannot submit.");
            }
          }}
        >
          Search
          {showSearchButton && (
            <div
              className="arrow"
              style={{ position: "absolute", top: "42%", left: "58%" }}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </button>
        <TraveloFooter />
      </content>
    </body>
  );
};

export default BookingPage;
