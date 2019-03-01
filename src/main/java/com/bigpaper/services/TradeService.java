package com.bigpaper.services;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.bigpaper.bo.UserTrade;
import com.bigpaper.repos.UserTradeRepository;

public class TradeService {

	@Autowired
	UserTradeRepository tradeRepo;
	@Autowired
	MessageService msgService;

	public TradeService() { }
	
	public UserTrade processTrade(UserTrade trade) {
		// bid
		if ("BID".equals(trade.getTradeTypeId())) {
			if ("MARKET".equals(trade.getOrderTypeId())) {
				// get the current ask
				UserTrade currentAsk = tradeRepo.findFirstByFillDateIsNullAndTradeTypeIdEqualsOrderByPrice("ASK");
				if (currentAsk != null) {
					trade.setPrice(currentAsk.getPrice());
					List<UserTrade> matches = findMatchingAsks(trade.getQuantity(), currentAsk.getPrice());
					if (matches.size() > 0) {
						for (UserTrade match: matches) {
							match.setFillDate(LocalDateTime.now());
						}
						tradeRepo.saveAll(matches);
						trade.setFillDate(LocalDateTime.now());
						tradeRepo.save(trade);
					}
				}
			}
		} 
		// ask
		else {
		}
		return trade;
	}
	
	public List<UserTrade> findMatchingAsks(Long quantity, BigDecimal price) {
		Long matchqty = 0L;
		List<UserTrade> matches = new LinkedList<>();
		// get all trades at this price level
		List<UserTrade> asks = tradeRepo.findByFillDateIsNullAndTradeTypeIdEqualsAndPriceEqualsOrderByPostDate("ASK", price);
		for (UserTrade ask: asks) {
			if ((quantity - matchqty) <= ask.getQuantity())
				matchqty += ask.getQuantity();
				matches.add(ask);
		}
		if (!quantity.equals(matchqty))
			matches.clear();
		return matches;
	}
}
