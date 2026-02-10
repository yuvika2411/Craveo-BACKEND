package com.Craveo.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.List;

@Data
@Embeddable //used to define a class whose fields are stored inside another entity’s table, not in a separate table.

public class RestaurantDto {

    private String title;

    @Column(length=1000) //sets the maximum size of a database column to 1000 characters.
    private List<String> images;

    private String description;

    private Long id;

}
