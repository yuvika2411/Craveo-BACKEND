package com.Craveo.model;

import com.Craveo.dto.RestaurantDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity // tells JPA/Hibernate that this class represents a database table.
//In simple words: Class = Table, Object = Row

@Data //You don’t need to write getters, setters, constructors, toString(), equals() manually.
@AllArgsConstructor //It helps to create an object by passing all values at once.
@NoArgsConstructor //It allows frameworks like Hibernate to create an object without passing values.


public class User {

    @Id //marks a field as the primary key of the entity.
    @GeneratedValue(strategy = GenerationType.AUTO)
    //tells JPA/Hibernate to automatically generate the value of the primary key.
    private Long Id;

    private String fullName;

    private String email;

    private String password;

    @Enumerated
    //Enum is used to restrict a variable to fixed, predefined values (to avoid invalid or wrong data).
    private USER_ROLE role =USER_ROLE.ROLE_CUSTOMER;

    @JsonIgnore // bolta hai ki jab data JSON me convert ho, to ye field send na ho.
    //User fetch karoge → Order list JSON response me nahi aayegi
    @OneToMany (cascade= CascadeType.ALL, mappedBy = "customer") //batata hai ki ek User ke multiple Orders ho sakte hain i.e. database relationship batata hai
    private List<Order> orders= new ArrayList<>();


    @ElementCollection //It stores list/set of basic data (String, Integer, etc.) in a separate table.
    private List<RestaurantDto> favorites= new ArrayList<>();


    @ElementCollection
    @OneToMany(cascade = CascadeType.ALL , orphanRemoval = true) //applies all parent operations to its related child entities automatically.
    //if I delete the user automatically all the addresses of that user will be deleted
    private List<Address> addresses= new ArrayList<>();



}
