package com.example.travelo_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.travelo_backend.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> { 

}
