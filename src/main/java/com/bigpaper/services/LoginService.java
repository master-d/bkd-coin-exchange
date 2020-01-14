package com.bigpaper.services;


import com.bigpaper.bo.User;
import com.bigpaper.repos.UserRepository;
import com.bigpaper.util.JwtUtil;
import com.fasterxml.jackson.core.JsonProcessingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private JwtUtil jwtUtil;

    public LoginService() {
    }

    public User loginUser(String email, String password) throws JsonProcessingException {
        User user = userRepo.findByEmail(email);
        if (user != null) {
            if (!passwordEncoder.matches(password, user.getPassword()))
                throw new RuntimeException("Invalid email or password");
            user.setJwt(jwtUtil.createToken(user));
        } else
            throw new RuntimeException("Invalid email or password");
        return user;
    }
    public User registerUser(User user) {
        String userName = user.getUserName() != null ? user.getUserName() : user.getEmail().replaceAll("^(.+)@.*$", "$1");
        User existingUser = userRepo.findById(userName).orElse(null);

        if (existingUser != null) {
            throw new RuntimeException(userName + " is already registered");
        } else {
            user.setUserName(userName);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepo.save(user);
        }
        return user;
    }

}
