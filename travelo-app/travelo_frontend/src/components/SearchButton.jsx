import React from "react";
export default function SearchButton() {
  return (
    <div>
      <a href="SearchResults.html">
        <button className="SearchButton hidden">Search</button>
      </a>
      <div className="arrow hidden">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
