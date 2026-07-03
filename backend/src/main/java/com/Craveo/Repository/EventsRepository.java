package com.Craveo.Repository;

import com.Craveo.model.Events;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EventsRepository extends JpaRepository<Events, Long> {
    List<Events> findByRestaurantId(Long restaurantId);
}
