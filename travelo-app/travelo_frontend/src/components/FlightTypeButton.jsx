import React from "react";
export default function FlightTypeButon(props) {
  return (
    <button
      className={`${props.class} ${props.visibility}`}
      onClick={props.onClick}
    >
      <img
        id={props.id}
        src={props.arrowimg}
        height={props.height}
        width={props.width}
        style={props.styling}
        alt=""
      ></img>
      {props.name}
    </button>
  );
}
