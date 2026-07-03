package com.Craveo.service;

import com.Craveo.model.FoodCategory;

import java.util.List;

public interface CategoryService {
    public FoodCategory createCategory(String name, Long userId) throws Exception;

    public List<FoodCategory> findCategoryByRestaurantId(Long id) throws Exception;
    public List<FoodCategory> findCategoryByRestaurantIdActual(Long id) throws Exception;

    public FoodCategory findCategoryById(Long id) throws Exception;

    public void deleteCategory(Long id) throws Exception;
}
