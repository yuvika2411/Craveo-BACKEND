package com.Craveo.service;

import com.Craveo.Repository.CategoryRepository;
import com.Craveo.model.Food;
import com.Craveo.model.FoodCategory;
import com.Craveo.model.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImp implements CategoryService{

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private CategoryRepository categoryRepository;


    @Override
    public FoodCategory createCategory(String name, Long userId) throws Exception {
        Restaurant restaurant= restaurantService.getRestaurantByUserId(userId);
        FoodCategory foodCategory= new FoodCategory();
        foodCategory.setName(name);
        foodCategory.setRestaurant(restaurant);

        return categoryRepository.save(foodCategory);
    }

    @Override
    public List<FoodCategory> findCategoryByRestaurantId(Long id) throws Exception {
        Restaurant restaurant= restaurantService.getRestaurantByUserId(id);
        return categoryRepository.findByRestaurantId(restaurant.getId());
    }

    @Override
    public List<FoodCategory> findCategoryByRestaurantIdActual(Long id) throws Exception {
        return categoryRepository.findByRestaurantId(id);
    }

    @Override
    public FoodCategory findCategoryById(Long id) throws Exception {
        Optional<FoodCategory> optionalFoodCategory= categoryRepository.findById(id);

        if(optionalFoodCategory.isEmpty()){
            throw new Exception("Category not found");
        }
        return optionalFoodCategory.get();
    }


}
