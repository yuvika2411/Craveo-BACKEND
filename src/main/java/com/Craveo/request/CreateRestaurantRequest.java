package com.Craveo.request;


import com.Craveo.model.Address;
import com.Craveo.model.ContactInformation;
import lombok.Data;

import java.util.List;

@Data
public class CreateRestaurantRequest {

    private Long id;
    private String name;
    private String description;
    private String cuisineType;
    private Address address;
    private ContactInformation contactInformation;
    private String openingHrs;
    private List<String> images;



}
