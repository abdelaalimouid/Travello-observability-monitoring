package com.example.travelo_backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.travelo_backend.model.Flight;
import com.example.travelo_backend.repository.FlightRepository;

@Service
public class FlightService {

    @Autowired
    private FlightRepository flightRepository;

    public List<Flight> searchOneWayFlights(String from, String to, Date departureDate) {
        return flightRepository.findOneWayFlights(from, to, departureDate);
    }
    public List<Flight> searchReturnFlights(String from, String to, Date returnDate) {
        return flightRepository.findReturnFlights(from, to, returnDate);
    }
}
