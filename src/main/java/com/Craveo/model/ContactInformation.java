package com.Craveo.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
public class ContactInformation {

    private String mobileNo;
    private String email;
    private String twitter;
    private String instagram;
}
