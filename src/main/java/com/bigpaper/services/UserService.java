package com.bigpaper.services;

import java.util.LinkedList;

import com.bigpaper.bo.User;
import com.bigpaper.repos.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String arg0) throws UsernameNotFoundException {
        User user = userRepo.findById(arg0).orElse(null);
        UserDetails userDetails = null;
        if (user != null) {
            userDetails = new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), new LinkedList<>());
        }
        return userDetails;
    }

}