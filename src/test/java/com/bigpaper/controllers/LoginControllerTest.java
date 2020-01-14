package com.bigpaper.controllers;

import static org.assertj.core.api.Assertions.assertThat;

import com.bigpaper.bo.User;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class LoginControllerTest {

	@LocalServerPort
	private int port;
	@Autowired
	TestRestTemplate rt;


	@Test
	public void givenValidRegistration_WhenRegister_ThenJWTReturned() {
		User user = new User("SomeUnknownUser", "ff", "ff@f.com");
		HttpEntity<User> request = new HttpEntity<>(user, getHttpHeaders());
		ResponseEntity<User> response = rt.postForEntity("http://localhost:"+port+"/register", request, User.class);
		
		assertThat(response).isNotNull();

	}
	@Test
	public void givenValidCredentials_WhenLogin_ThenJWTReturned() {
		User user = new User("f", "f", "f@f.com");
		HttpEntity<User> request = new HttpEntity<>(user, getHttpHeaders());
		ResponseEntity<User> response = rt.postForEntity("http://localhost:"+port+"/login", request, User.class);
		
		assertThat(response).isNotNull();

	}

	private HttpHeaders getHttpHeaders() {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		return headers;
	}

}
// end::code[]