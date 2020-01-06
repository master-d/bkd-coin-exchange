package com.bigpaper.util;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.bigpaper.bo.User;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtUtil {

    // 8 hour JWT expiration
    private static final long expireMs = 1000*60*60*8;
    // JWT encrpt Key
    private static final String JWTKey = "lotsofpaper";

    

    public User getUserFromToken(String token) {
        String json = decryptToken(token);
        ObjectMapper mapper = new ObjectMapper();
        User user = mapper.convertValue(json, User.class);
        return user;
    }
    public String decryptToken(String token) {
        return Jwts.parser().setSigningKey(JWTKey).parsePlaintextJwt(token).getBody();
    }

    public String createToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("user", user);
        return createToken(user.getUserName(), claims);
    }
    public String createToken(UserDetails user) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(user.getUsername(), claims);
    }
    public String createToken(String subject, Map<String, Object> claims) {
        return Jwts.builder().setSubject(subject).setClaims(claims).setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + expireMs))
        .signWith(SignatureAlgorithm.HS256, JWTKey).compact();
        
    }

}