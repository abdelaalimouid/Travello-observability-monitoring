import React from "react";
import background from "../assets/HalfMap2.png";
import "../index.css";

export default function BackgroundImage() {
  return <img className="halfMap" src={background} alt="World Map"></img>;
}
