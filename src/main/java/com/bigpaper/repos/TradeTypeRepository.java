package com.bigpaper.repos;

import org.springframework.data.repository.CrudRepository;

import com.bigpaper.bo.TradeType;

/**
 * @author Rob Richards
 */
// tag::code[]
public interface TradeTypeRepository extends CrudRepository<TradeType, String> {

}
// end::code[]
