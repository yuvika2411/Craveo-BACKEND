package com.Craveo.service;

import com.Craveo.Repository.FoodRepository;
import com.Craveo.model.Food;
import com.Craveo.model.FoodCategory;
import com.Craveo.model.Restaurant;
import com.Craveo.request.CreateFoodRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FoodServiceImp implements FoodService{

    @Autowired
    private FoodRepository foodRepository;

    @Override
    public Food createFood(CreateFoodRequest req, FoodCategory category, Restaurant restaurant) {
        Food food= new Food();
        food.setFoodCategory(category);
        food.setRestaurant(restaurant);
        food.setDescription(req.getDescription());
        food.setImages(req.getImages());
        food.setName(req.getName());
        food.setPrice(req.getPrice());
        food.setSeasonal(req.isSeasonal());
        food.setVegetarian(req.isVegetarian());
        food.setAvailable(req.isAvailable());

        Food savedFood = foodRepository.save(food);
        restaurant.getFoods().add(savedFood);

        return savedFood;
    }

    @Override
    public void deleteFood(Long foodId) throws Exception {

        Food food= findFoodById(foodId);
        food.setRestaurant(null);
        foodRepository.save(food);

    }

    @Override
    public List<Food> getRestaurantsFood(Long restaurantId, boolean isVegetarian, boolean isNonVegetarian, boolean isSeasonal, String foodCategory) {

        List<Food> foods= foodRepository.findByRestaurantId(restaurantId);

        if(isVegetarian){
            foods= filterByVegetarian(foods, isVegetarian);
        }
        if(isNonVegetarian){
            foods= filterByNonVegetarian(foods, isNonVegetarian);
        }
        if(isSeasonal){
            foods= filterBySeasonal(foods,isSeasonal);
        }
        if(foodCategory!=null && !foodCategory.equals("")) {
            foods = filterByFoodCategory(foods, foodCategory);
        }

        return foods;
    }

    private List<Food> filterByFoodCategory(List<Food> foods, String foodCategory) {
        return foods.stream().filter(food -> {
            if(food.getFoodCategory()!=null){
                return food.getFoodCategory().getName().equals(foodCategory);
            }
            return false;
        }).collect(Collectors.toList());
    }

    private List<Food> filterBySeasonal(List<Food> foods, boolean isSeasonal) {
        return foods.stream().filter(food -> food.isSeasonal()==isSeasonal).collect(Collectors.toList());
    }

    private List<Food> filterByNonVegetarian(List<Food> foods, boolean isNonVegetarian) {
        return foods.stream().filter(food -> food.isVegetarian()==false).collect(Collectors.toList());
    }

    private List<Food> filterByVegetarian(List<Food> foods, boolean isVegetarian) {
        return foods.stream().filter(food -> food.isVegetarian()==isVegetarian).collect(Collectors.toList());
    }


    @Override
    public List<Food> searchFood(String keyword) {
        return foodRepository.searchFood(keyword);
    }

    @Override
    public Food findFoodById(Long foodId) throws Exception {
        Optional<Food> optionalFood= foodRepository.findById(foodId);

        if(optionalFood.isEmpty()){
            throw new Exception("Food do not exist....");
        }
        return optionalFood.get();
    }

    @Override
    public Food updateAvailabilityStatus(Long foodId) throws Exception {
        Food food= findFoodById(foodId);
        food.setAvailable(!food.isAvailable());
        return foodRepository.save(food);
    }

    @Override
    public Food updateFood(Long foodId, CreateFoodRequest req, FoodCategory category) throws Exception {
        Food food = findFoodById(foodId);
        if (req.getName() != null) {
            food.setName(req.getName());
        }
        if (req.getDescription() != null) {
            food.setDescription(req.getDescription());
        }
        if (req.getPrice() != null) {
            food.setPrice(req.getPrice());
        }
        if (category != null) {
            food.setFoodCategory(category);
        }
        if (req.getImages() != null && !req.getImages().isEmpty()) {
            food.setImages(req.getImages());
        }
        food.setVegetarian(req.isVegetarian());
        food.setSeasonal(req.isSeasonal());
        food.setAvailable(req.isAvailable());

        return foodRepository.save(food);
    }
}
