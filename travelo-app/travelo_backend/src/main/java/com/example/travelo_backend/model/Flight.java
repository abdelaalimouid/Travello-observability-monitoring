package com.example.travelo_backend.model;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "flight") 
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_flight")
    private int idFlight;

    @Column(name = "departure_city")
    private String departureCity;

    @Column(name = "departure_airport")
    private String departureAirport;

    @Column(name = "arrival_city")
    private String arrivalCity;

    @Column(name = "arrival_airport")
    private String arrivalAirport;

    @Column(name = "date")
    private Date date;

    @Column(name = "departureTime")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalTime departureTime;

    @Column(name = "arrivalTime")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalTime arrivalTime;

    @Column(name = "company")
    private String company;

    @Column(name = "price")
    private BigDecimal price;

    // Constructors, getters and setters

    public int getIdFlight() {
        return idFlight;
    }

    public String getDepartureCity() {
        return departureCity;
    }

    public String getDepartureAirport() {
        return departureAirport;
    }

    public String getArrivalCity() {
        return arrivalCity;
    }

    public String getArrivalAirport() {
        return arrivalAirport;
    }

    public Date getDate() {
        return date;
    }

    public LocalTime getDepartureTime() {
        return departureTime;
    }

    public LocalTime getArrivalTime() {
        return arrivalTime;
    }

    public String getCompany() {
        return company;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setDepartureCity(String departureCity) {
        this.departureCity = departureCity;
    }

    public void setDepartureAirport(String departureAirport) {
        this.departureAirport = departureAirport;
    }

    public void setArrivalCity(String arrivalCity) {
        this.arrivalCity = arrivalCity;
    }

    public void setArrivalAirport(String arrivalAirport) {
        this.arrivalAirport = arrivalAirport;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setDepartureTime(LocalTime departureTime) {
        this.departureTime = departureTime;
    }

    public void setArrivalTime(LocalTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
