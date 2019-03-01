package com.bigpaper.repos;

import org.springframework.data.repository.CrudRepository;

import com.bigpaper.bo.OrderType;

/**
 * @author Rob Richards
 */
// tag::code[]
public interface OrderTypeRepository extends CrudRepository<OrderType, String> {

}
// end::code[]
