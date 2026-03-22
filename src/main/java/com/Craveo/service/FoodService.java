package com.Craveo.service;

import com.Craveo.model.Food;
import com.Craveo.model.Restaurant;
import com.Craveo.model.FoodCategory;
import com.Craveo.request.CreateFoodRequest;

import java.util.List;


public interface FoodService {

    public Food createFood(CreateFoodRequest req, FoodCategory category, Restaurant restaurant);
    public void deleteFood(Long foodId) throws Exception;
    public List<Food> getRestaurantsFood(Long restaurantId, boolean isVegetarian, boolean isNonVegetarian, boolean isSeasonal, String foodCategory);
    public List<Food> searchFood(String keyword);
    public Food findFoodById(Long foodId) throws Exception;
    public Food updateAvailabilityStatus (Long foodId) throws Exception;

}
