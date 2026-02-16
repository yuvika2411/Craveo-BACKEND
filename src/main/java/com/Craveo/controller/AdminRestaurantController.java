package com.Craveo.controller;

import com.Craveo.model.Restaurant;
import com.Craveo.model.User;
import com.Craveo.request.CreateRestaurantRequest;
import com.Craveo.service.RestaurantService;
import com.Craveo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/restaurants")
public class AdminRestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private UserService userService;

    public ResponseEntity<Restaurant> createRestaurant(
            @RequestBody CreateRestaurantRequest req,
            @RequestHeader("Authorization") String jwt
            ) throws Exception {
        User user= userService.findUserByJwtToken(jwt);

        Restaurant restaurant= restaurantService.createRestaurant(req,user);
        return null;
    }
}
