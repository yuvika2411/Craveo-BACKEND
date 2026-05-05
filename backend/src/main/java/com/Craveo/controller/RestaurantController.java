package com.Craveo.controller;

import com.Craveo.dto.RestaurantDto;
import com.Craveo.model.Restaurant;
import com.Craveo.model.User;
import com.Craveo.service.RestaurantService;
import com.Craveo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private UserService userService;

    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchRestaurant(
            @RequestHeader(value = "Authorization", required = false) String jwt,
            @RequestParam String keyword
    ) throws Exception {
        if (jwt != null && jwt.startsWith("Bearer ")) {
            userService.findUserByJwtToken(jwt);
        }
        List<Restaurant> restaurants = restaurantService.searchRestaurant(keyword);
        return new ResponseEntity<>(restaurants, HttpStatus.OK);  // ✅ was CREATED
    }

    @GetMapping
    public ResponseEntity<List<Restaurant>> getAllRestaurant(
            @RequestHeader(value = "Authorization", required = false) String jwt
    ) throws Exception {
        if (jwt != null && jwt.startsWith("Bearer ")) {
            userService.findUserByJwtToken(jwt);
        }
        List<Restaurant> restaurants = restaurantService.getAllRestaurant();
        return new ResponseEntity<>(restaurants, HttpStatus.OK);  // ✅ was CREATED
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> findRestaurantById(
            @RequestHeader(value = "Authorization", required = false) String jwt,
            @PathVariable Long id
    ) throws Exception {
        if (jwt != null && jwt.startsWith("Bearer ")) {
            userService.findUserByJwtToken(jwt);
        }
        Restaurant restaurant = restaurantService.findRestaurantById(id);
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @PutMapping("/{id}/add-favorites")
    public ResponseEntity<RestaurantDto> addToFavorites(
            @RequestHeader(value = "Authorization", required = false) String jwt,
            @PathVariable Long id
    ) throws Exception {
        User user = null;
        if (jwt != null && jwt.startsWith("Bearer ")) {
            user = userService.findUserByJwtToken(jwt);
        }
        RestaurantDto restaurant = restaurantService.addToFavorites(id, user);
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }
}