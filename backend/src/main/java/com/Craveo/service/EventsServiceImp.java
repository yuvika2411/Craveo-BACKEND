package com.Craveo.service;

import com.Craveo.Repository.EventsRepository;
import com.Craveo.model.Events;
import com.Craveo.model.Restaurant;
import com.Craveo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EventsServiceImp implements EventsService {

    @Autowired
    private EventsRepository eventsRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Override
    public Events createEvent(Events event, Long restaurantId, User customer) throws Exception {
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
        event.setRestaurant(restaurant);
        event.setCustomer(customer);
        if (event.getStatus() == null) {
            event.setStatus("Pending");
        }
        return eventsRepository.save(event);
    }

    @Override
    public Events updateEvent(Long eventId, Events updatedEvent) throws Exception {
        Events event = findEventById(eventId);
        if (updatedEvent.getName() != null) {
            event.setName(updatedEvent.getName());
        }
        if (updatedEvent.getLocation() != null) {
            event.setLocation(updatedEvent.getLocation());
        }
        if (updatedEvent.getStartedAt() != null) {
            event.setStartedAt(updatedEvent.getStartedAt());
        }
        if (updatedEvent.getEndsAt() != null) {
            event.setEndsAt(updatedEvent.getEndsAt());
        }
        if (updatedEvent.getGuests() > 0) {
            event.setGuests(updatedEvent.getGuests());
        }
        if (updatedEvent.getImages() != null && !updatedEvent.getImages().isEmpty()) {
            event.setImages(updatedEvent.getImages());
        }
        return eventsRepository.save(event);
    }

    @Override
    public Events updateEventStatus(Long eventId, String status) throws Exception {
        Events event = findEventById(eventId);
        event.setStatus(status);
        return eventsRepository.save(event);
    }

    @Override
    public void deleteEvent(Long eventId) throws Exception {
        Events event = findEventById(eventId);
        eventsRepository.delete(event);
    }

    @Override
    public List<Events> getRestaurantEvents(Long restaurantId) {
        return eventsRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public List<Events> getCustomerEvents(Long userId) {
        // Query database to find events where customer.id matches userId
        // Let's filter in Java for simplicity and compatibility with JpaRepository findByRestaurantId
        List<Events> allEvents = eventsRepository.findAll();
        allEvents.removeIf(e -> e.getCustomer() == null || !e.getCustomer().getId().equals(userId));
        return allEvents;
    }

    @Override
    public List<Events> getAllEvents() {
        return eventsRepository.findAll();
    }

    @Override
    public Events findEventById(Long eventId) throws Exception {
        Optional<Events> optionalEvent = eventsRepository.findById(eventId);
        if (optionalEvent.isEmpty()) {
            throw new Exception("Event not found with id: " + eventId);
        }
        return optionalEvent.get();
    }
}
