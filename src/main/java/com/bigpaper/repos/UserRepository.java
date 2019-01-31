package com.bigpaper.repos;

import org.springframework.data.repository.CrudRepository;

import com.bigpaper.bo.User;

/**
 * @author Rob Richards
 */
public interface UserRepository extends CrudRepository<User, String> {

}
