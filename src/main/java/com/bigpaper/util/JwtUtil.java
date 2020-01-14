package com.bigpaper.util;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;

import com.bigpaper.bo.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
@PropertySource(value = "jwt.properties")
public class JwtUtil {

    @Value("${jwt.secret}")
    private String JWTSecret;
    @Value("${jwt.issuer")
    private String issuer;
    // 8 hour JWT expiration
    private static final long expireMs = 1000 * 60 * 60 * 8;
    private static final SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

    public User getUserFromToken(String token) {
        Claims claims = decryptToken(token);
        for (Entry<String, Object> e : claims.entrySet()) {
            System.out.println(e.getKey() + ":" + e.getValue());
        }
        String json = claims.get("user",String.class);
        ObjectMapper mapper = new ObjectMapper();
        User user = mapper.convertValue(json, User.class);
        return user;
    }

    public Claims decryptToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(JWTSecret))
                .parseClaimsJws(token).getBody();
        return claims;
    }

    public String createToken(User user) throws JsonProcessingException {
        Map<String, Object> claims = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        claims.put("user", mapper.writeValueAsString(user));
        return createToken(user.getUserName(), claims);
    }
    public String createToken(UserDetails user) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(user.getUsername(), claims);
    }
    public String createToken(String subject, Map<String, Object> claims) {

		long nowMillis = System.currentTimeMillis();
		Date now = new Date(nowMillis);

		//  sign JWT with our ApiKey secret
		byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(JWTSecret);
		Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        return Jwts.builder().setId(subject).setSubject(subject).addClaims(claims)
        .setIssuedAt(now).setIssuer(issuer)
        .setExpiration(new Date(now.getTime() + expireMs))
        .signWith(SignatureAlgorithm.HS256, signingKey).compact();
        
    }

}