package com.Craveo.service;

import com.Craveo.Repository.AddressRepository;
import com.Craveo.Repository.RestaurantRepository;
import com.Craveo.Repository.UserRepository;
import com.Craveo.dto.RestaurantDto;
import com.Craveo.model.Address;
import com.Craveo.model.Restaurant;
import com.Craveo.model.User;
import com.Craveo.request.CreateRestaurantRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RestaurantServiceImp implements RestaurantService{

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Restaurant createRestaurant(
            CreateRestaurantRequest req,
            User user
    ) throws Exception {

        Restaurant existing =
                restaurantRepository
                        .findByNameIgnoreCase(
                                req.getName()
                        );

        if (existing != null) {
            throw new Exception(
                    "Restaurant with this name already exists"
            );
        }

        Address address =
                addressRepository.save(
                        req.getAddress()
                );

        Restaurant restaurant =
                new Restaurant();

        restaurant.setAddress(address);
        restaurant.setContactInformation(
                req.getContactInformation()
        );
        restaurant.setCuisineType(
                req.getCuisineType()
        );
        restaurant.setDescription(
                req.getDescription()
        );
        restaurant.setImages(
                req.getImages()
        );
        restaurant.setName(
                req.getName()
        );
        restaurant.setOpeningHrs(
                req.getOpeningHrs()
        );
        restaurant.setRegistrationDate(
                LocalDateTime.now()
        );
        restaurant.setOwner(user);

        return restaurantRepository.save(
                restaurant
        );
    }

    @Override
    public Restaurant updateRestaurant(Long restaurandId, CreateRestaurantRequest updateRestaurant) throws Exception {
        Restaurant restaurant= findRestaurantById(restaurandId);

        if(updateRestaurant.getCuisineType()!=null){
            restaurant.setCuisineType(updateRestaurant.getCuisineType());
        }
        if(updateRestaurant.getDescription()!=null){
            restaurant.setDescription(updateRestaurant.getDescription());
        }
        if(updateRestaurant.getName()!=null){
            restaurant.setName(updateRestaurant.getName());
        }
        if(updateRestaurant.getOpeningHrs()!=null){
            restaurant.setOpeningHrs(updateRestaurant.getOpeningHrs());
        }
        if(updateRestaurant.getImages()!=null){
            restaurant.setImages(updateRestaurant.getImages());
        }
        if(updateRestaurant.getContactInformation()!=null){
            restaurant.setContactInformation(updateRestaurant.getContactInformation());
        }
        if(updateRestaurant.getAddress()!=null){
            Address newAddress = updateRestaurant.getAddress();
            Address existingAddress = restaurant.getAddress();
            if (existingAddress != null) {
                if (newAddress.getStreet() != null) existingAddress.setStreet(newAddress.getStreet());
                if (newAddress.getCity() != null) existingAddress.setCity(newAddress.getCity());
                if (newAddress.getState() != null) existingAddress.setState(newAddress.getState());
                if (newAddress.getPincode() != null) existingAddress.setPincode(newAddress.getPincode());
                if (newAddress.getCountry() != null) existingAddress.setCountry(newAddress.getCountry());
                addressRepository.save(existingAddress);
            } else {
                Address savedAddress = addressRepository.save(newAddress);
                restaurant.setAddress(savedAddress);
            }
        }
        return restaurantRepository.save(restaurant);
    }

    @Override
    public void deleteRestaurant(Long restaurantId) throws Exception {
        Restaurant restaurant= findRestaurantById(restaurantId);

        restaurantRepository.delete(restaurant);
    }

    @Override
    public List<Restaurant> getAllRestaurant() {
        return restaurantRepository.findAll();
    }

    @Override
    public List<Restaurant> searchRestaurant(String keyword) {
        return restaurantRepository.findBySearchQuery(keyword);
    }

    @Override
    public Restaurant findRestaurantById(Long id) throws Exception {
        Optional<Restaurant> opt=restaurantRepository.findById(id);

        if(opt.isEmpty()){
            throw new Exception("restaurant not found with id "+id);
        }
        return opt.get();
    }

    @Override
    public Restaurant getRestaurantByUserId(Long userId) throws Exception {
        Restaurant restaurant=restaurantRepository.findByOwnerId(userId);
        if(restaurant==null){
            throw new Exception("restaurant not found with this owner id "+ userId);
        }
        return restaurant;
    }

    @Override
    public RestaurantDto addToFavorites(Long restaurantId, User user) throws Exception {
        Restaurant restaurant=findRestaurantById(restaurantId);

        RestaurantDto dto= new RestaurantDto();
        dto.setDescription(restaurant.getDescription());
        dto.setImages(restaurant.getImages());
        dto.setTitle(restaurant.getName());
        dto.setId(restaurantId);

        boolean isFavorited=false;
        List<RestaurantDto> favorites= user.getFavorites();
        for(RestaurantDto favorite: favorites){
            if(favorite.getId().equals(restaurantId)){
                isFavorited=true;
                break;
            }
        }

        if(isFavorited){
            favorites.removeIf(favorite -> favorite.getId().equals(restaurantId));
        }
        else{
            favorites.add(dto);
        }

        userRepository.save(user);
        return dto;
    }

    @Override
    public Restaurant updateRestaurantStatus(Long id) throws Exception {

        Restaurant restaurant= findRestaurantById(id);

        restaurant.setOpen(!restaurant.isOpen());
        return restaurantRepository.save(restaurant);

    }
}
