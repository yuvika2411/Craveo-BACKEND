package com.Craveo.service;
import com.Craveo.model.IngredientCategory;
import com.Craveo.model.IngredientsItem;

import java.util.List;

public interface IngredientService {

    public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception;
    public IngredientCategory findIngredientCategoryById(Long id) throws Exception;
    public List<IngredientCategory> findIngredientCategoryByRestaurantId(Long restaurantId) throws Exception;
    public IngredientsItem createIngredientIem(Long restaurantId, String ingredientName, Long catgeoryId) throws Exception;
    public List<IngredientsItem> findRestaurantsByIngredients(Long restaurantId);
    public IngredientsItem updateStock(Long id) throws Exception;

}
