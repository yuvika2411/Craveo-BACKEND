package com.Craveo.service;

import com.Craveo.Repository.IngredientCategoryRepository;
import com.Craveo.Repository.IngredientItemRepository;
import com.Craveo.model.IngredientCategory;
import com.Craveo.model.IngredientsItem;
import com.Craveo.model.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IngredientServiceImp implements IngredientService {

    @Autowired
    private IngredientItemRepository ingredientItemRepository;

    @Autowired
    private IngredientCategoryRepository ingredientCategoryRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Override
    public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception {
        Restaurant restaurant= restaurantService.getRestaurantByUserId(restaurantId);
        IngredientCategory ingredientCategory= new IngredientCategory();
        ingredientCategory.setRestaurant(restaurant);
        ingredientCategory.setName(name);

        return ingredientCategoryRepository.save(ingredientCategory);
    }

    @Override
    public IngredientCategory findIngredientCategoryById(Long id) throws Exception {
        Optional<IngredientCategory> opt= ingredientCategoryRepository.findById(id);

        if(opt.isEmpty()){
            throw new Exception("Ingredient Category not found");
        }
        return opt.get();
    }

    @Override
    public List<IngredientCategory> findIngredientCategoryByRestaurantId(Long restaurantId) throws Exception {
        restaurantService.findRestaurantById(restaurantId);
        return ingredientCategoryRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public IngredientsItem createIngredientIem(Long restaurantId, String ingredientName, Long catgeoryId) throws Exception {
        Restaurant restaurant= restaurantService.findRestaurantById(restaurantId);
        IngredientCategory ingredientCategory= findIngredientCategoryById(catgeoryId);

        IngredientsItem item= new IngredientsItem();
        item.setName(ingredientName);
        item.setRestaurant(restaurant);
        item.setCategory(ingredientCategory);

        IngredientsItem ingredient= ingredientItemRepository.save(item);
        ingredientCategory.getIngredients().add(ingredient);

        return ingredient;
    }

    @Override
    public List<IngredientsItem> findRestaurantsByIngredients(Long restaurantId) {
        return ingredientItemRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public IngredientsItem updateStock(Long id) throws Exception {
        Optional<IngredientsItem> optionalIngredientsItem= ingredientItemRepository.findById(id);

        if(optionalIngredientsItem.isEmpty()){
            throw new Exception("Ingredient not found");
        }
        IngredientsItem ingredientsItem= optionalIngredientsItem.get();
        ingredientsItem.setInStock(ingredientsItem.getInStock() == null || !ingredientsItem.getInStock());

        return ingredientItemRepository.save(ingredientsItem);
    }

}
