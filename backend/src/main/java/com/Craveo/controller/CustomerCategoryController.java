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
@RequestMapping("/api/category")
public class CustomerCategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    @GetMapping("/restaurant/{id}")
    public ResponseEntity<List<FoodCategory>> getRestaurantCategory(
            @PathVariable Long id,
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        List<FoodCategory> categories = categoryService.findCategoryByRestaurantIdActual(id);
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
}
