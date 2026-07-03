package com.Craveo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Events {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String location;
    private String startedAt;
    private String endsAt;
    private int guests;
    private String status; // "Pending", "Confirmed", "Cancelled"

    @ManyToOne
    private User customer;

    @ManyToOne
    private Restaurant restaurant;

    @ElementCollection
    private List<String> images;
}
