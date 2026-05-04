package com.example.travelo_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.travelo_backend.model.Passenger;

@Repository
public interface PassengerRepository extends JpaRepository<Passenger, Long> {
}