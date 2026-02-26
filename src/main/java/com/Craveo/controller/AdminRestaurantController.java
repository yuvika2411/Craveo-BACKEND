package com.Craveo.controller;

import com.Craveo.model.Restaurant;
import com.Craveo.model.User;
import com.Craveo.request.CreateRestaurantRequest;
import com.Craveo.response.MessageResponse;
import com.Craveo.service.RestaurantService;
import com.Craveo.service.UserService;
import org.aspectj.bridge.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/restaurants")
public class AdminRestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private UserService userService;

    @PostMapping()
    public ResponseEntity<Restaurant> createRestaurant(
            @RequestBody CreateRestaurantRequest req,
            @RequestHeader("Authorization") String jwt
            ) throws Exception {
        User user= userService.findUserByJwtToken(jwt);

        Restaurant restaurant= restaurantService.createRestaurant(req,user);
        return new ResponseEntity<>(restaurant, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(
            @RequestBody CreateRestaurantRequest req,
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id
    ) throws Exception {
        User user= userService.findUserByJwtToken(jwt);

        Restaurant restaurant= restaurantService.updateRestaurant(id,req);
        return new ResponseEntity<>(restaurant, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteRestaurant(
            @RequestBody CreateRestaurantRequest req,
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id
    ) throws Exception {
        User user= userService.findUserByJwtToken(jwt);
        restaurantService.deleteRestaurant(id);
        MessageResponse res= new MessageResponse();
        res.setMessage("Restaurant deleted successfully");
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Restaurant> updateRestaurantStatus(
            @RequestBody CreateRestaurantRequest req,
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id
    ) throws Exception {
        User user= userService.findUserByJwtToken(jwt);
        Restaurant restaurant= restaurantService.updateRestaurantStatus(id);
        MessageResponse res= new MessageResponse();
        res.setMessage("Restaurant deleted successfully");
        return new ResponseEntity<>(restaurant, HttpStatus.CREATED);
    }


}
