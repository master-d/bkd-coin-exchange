package com.bigpaper.repos;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.bigpaper.bo.UserTrade;

/**
 * @author Rob Richards
 */
// tag::code[]
public interface UserTradeRepository extends CrudRepository<UserTrade, Long> {

	public List<UserTrade> findByFillDateGreaterThan(LocalDateTime date);
	public List<UserTrade> findByAssetIdAndFillByTradeIdIsNotNullAndFillDateIsNotNull(Long assetId);
	
	public List<UserTrade> findByUserName(String userName);
	public List<UserTrade> findByUserNameAndFillDateIsNullOrderByPostDateDesc(String userName);
	public List<UserTrade> findByUserNameAndFillDateIsNotNullOrderByPostDateDesc(String userName);

	// current bid/ask price for asset
	public UserTrade findFirstByFillDateIsNullAndTradeTypeIdEqualsAndAssetIdEqualsOrderByPrice(String tradeTypeId, Long assetId);
	public List<UserTrade> findByFillDateIsNullAndTradeTypeIdEqualsAndAssetIdEqualsAndPriceEqualsOrderByPostDate(String tradeTypeId, Long assetId, BigDecimal price);

	@Query(value="select * from user_trade where fill_date is null " +
	"and trade_type_id=?1 and asset_id=?2" +
	"order by (case when 'BID' = ?1 then -price else price end) limit 1", nativeQuery=true)
	public UserTrade findCurrentBidAskValue(String tradeTypeId, Long assetId);

	@Query("select t from UserTrade t where t.fillDate is null " +
	"and t.tradeTypeId='ASK' and t.assetId=?1 " +
	"order by price")
	public List<UserTrade> findOpenAsks(Long assetId, Pageable pg);

	@Query("select t from UserTrade t where t.fillDate is null " +
	"and t.tradeTypeId='BID' and t.assetId=?1 " +
	"order by price desc")
	public List<UserTrade> findOpenBids(Long assetId, Pageable pg);
	
	@Query("select t from UserTrade t where t.fillDate is null " +
	"and t.tradeTypeId='ASK' and t.assetId=?1 and (t.price<=?2 or ?2 is null) " +
	"order by price")
	public List<UserTrade> findAllOpenAsksLessThanEqualPrice(Long assetId, BigDecimal price);

	@Query("select t from UserTrade t where t.fillDate is null " +
	"and t.tradeTypeId='BID' and t.assetId=?1 and (t.price>=?2 or ?2 is null) " +
	"order by price desc")
	public List<UserTrade> findAllOpenBidsGreaterThanEqualPrice(Long assetId, BigDecimal price);
}
// end::code[]
