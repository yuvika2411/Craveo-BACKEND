package com.Craveo.service;

import com.Craveo.model.Events;
import com.Craveo.model.User;
import java.util.List;

public interface EventsService {
    Events createEvent(Events event, Long restaurantId, User customer) throws Exception;
    Events updateEvent(Long eventId, Events updatedEvent) throws Exception;
    Events updateEventStatus(Long eventId, String status) throws Exception;
    void deleteEvent(Long eventId) throws Exception;
    List<Events> getRestaurantEvents(Long restaurantId);
    List<Events> getCustomerEvents(Long userId);
    List<Events> getAllEvents();
    Events findEventById(Long eventId) throws Exception;
}
