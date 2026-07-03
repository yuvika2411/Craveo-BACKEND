package com.Craveo.controller;

import com.Craveo.model.User;
import com.Craveo.model.Address;
import com.Craveo.Repository.UserRepository;
import com.Craveo.Repository.AddressRepository;
import com.Craveo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    @GetMapping("/profile")
    public ResponseEntity<User> findUserByJwtToken(@RequestHeader("Authorization") String jwt) throws Exception {
        User user= userService.findUserByJwtToken(jwt);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/addresses")
    public ResponseEntity<User> addAddressToUser(@RequestBody Address address,
                                                 @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Address savedAddress = addressRepository.save(address);
        user.getAddresses().add(savedAddress);
        User updatedUser = userRepository.save(user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @PutMapping("/profile")
    public ResponseEntity<User> updateUserProfile(@RequestBody User profileData,
                                                  @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        if (profileData.getFullName() != null) {
            user.setFullName(profileData.getFullName());
        }
        if (profileData.getEmail() != null) {
            user.setEmail(profileData.getEmail());
        }
        User updatedUser = userRepository.save(user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }
}
