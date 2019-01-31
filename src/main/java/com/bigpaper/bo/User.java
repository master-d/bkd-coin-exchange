
package com.bigpaper.bo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * @author Rob Richards
 */

@Entity
public class User {

	private @Id @Column(length=25,unique=true,nullable=false) String userName;
	private @Column(length=100,unique=true,nullable=false) String password;
	
	private @Column(length=25,unique=false,nullable=true) String firstName;
	private @Column(length=25,unique=false,nullable=true) String lastName;
	private @Column(length=50,unique=true,nullable=false) String email;

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
}
// end::code[]