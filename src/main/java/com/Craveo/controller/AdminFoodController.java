package com.Craveo.controller;

import com.Craveo.model.Food;
import com.Craveo.model.Restaurant;
import com.Craveo.model.User;
import com.Craveo.request.CreateFoodRequest;
import com.Craveo.response.MessageResponse;
import com.Craveo.service.FoodService;
import com.Craveo.service.RestaurantService;
import com.Craveo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/food")
public class AdminFoodController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @PostMapping
    public ResponseEntity<Food> createFood(@RequestBody CreateFoodRequest req, @RequestHeader("Authorization") String jwt) throws Exception {
        User user= userService.findUserByJwtToken(jwt);
        Restaurant restaurant= restaurantService.findRestaurantById(req.getRestaurantId());
        Food food= foodService.createFood(req, req.getCategory(),restaurant);

        return new ResponseEntity<>(food, HttpStatus.CREATED);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteFood(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception {
        User user= userService.findUserByJwtToken(jwt);
        foodService.deleteFood(id);

        MessageResponse res= new MessageResponse();
        res.setMessage("Food deleted successfully.");
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PostMapping("/{id}")
    public ResponseEntity<MessageResponse> searchFood(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception {
        User user= userService.findUserByJwtToken(jwt);
        foodService.deleteFood(id);

        MessageResponse res= new MessageResponse();
        res.setMessage("Food deleted successfully.");
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFoodAvailabilityStatus(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception {
        User user= userService.findUserByJwtToken(jwt);
        Food food= foodService.updateAvailabilityStatus(id);

        return new ResponseEntity<>(food, HttpStatus.CREATED);
    }
}
