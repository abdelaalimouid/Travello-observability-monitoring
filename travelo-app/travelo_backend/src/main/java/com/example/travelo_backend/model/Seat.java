package com.example.travelo_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "seats")
public class Seat {

    @Id
    private int id;

    @OneToOne
    @JoinColumn(name = "id_flight")
    private Flight flight;

    @Column(name = "a1")
    private String a1;

    @Column(name = "b1")
    private String b1;

    @Column(name = "c1")
    private String c1;

    @Column(name = "d1")
    private String d1;

    @Column(name = "a2")
    private String a2;

    @Column(name = "b2")
    private String b2;

    @Column(name = "c2")
    private String c2;

    @Column(name = "d2")
    private String d2;

    @Column(name = "a3")
    private String a3;

    @Column(name = "b3")
    private String b3;

    @Column(name = "c3")
    private String c3;

    @Column(name = "d3")
    private String d3;

    @Column(name = "a4")
    private String a4;

    @Column(name = "b4")
    private String b4;

    @Column(name = "c4")
    private String c4;

    @Column(name = "d4")
    private String d4;

    @Column(name = "a5")
    private String a5;

    @Column(name = "b5")
    private String b5;

    @Column(name = "c5")
    private String c5;

    @Column(name = "d5")
    private String d5;

    @Column(name = "a6")
    private String a6;

    @Column(name = "b6")
    private String b6;

    @Column(name = "c6")
    private String c6;

    @Column(name = "d6")
    private String d6;

    @Column(name = "a7")
    private String a7;

    @Column(name = "b7")
    private String b7;

    @Column(name = "c7")
    private String c7;

    @Column(name = "d7")
    private String d7;

    @Column(name = "a8")
    private String a8;

    @Column(name = "b8")
    private String b8;

    @Column(name = "c8")
    private String c8;

    @Column(name = "d8")
    private String d8;

    @Column(name = "a9")
    private String a9;

    @Column(name = "b9")
    private String b9;

    @Column(name = "c9")
    private String c9;

    @Column(name = "d9")
    private String d9;

    // Constructors, getters and setters 
    public int getId() {
        return id;
    }

    public int getIdFlight() {
        return this.flight.getIdFlight();
    }

    public String getA1() {
        return a1;
    }

    public String getB1() {
        return b1;
    }

    public String getC1() {
        return c1;
    }

    public String getD1() {
        return d1;
    }

    public String getA2() {
        return a2;
    }

    public String getB2() {
        return b2;
    }

    public String getC2() {
        return c2;
    }

    public String getD2() {
        return d2;
    }

    public String getA3() {
        return a3;
    }

    public String getB3() {
        return b3;
    }

    public String getC3() {
        return c3;
    }

    public String getD3() {
        return d3;
    }

    public String getA4() {
        return a4;
    }

    public String getB4() {
        return b4;
    }

    public String getC4() {
        return c4;
    }

    public String getD4() {
        return d4;
    }

    public String getA5() {
        return a5;
    }

    public String getB5() {
        return b5;
    }

    public String getC5() {
        return c5;
    }

    public String getD5() {
        return d5;
    }

    public String getA6() {
        return a6;
    }

    public String getB6() {
        return b6;
    }

    public String getC6() {
        return c6;
    }

    public String getD6() {
        return d6;
    }

    public String getA7() {
        return a7;
    }

    public String getB7() {
        return b7;
    }

    public String getC7() {
        return c7;
    }

    public String getD7() {
        return d7;
    }

    public String getA8() {
        return a8;
    }

    public String getB8() {
        return b8;
    }

    public String getC8() {
        return c8;
    }

    public String getD8() {
        return d8;
    }

    public String getA9() {
        return a9;
    }

    public String getB9() {
        return b9;
    }

    public String getC9() {
        return c9;
    }

    public String getD9() {
        return d9;
    }

    public void setA1(String a1) {
        this.a1 = a1;
    }

    public void setB1(String b1) {
        this.b1 = b1;
    }

    public void setC1(String c1) {
        this.c1 = c1;
    }

    public void setD1(String d1) {
        this.d1 = d1;
    }

    public void setA2(String a2) {
        this.a2 = a2;
    }

    public void setB2(String b2) {
        this.b2 = b2;
    }

    public void setC2(String c2) {
        this.c2 = c2;
    }

    public void setD2(String d2) {
        this.d2 = d2;
    }

    public void setA3(String a3) {
        this.a3 = a3;
    }

    public void setB3(String b3) {
        this.b3 = b3;
    }

    public void setC3(String c3) {
        this.c3 = c3;
    }

    public void setD3(String d3) {
        this.d3 = d3;
    }

    public void setA4(String a4) {
        this.a4 = a4;
    }

    public void setB4(String b4) {
        this.b4 = b4;
    }

    public void setC4(String c4) {
        this.c4 = c4;
    }

    public void setD4(String d4) {
        this.d4 = d4;
    }

    public void setA5(String a5) {
        this.a5 = a5;
    }

    public void setB5(String b5) {
        this.b5 = b5;
    }

    public void setC5(String c5) {
        this.c5 = c5;
    }

    public void setD5(String d5) {
        this.d5 = d5;
    }

    public void setA6(String a6) {
        this.a6 = a6;
    }

    public void setB6(String b6) {
        this.b6 = b6;
    }

    public void setC6(String c6) {
        this.c6 = c6;
    }

    public void setD6(String d6) {
        this.d6 = d6;
    }

    public void setA7(String a7) {
        this.a7 = a7;
    }

    public void setB7(String b7) {
        this.b7 = b7;
    }

    public void setC7(String c7) {
        this.c7 = c7;
    }

    public void setD7(String d7) {
        this.d7 = d7;
    }

    public void setA8(String a8) {
        this.a8 = a8;
    }

    public void setB8(String b8) {
        this.b8 = b8;
    }

    public void setC8(String c8) {
        this.c8 = c8;
    }

    public void setD8(String d8) {
        this.d8 = d8;
    }

    public void setA9(String a9) {
        this.a9 = a9;
    }

    public void setB9(String b9) {
        this.b9 = b9;
    }

    public void setC9(String c9) {
        this.c9 = c9;
    }

    public void setD9(String d9) {
        this.d9 = d9;
    }
}