package com.bigpaper.controllers;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
	@RequestMapping(value="/trades", produces="application/json")
	public UserTrade index(@RequestBody UserTrade trade) {
		trade.setUserName("robr");
		trade.setPostDate(LocalDateTime.now());
		trade = tradeService.processTrade(trade);
		//UserTrade savedTrade = tradeRepo.save(trade);
		return trade;
	}

}
// end::code[]