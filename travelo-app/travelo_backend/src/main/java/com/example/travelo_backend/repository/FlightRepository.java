package com.example.travelo_backend.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.travelo_backend.model.Flight;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {

    @Query("SELECT f FROM Flight f " +
           "WHERE (f.departureCity = :from OR f.departureAirport = :from) " +
           "AND (f.arrivalCity = :to OR f.arrivalAirport = :to) " +
           "AND f.date = :departureDate")
    List<Flight> findOneWayFlights(
            @Param("from") String from,
            @Param("to") String to,
            @Param("departureDate") Date departureDate
    );
    @Query("SELECT f FROM Flight f " +
            "WHERE (f.departureCity = :to OR f.departureAirport = :to) " +
            "AND (f.arrivalCity = :from OR f.arrivalAirport = :from) " +
            "AND f.date = :returnDate")
    List<Flight> findReturnFlights(
            @Param("from") String from,
            @Param("to") String to,
            @Param("returnDate") Date returnDate
);
}