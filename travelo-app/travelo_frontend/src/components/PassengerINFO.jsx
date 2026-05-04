import React from "react";
import { useState, useEffect } from "react";
import male1 from "../assets/male2.png";
// eslint-disable-next-line
import male2 from "../assets/male11.png";
// eslint-disable-next-line
import male3 from "../assets/male3.png";
// eslint-disable-next-line
import male4 from "../assets/male4.png";
// eslint-disable-next-line
import female1 from "../assets/female1.png";
// eslint-disable-next-line
import female2 from "../assets/female2.png";
// eslint-disable-next-line
import female3 from "../assets/female3.png";
// eslint-disable-next-line
import female4 from "../assets/female4.png";

export default function PassengerINFO({ passengerData, setPassengerData }) {
  const [randomMaleImage, setRandomMaleImage] = useState(null); // State for male image
  const [randomFemaleImage, setRandomFemaleImage] = useState(null);
  const maleImages = [male1, male2, male3, male4];
  const femaleImages = [female1, female2, female3, female4];

  useEffect(() => {
    // Set initial random images
    setRandomMaleImage(getRandomImage(maleImages));
    setRandomFemaleImage(getRandomImage(femaleImages));
  }, []);

  const getRandomImage = (images) => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const handleChange = (event) => {
    setPassengerData({
      ...passengerData,
      [event.target.name]: event.target.value,
    });
  };

  const handleGenderChange = (gender) => {
    setPassengerData({
      ...passengerData,
      gender: gender,
    });
  };

  return (
    <>
      <ul id="allpassengers" className="ListPassengers">
        <li className="passenger">
          <button>
            <img
              className={`passengerImage ${
                passengerData.gender === "M"
                  ? "activePassenger"
                  : "activePassengerFemale"
              }`}
              src={
                passengerData.gender === "M"
                  ? randomMaleImage
                  : randomFemaleImage
              }
              alt=""
            ></img>
          </button>
        </li>
      </ul>
      <div id="info1" className="passenger_info">
        <div className="form__group first">
          <input
            type="input"
            className="form__field"
            placeholder="First name"
            name="firstName"
            id="first_name"
            required
            value={passengerData.firstName}
            onChange={handleChange}
          />
          <label for="name" className="form__label">
            First name
          </label>
        </div>
        <div className="form__group family">
          <input
            type="input"
            className="form__field"
            placeholder="Family name"
            name="familyName"
            id="family_name"
            required
            value={passengerData.familyName}
            onChange={handleChange}
          />
          <label for="family_name" className="form__label">
            Family name
          </label>
        </div>
        <button
          id="M1"
          className={`male_circle ${
            passengerData.gender === "M" ? "activeGender" : ""
          }`}
          onClick={() => handleGenderChange("M")}
        >
          M
        </button>
        <button
          id="F1"
          className={`female_circle ${
            passengerData.gender === "F" ? "activeGender" : ""
          }`}
          onClick={() => handleGenderChange("F")}
        >
          F
        </button>
        <div className="form__group age">
          <input
            type="number"
            className="form__field"
            placeholder="Age"
            name="age"
            id="age"
            required
            value={passengerData.age}
            onChange={handleChange}
          />
          <label for="age" className="form__label">
            Age
          </label>
        </div>
        <div className="form__group nationality">
          <input
            type="input"
            className="form__field"
            placeholder="Nationality"
            name="nationality"
            id="nationality"
            required
            value={passengerData.nationality}
            onChange={handleChange}
          />
          <label for="nationality" className="form__label">
            Nationality
          </label>
        </div>
        <div className="form__group num_pass">
          <input
            type="input"
            className="form__field"
            placeholder="Passeport"
            name="passport"
            id="num_pass"
            required
            value={passengerData.passport}
            onChange={handleChange}
          />
          <label for="num_pass" className="form__label">
            Passeport
          </label>
        </div>
      </div>
    </>
  );
}
