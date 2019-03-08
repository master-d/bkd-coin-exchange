package com.bigpaper.controllers;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bigpaper.beans.ServerMessage;
import com.bigpaper.bo.UserTrade;
import com.bigpaper.repos.UserTradeRepository;
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
	public ServerMessage<UserTrade> deleteTrade(@PathVariable Long tradeId) {
		tradeService.deleteTradeById(tradeId);
		return new ServerMessage<>("Deleted trade (#" + tradeId + ")", new UserTrade(tradeId));
	}
	
}
// end::code[]