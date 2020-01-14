
package com.bigpaper.bo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * @author Rob Richards
 */

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {

	private @Id @Column(length=25,unique=true,nullable=false) String userName;
	private @JsonIgnore @Column(length=100,unique=true,nullable=false) String password;
	private @Column(length=100,unique=true,nullable=true) String salt;
	
	private @Column(length=25,unique=false,nullable=true) String firstName;
	private @Column(length=25,unique=false,nullable=true) String lastName;
	private @Column(length=50,unique=true,nullable=false) String email;
	private @Column(length=50,unique=true,nullable=true) Long phone;

	private String jwt;

	public User() {}

	public User(String userName, String password, String email) {
		this.userName = userName;
		this.password = password;
		this.email = email;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	public Long getPhone() {
		return phone;
	}
	public void setPhone(Long phone) {
		this.phone = phone;
	}

	public String getJwt() {
		return jwt;
	}
	public void setJwt(String jwt) {
		this.password = null;
		this.jwt = jwt;
	}

}
// end::code[]