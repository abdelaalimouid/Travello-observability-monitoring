package com.example.travelo_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;  // Make sure this import is correct
import org.springframework.stereotype.Repository;

import com.example.travelo_backend.model.Seat;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> { 
    // You can add custom queries here if needed
}