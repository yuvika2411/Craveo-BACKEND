package com.Craveo.Repository;
import com.Craveo.model.FoodCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoryRepository extends JpaRepository<FoodCategory, Long> {

    public List<FoodCategory> findByRestaurantId(Long id);

}
