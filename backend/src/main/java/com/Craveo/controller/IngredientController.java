package com.Craveo.controller;

import com.Craveo.model.IngredientCategory;
import com.Craveo.model.IngredientsItem;
import com.Craveo.request.IngredientCategoryRequest;
import com.Craveo.request.IngredientRequest;
import com.Craveo.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/ingredients")
public class IngredientController {

    @Autowired
    private IngredientService ingredientService;

    @PostMapping("/category")
    private ResponseEntity<IngredientCategory> createIngredientCategory(@RequestBody IngredientCategoryRequest req) throws Exception{
            IngredientCategory item= ingredientService.createIngredientCategory(req.getName(), req.getRestaurantId());
            return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    @PostMapping("")
    private ResponseEntity<IngredientsItem> createIngredientItem(@RequestBody IngredientRequest req) throws Exception{
        IngredientsItem item= ingredientService.createIngredientIem(req.getRestaurantId(),req.getName(), req.getCategoryId());
        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/stock")
    private ResponseEntity<IngredientsItem> updateIngredientStock(@PathVariable Long id) throws Exception{
        IngredientsItem item= ingredientService.updateStock(id);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @GetMapping("/restaurant/{id}")
    private ResponseEntity<List<IngredientsItem>> getRestaurantIngredient(@PathVariable Long id) throws Exception{
        List<IngredientsItem> items= ingredientService.findRestaurantsByIngredients(id);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }


    @GetMapping("/restaurant/{restaurantId}/category")
    private ResponseEntity<List<IngredientCategory>> getRestaurantIngredientCategory(
            @PathVariable Long restaurantId)throws Exception{
        List<IngredientCategory> category= ingredientService.findIngredientCategoryByRestaurantId(restaurantId);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }


}
