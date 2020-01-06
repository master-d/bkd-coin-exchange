package com.bigpaper.controllers;

import javax.annotation.security.PermitAll;

import com.bigpaper.bo.User;
import com.bigpaper.services.LoginService;
import com.bigpaper.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author Rob Richards
 */
// tag::code[]

@Controller
public class LoginController {

	@Autowired
	LoginService loginService;

	@PermitAll
	@ResponseBody
	@PostMapping(value = "/register")
	public ResponseEntity<?> registerUser(@RequestBody User user) {
		String password = user.getPassword();
		User regUser = loginService.registerUser(user);
		regUser = loginService.loginUser(user.getEmail(), password);
		return ResponseEntity.ok().body(regUser);
	}

	@PermitAll
	@ResponseBody
	@PostMapping(value = "/login")
	public ResponseEntity<?> login(@RequestBody User user) {
//		authMgr.authenticate(new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassword()));
		user = loginService.loginUser(user.getEmail(), user.getPassword());
		return ResponseEntity.ok().body(user);
	}
	

}
// end::code[]