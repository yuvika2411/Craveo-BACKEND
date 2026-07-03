package com.Craveo.controller;

import com.Craveo.model.Events;
import com.Craveo.model.Restaurant;
import com.Craveo.model.User;
import com.Craveo.response.MessageResponse;
import com.Craveo.service.EventsService;
import com.Craveo.service.RestaurantService;
import com.Craveo.service.UserService;
import com.Craveo.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;

@RestController
public class EventsController {

    @Autowired
    private EventsService eventsService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping(value = "/api/admin/events", consumes = "multipart/form-data")
    public ResponseEntity<Events> createEvent(
            @RequestPart("event") String eventJson,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Events event = mapper.readValue(eventJson, Events.class);

        if (image != null && !image.isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(image);
            event.setImages(List.of(imageUrl));
        }

        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.getRestaurantByUserId(user.getId());
        Events createdEvent = eventsService.createEvent(event, restaurant.getId(), user);
        return new ResponseEntity<>(createdEvent, HttpStatus.CREATED);
    }

    @PostMapping(value = "/api/events/restaurant/{restaurantId}", consumes = "multipart/form-data")
    public ResponseEntity<Events> customerBookEvent(
            @PathVariable Long restaurantId,
            @RequestPart("event") String eventJson,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Events event = mapper.readValue(eventJson, Events.class);

        if (image != null && !image.isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(image);
            event.setImages(List.of(imageUrl));
        }

        User user = userService.findUserByJwtToken(jwt);
        Events createdEvent = eventsService.createEvent(event, restaurantId, user);
        return new ResponseEntity<>(createdEvent, HttpStatus.CREATED);
    }

    @GetMapping("/api/events/customer")
    public ResponseEntity<List<Events>> getCustomerEvents(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        List<Events> events = eventsService.getCustomerEvents(user.getId());
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @PutMapping("/api/admin/events/{id}/status")
    public ResponseEntity<Events> updateEventStatus(
            @PathVariable Long id,
            @RequestParam String status,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        userService.findUserByJwtToken(jwt);
        Events updated = eventsService.updateEventStatus(id, status);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @PutMapping(value = "/api/admin/events/{id}", consumes = "multipart/form-data")
    public ResponseEntity<Events> updateEvent(
            @PathVariable Long id,
            @RequestPart("event") String eventJson,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Events event = mapper.readValue(eventJson, Events.class);

        if (image != null && !image.isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(image);
            event.setImages(List.of(imageUrl));
        }

        userService.findUserByJwtToken(jwt);
        Events updated = eventsService.updateEvent(id, event);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/api/admin/events/{id}")
    public ResponseEntity<MessageResponse> deleteEvent(
            @PathVariable Long id,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        userService.findUserByJwtToken(jwt);
        eventsService.deleteEvent(id);
        MessageResponse res = new MessageResponse();
        res.setMessage("Event deleted successfully.");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/api/admin/events/restaurant/{restaurantId}")
    public ResponseEntity<List<Events>> getRestaurantEvents(
            @PathVariable Long restaurantId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        userService.findUserByJwtToken(jwt);
        List<Events> events = eventsService.getRestaurantEvents(restaurantId);
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @GetMapping("/api/events")
    public ResponseEntity<List<Events>> getAllEvents() {
        List<Events> events = eventsService.getAllEvents();
        return new ResponseEntity<>(events, HttpStatus.OK);
    }
}
