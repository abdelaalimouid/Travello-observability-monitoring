package com.example.travelo_backend.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.travelo_backend.model.Flight;
import com.example.travelo_backend.service.FlightService;

@RestController
@RequestMapping("/api/flights")
public class FlightController {

    @Autowired
    private FlightService flightService;

    @GetMapping("/search")
    public ResponseEntity<?> searchFlights(
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date departureDate,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date returnDate // Optional
            
    ) {
        if (returnDate == null) { 
            List<Flight> oneWayFlights = flightService.searchOneWayFlights(from, to, departureDate);
            return new ResponseEntity<>(oneWayFlights, HttpStatus.OK);
        } else {
            List<Flight> oneWayFlights = flightService.searchOneWayFlights(from, to, departureDate);
            List<Flight> returnFlights = flightService.searchReturnFlights(from, to, returnDate);
            Map<String, List<Flight>> roundTripFlights = new HashMap<>();
            roundTripFlights.put("returnFlights", returnFlights);
            roundTripFlights.put("oneWayFlights", oneWayFlights);
            

            return new ResponseEntity<>(roundTripFlights, HttpStatus.OK); 
        }
    }
}