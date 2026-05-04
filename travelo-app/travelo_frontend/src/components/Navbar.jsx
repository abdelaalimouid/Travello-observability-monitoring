import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="header">
      <ul>
        <li>
          <div className="logo">
            <span className="bitra">Travelo</span>
          </div>
        </li>
        <li>
          <div className="menu">
            <hr className="separator" />
            <ul>
              <li>
                <div onClick={() => navigate("/")}>
                  <strong>Home</strong>
                </div>
              </li>
              <li>
                <div onClick={() => navigate("/")}>
                  <strong>Hotels</strong>
                </div>
              </li>
              <li>
                <div onClick={() => navigate("/")}>
                  <strong>Car rentals</strong>
                </div>
              </li>
              <li>
                <div onClick={() => navigate("/")}>
                  <strong>Attractions</strong>
                </div>
              </li>
              <li>
                <div onClick={() => navigate("/")}>
                  <strong>Airport taxis</strong>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}
