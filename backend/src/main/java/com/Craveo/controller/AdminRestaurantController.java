package com.Craveo.controller;

import com.Craveo.model.Restaurant;
import com.Craveo.model.User;
import com.Craveo.request.CreateRestaurantRequest;
import com.Craveo.response.MessageResponse;
import com.Craveo.service.RestaurantService;
import com.Craveo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tools.jackson.databind.ObjectMapper;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/admin/restaurants")
public class AdminRestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private UserService userService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Restaurant> createRestaurant(
            @RequestPart("restaurant") String restaurantJson,
            @RequestPart(value = "image", required = false)
            List<MultipartFile> images,
            @RequestHeader("Authorization") String jwt

    ) throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        CreateRestaurantRequest req =
                mapper.readValue(
                        restaurantJson,
                        CreateRestaurantRequest.class
                );

        if (images != null && !images.isEmpty()) {

            List<String> imagePaths =
                    new ArrayList<>();

            Files.createDirectories(
                    Paths.get("uploads")
            );

            for (MultipartFile img : images) {

                String fileName =
                        System.currentTimeMillis()
                                + "_"
                                + img.getOriginalFilename();

                Path path =
                        Paths.get(
                                "uploads",
                                fileName
                        );

                Files.copy(
                        img.getInputStream(),
                        path
                );

                imagePaths.add(
                        "/uploads/" + fileName
                );
            }

            req.setImages(
                    imagePaths
            );
        }
        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.createRestaurant(req, user);

        return new ResponseEntity<>(
                restaurant, HttpStatus.CREATED
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(
            @RequestBody CreateRestaurantRequest req,
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id
    ) throws Exception {
        userService.findUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.updateRestaurant(id, req);
        return new ResponseEntity<>(restaurant, HttpStatus.OK);  // ✅ was CREATED, PUT should return OK
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteRestaurant(
            @RequestHeader("Authorization") String jwt,  // ✅ removed wrong @RequestBody
            @PathVariable Long id
    ) throws Exception {
        userService.findUserByJwtToken(jwt);
        restaurantService.deleteRestaurant(id);
        MessageResponse res = new MessageResponse();
        res.setMessage("Restaurant deleted successfully.");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Restaurant> updateRestaurantStatus(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id
    ) throws Exception {
        userService.findUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.updateRestaurantStatus(id);
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<Restaurant> findRestaurantByUserId(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.getRestaurantByUserId(user.getId());
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }
}