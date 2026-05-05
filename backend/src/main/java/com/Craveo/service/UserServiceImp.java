package com.Craveo.service;

import com.Craveo.Repository.UserRepository;
import com.Craveo.config.JwtProvider;
import com.Craveo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImp implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User findUserByJwtToken(String jwt) throws Exception {
        if (jwt == null || jwt.isBlank()) throw new Exception("JWT token is missing");
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        if (email == null) throw new Exception("Invalid or expired token");
        User user = userRepository.findByEmail(email);
        if (user == null) throw new Exception("User not found for this token");
        return user;
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user= userRepository.findByEmail(email);

        if(user==null){
            throw new Exception("User not found");
        }
        return user;
    }
}
