package com.bigpaper.repos;

import org.springframework.data.repository.CrudRepository;

import com.bigpaper.bo.Message;

/**
 * @author Rob Richards
 */
// tag::code[]
public interface MessageRepository extends CrudRepository<Message, Long> {

}
// end::code[]
