package com.Craveo.controller;

import com.Craveo.model.Food;
import com.Craveo.model.FoodCategory;
import com.Craveo.model.Restaurant;
import com.Craveo.model.User;
import com.Craveo.request.CreateFoodRequest;
import com.Craveo.response.MessageResponse;
import com.Craveo.service.CategoryService;
import com.Craveo.service.FoodService;
import com.Craveo.service.RestaurantService;
import com.Craveo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/admin/food")
public class AdminFoodController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private CategoryService categoryService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Food> createFood(
            @RequestPart("food") String foodJson,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        CreateFoodRequest req = mapper.readValue(foodJson, CreateFoodRequest.class);

        if (image != null && !image.isEmpty()) {
            Files.createDirectories(Paths.get("uploads"));
            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            Path path = Paths.get("uploads", fileName);
            Files.copy(image.getInputStream(), path);
            req.setImages(List.of("/uploads/" + fileName));
        } else {
            req.setImages(new ArrayList<>());
        }

        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.findRestaurantById(req.getRestaurantId());

        FoodCategory category = req.getCategory();
        if (category == null && req.getCategoryId() != null) {
            category = categoryService.findCategoryById(req.getCategoryId());
        }

        Food food = foodService.createFood(req, category, restaurant);
        return new ResponseEntity<>(food, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Food> getFoodById(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Food food = foodService.findFoodById(id);
        return new ResponseEntity<>(food, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteFood(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        foodService.deleteFood(id);
        MessageResponse res = new MessageResponse();
        res.setMessage("Food deleted successfully.");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFoodAvailabilityStatus(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Food food = foodService.updateAvailabilityStatus(id);
        return new ResponseEntity<>(food, HttpStatus.OK);
    }
}