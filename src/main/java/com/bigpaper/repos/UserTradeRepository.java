package com.bigpaper.repos;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.bigpaper.bo.UserTrade;

/**
 * @author Rob Richards
 */
// tag::code[]
public interface UserTradeRepository extends CrudRepository<UserTrade, Long> {

	public List<UserTrade> findByFillDateGreaterThan(LocalDateTime date);
}
// end::code[]
