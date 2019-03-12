package com.bigpaper.controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bigpaper.beans.ServerMessage;
import com.bigpaper.bo.UserTrade;
import com.bigpaper.exceptions.BkdCoinException;
import com.bigpaper.repos.UserTradeRepository;
import com.bigpaper.services.AssetService;
import com.bigpaper.services.TradeService;

/**
 * @author Rob Richards
 */
// tag::code[]

@Controller
public class TradeController {

	@Autowired
	UserTradeRepository tradeRepo;
	@Autowired
	TradeService tradeService;
	@Autowired
	AssetService assetService;

	@ResponseBody
	@GetMapping(value="/trades/market/{tradeTypeId}/{assetId}")
	public UserTrade getMarketValue(@PathVariable String tradeTypeId, @PathVariable Long assetId) {
		List<UserTrade> trades = null;
		if ("BID".equals(tradeTypeId))
			trades = tradeRepo.findOpenBids(assetId, PageRequest.of(0, 1));
		else if ("ASK".equals(tradeTypeId))
			trades = tradeRepo.findOpenAsks(assetId, PageRequest.of(0,1));

		if (trades.size() > 0)
			return trades.get(0);
		else
			throw new BkdCoinException("No market value found for " + assetService.getAssetNameById(assetId) + "|" + tradeTypeId);
	}
	
	@ResponseBody
	@PostMapping(value="/trades", produces="application/json")
	public UserTrade processTrade(@RequestBody UserTrade trade) {
		trade.setUserName("robr");
		trade.setPostDate(LocalDateTime.now());
		trade = tradeService.processTrade(trade);
		//UserTrade savedTrade = tradeRepo.save(trade);
		return trade;
	}

	
	@DeleteMapping(value="/trades/{tradeId}", produces="application/json")
	public ServerMessage deleteTrade(@PathVariable Long tradeId) {
		tradeService.deleteTradeById(tradeId);
		return new ServerMessage(tradeId, "Deleted trade (#" + tradeId + ")");
	}
	
}
// end::code[]