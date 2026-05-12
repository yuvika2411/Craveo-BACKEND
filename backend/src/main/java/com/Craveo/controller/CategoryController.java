package com.Craveo.controller;

import com.Craveo.model.FoodCategory;
import com.Craveo.model.User;
import com.Craveo.service.CategoryService;
import com.Craveo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<FoodCategory> createCategory(@RequestBody FoodCategory foodCategory,
                                                       @RequestHeader("Authorization") String jwt) throws Exception {
        User user= userService.findUserByJwtToken(jwt);
        FoodCategory createdFoodCategory= categoryService.createCategory(foodCategory.getName(), user.getId());
        return new ResponseEntity<>(createdFoodCategory, HttpStatus.CREATED);
    }

    @GetMapping("/restaurant")
    public ResponseEntity<List<FoodCategory>> getRestaurantCategory(@RequestHeader("Authorization") String jwt) throws Exception {
        User user= userService.findUserByJwtToken(jwt);
        List<FoodCategory> categories= categoryService.findCategoryByRestaurantId(user.getId());
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
}
