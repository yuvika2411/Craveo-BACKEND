package com.Craveo.controller;

import com.Craveo.model.Food;
import com.Craveo.model.Restaurant;
import com.Craveo.model.User;
import com.Craveo.request.CreateFoodRequest;
import com.Craveo.service.FoodService;
import com.Craveo.service.RestaurantService;
import com.Craveo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food")
public class FoodController {
    @Autowired
    private FoodService foodService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping("/search")
    public ResponseEntity<List<Food>> searchFood(@RequestParam String name , @RequestHeader(value = "Authorization", required = false) String jwt) throws Exception {
        if (jwt != null && !jwt.isEmpty()) {
            User user= userService.findUserByJwtToken(jwt);
        }

        List<Food> foods = foodService.searchFood(name);

        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Food>> getRestaurantFood(@RequestParam boolean vegetarian ,
                                                        @RequestParam boolean seasonal ,
                                                        @RequestParam boolean nonVegetarian,
                                                        @PathVariable Long restaurantId,
                                                        @RequestParam(required = false) String foodCategory,
                                                        @RequestHeader(value = "Authorization", required = false) String jwt) throws Exception {
        if (jwt != null && !jwt.isEmpty()) {
            User user= userService.findUserByJwtToken(jwt);
        }

        List<Food> foods = foodService.getRestaurantsFood(restaurantId,vegetarian,nonVegetarian,seasonal,foodCategory);

        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

}
