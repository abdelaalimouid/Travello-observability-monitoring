package com.example.travelo_backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.travelo_backend.model.Seat;
import com.example.travelo_backend.repository.SeatRepository;

@RestController
@RequestMapping("/api/seats")
public class SeatController {

    @Autowired
    private SeatRepository seatRepository;

    @GetMapping("/{flightId}")
    public ResponseEntity<Map<String, String>> getSeats(@PathVariable Long flightId) {
        Seat seat = seatRepository.findById(flightId)
                .orElseThrow(() -> new RuntimeException("Seat not found for flightId: " + flightId));

        Map<String, String> seatData = new HashMap<>();
        seatData.put("a1", seat.getA1());
        seatData.put("b1", seat.getB1());
        seatData.put("c1", seat.getC1());
        seatData.put("d1", seat.getD1());
        seatData.put("a2", seat.getA2());
        seatData.put("b2", seat.getB2());
        seatData.put("c2", seat.getC2());
        seatData.put("d2", seat.getD2());
        seatData.put("a3", seat.getA3());
        seatData.put("b3", seat.getB3());
        seatData.put("c3", seat.getC3());
        seatData.put("d3", seat.getD3());
        seatData.put("a4", seat.getA4());
        seatData.put("b4", seat.getB4());
        seatData.put("c4", seat.getC4());
        seatData.put("d4", seat.getD4());
        seatData.put("a5", seat.getA5());
        seatData.put("b5", seat.getB5());
        seatData.put("c5", seat.getC5());
        seatData.put("d5", seat.getD5());
        seatData.put("a6", seat.getA6());
        seatData.put("b6", seat.getB6());
        seatData.put("c6", seat.getC6());
        seatData.put("d6", seat.getD6());
        seatData.put("a7", seat.getA7());
        seatData.put("b7", seat.getB7());
        seatData.put("c7", seat.getC7());
        seatData.put("d7", seat.getD7());
        seatData.put("a8", seat.getA8());
        seatData.put("b8", seat.getB8());
        seatData.put("c8", seat.getC8());
        seatData.put("d8", seat.getD8());
        seatData.put("a9", seat.getA9());
        seatData.put("b9", seat.getB9());
        seatData.put("c9", seat.getC9());
        seatData.put("d9", seat.getD9());

        return new ResponseEntity<>(seatData, HttpStatus.OK);
    }
}