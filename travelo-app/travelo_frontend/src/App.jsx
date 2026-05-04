import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Flights from "./pages/Flights";
import BookingPage from "./pages/BookingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookingPage />} />
        <Route path="/Flights" element={<Flights />} />
      </Routes>
    </BrowserRouter>
  );
}
