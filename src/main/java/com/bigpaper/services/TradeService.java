package com.bigpaper.services;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bigpaper.bo.Asset;
import com.bigpaper.bo.UserTrade;
import com.bigpaper.repos.AssetRepository;
import com.bigpaper.repos.UserTradeRepository;

@Service
public class TradeService {

	@Autowired
	UserTradeRepository tradeRepo;
	@Autowired
	AssetRepository assetRepo;
	@Autowired
	MessageService msgService;

	public TradeService() { }
	
	public UserTrade processTrade(UserTrade trade) {
		//BidDecimal tradePrice = trade.getPrice();
		// bid
		List<UserTrade> matches = new LinkedList<>();
		if ("BID".equals(trade.getTradeTypeId())) 
			matches = findOpenAsks(trade.getQuantity(), trade.getAssetId(), trade.getPrice());
		else if (("ASK").equals(trade.getTradeTypeId()))
			matches = findOpenBids(trade.getQuantity(), trade.getAssetId(), trade.getPrice());
		
			if (matches.size() > 0) {
				// max price for filled order
				BigDecimal maxMatchPrice = new BigDecimal(0);
				for (UserTrade match: matches) {
					if (match.getPrice().compareTo(maxMatchPrice) > 0)
						maxMatchPrice = match.getPrice();
				}
				trade.setFillDate(LocalDateTime.now());
				trade.setPrice(maxMatchPrice);
				trade = tradeRepo.save(trade);

				for (UserTrade match: matches) {
					match.setFillDate(LocalDateTime.now());
					match.setFillByTradeId(trade.getId());
				}

				tradeRepo.saveAll(matches);
			} else {
				// this is a market order that can't be filled right now throw exception
				if ("MARKET".equals(trade.getOrderTypeId())) {
					Asset a = assetRepo.findById(trade.getAssetId()).get();
					throw new RuntimeException("Could not fill market order for " + trade.getQuantity() + " " + a.getDescription());
				} else {
					// this is a limit order that can't be filled right now. save it
					tradeRepo.save(trade);
				}
			}
		
		return trade;
	}
	public List<UserTrade> findOpenAsks(Long quantity, Long assetId) {
		// null used for price in market orders
		return findOpenAsks(quantity, assetId, null);
	}
	public List<UserTrade> findOpenAsks(Long quantity, Long assetId, BigDecimal price) {
		System.out.println("open asks:" + quantity + " " + assetId + " " + (price == null ? null : price.toPlainString()));
		Long matchqty = 0L;
		List<UserTrade> matches = new LinkedList<>();
		// get all trades at this price level
		List<UserTrade> asks = tradeRepo.findAllOpenAsksLessThanEqualPrice(assetId, price);
		for (UserTrade ask: asks) {
			System.out.println(matchqty + " + " + ask.getQuantity() + " <= " + quantity + " -> " + ((matchqty + ask.getQuantity()) <= quantity));
			if ((matchqty + ask.getQuantity()) <= quantity)
				matchqty += ask.getQuantity();
				matches.add(ask);
		}
		if (!quantity.equals(matchqty))
			matches.clear();
		System.out.println("returning " + matches.size() + " matches");
		return matches;
	}
	public List<UserTrade> findOpenBids(Long quantity, Long assetId) {
		// null used for price in market orders
		return findOpenBids(quantity, assetId, null);
	}
	public List<UserTrade> findOpenBids(Long quantity, Long assetId, BigDecimal price) {
		System.out.println("open bids:" + quantity + " " + assetId + " " + (price == null ? null : price.toPlainString()));
		Long matchqty = 0L;
		List<UserTrade> matches = new LinkedList<>();
		// get all trades at this price level
		List<UserTrade> bids = tradeRepo.findAllOpenBidsGreaterThanEqualPrice(assetId, price);
		for (UserTrade bid: bids) {
			if ((matchqty + bid.getQuantity()) <= quantity)
				matchqty += bid.getQuantity();
				matches.add(bid);
		}
		if (!quantity.equals(matchqty))
			matches.clear();
		return matches;
	}
	
}
