package com.Craveo.request;

import com.Craveo.model.IngredientCategory;
import com.Craveo.service.IngredientService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

@Data
public class IngredientCategoryRequest {

    private String name;
    private Long restaurantId;


}
