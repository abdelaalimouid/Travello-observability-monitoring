package com.example.travelo_backend.controller;

import java.lang.reflect.Field;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.travelo_backend.model.Passenger;
import com.example.travelo_backend.model.Reservation;
import com.example.travelo_backend.model.Seat;
import com.example.travelo_backend.repository.FlightRepository;
import com.example.travelo_backend.repository.PassengerRepository;
import com.example.travelo_backend.repository.ReservationRepository;
import com.example.travelo_backend.repository.SeatRepository;

import dto.ReservationDto;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final PassengerRepository passengerRepository;
    private final FlightRepository flightRepository;
    private final SeatRepository seatRepository;
    private final ReservationRepository reservationRepository;

    public ReservationController(PassengerRepository passengerRepository, FlightRepository flightRepository,
                                  SeatRepository seatRepository, ReservationRepository reservationRepository) {
        this.passengerRepository = passengerRepository;
        this.flightRepository = flightRepository;
        this.seatRepository = seatRepository;
        this.reservationRepository = reservationRepository;
    }
    @PostMapping("/reserve")
    public ResponseEntity<String> reserveSeat(@RequestBody ReservationDto reservationDto) {
        Long flightId = reservationDto.getFlightId();
        String seatName = reservationDto.getSeatName();
        Passenger passenger = reservationDto.getPassenger();

        // Save passenger
        Passenger savedPassenger = passengerRepository.save(passenger);

        // Update seat status
        Seat seat = seatRepository.findById(flightId)
                .orElseThrow(() -> new RuntimeException("Seat not found for flightId: " + flightId));

        try {
            Field seatField = seat.getClass().getDeclaredField(seatName);
            seatField.setAccessible(true);

            // Check seat availability
            String seatStatus = (String) seatField.get(seat);
            if ("taken".equalsIgnoreCase(seatStatus)) {
                return new ResponseEntity<>("Seat already taken", HttpStatus.CONFLICT);
            }

            // Mark seat as taken
            seatField.set(seat, "taken");
            seatRepository.save(seat);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            return new ResponseEntity<>("Invalid seat name", HttpStatus.BAD_REQUEST);
        }

        // Save reservation
        Reservation reservation = new Reservation();
        reservation.setPassenger(savedPassenger);
        reservation.setFlight(flightRepository.findById(flightId)
                .orElseThrow(() -> new RuntimeException("Flight not found")));
        reservation.setSeat(seatName);
        reservationRepository.save(reservation);

        return new ResponseEntity<>("Seat reserved successfully", HttpStatus.OK);
    }
}