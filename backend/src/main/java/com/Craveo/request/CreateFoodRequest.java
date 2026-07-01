package com.Craveo.request;

import com.Craveo.model.FoodCategory;
import com.Craveo.model.IngredientsItem;
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
    private boolean vegetarian;
    private boolean seasonal;
    private List<IngredientsItem> ingredients;
}
