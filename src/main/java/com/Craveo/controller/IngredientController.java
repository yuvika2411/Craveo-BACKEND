package com.Craveo.controller;

import com.Craveo.model.IngredientCategory;
import com.Craveo.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/ingredients")
public class IngredientController {

    @Autowired
    private IngredientService ingredientService;

    private ResponseEntity<IngredientCategory> createIngredientCategory()
}
