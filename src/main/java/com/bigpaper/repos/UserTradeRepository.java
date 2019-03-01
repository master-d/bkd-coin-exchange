package com.bigpaper.repos;

import java.math.BigDecimal;
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
	public List<UserTrade> findByAssetIdAndFillDateIsNotNull(Long assetId);
	
	public List<UserTrade> findByUserName(String userName);
	public List<UserTrade> findByUserNameAndFillDateIsNull(String userName);
	public List<UserTrade> findByUserNameAndFillDateIsNotNull(String userName);

	public UserTrade findFirstByFillDateIsNullAndTradeTypeIdEqualsOrderByPrice(String tradeTypeId);
	public List<UserTrade> findByFillDateIsNullAndTradeTypeIdEqualsAndPriceEqualsOrderByPostDate(String tradeTypeId, BigDecimal price);
	
}
// end::code[]
