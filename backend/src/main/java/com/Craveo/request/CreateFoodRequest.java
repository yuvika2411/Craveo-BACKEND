package com.Craveo.request;

import com.Craveo.model.FoodCategory;
import lombok.Data;

import java.util.List;

@Data
public class CreateFoodRequest {

    private String name;
    private String description;
    private Long price;

    private FoodCategory category;
    private List<String> images;

    private Long restaurantId;
    private Long categoryId;
    private boolean isVegetarian;
    private boolean isSeasonal;
    private boolean available;
}
