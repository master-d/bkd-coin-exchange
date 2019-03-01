package com.bigpaper.controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.bigpaper.bo.UserTrade;
import com.bigpaper.repos.UserTradeRepository;

/**
 * @author Rob Richards
 */
// tag::code[]

@Controller
public class TradeController {

	@Autowired
	UserTradeRepository tradeRepo;
	
	@PostMapping(value = "/trades", produces="application/json")
	public UserTrade index(@RequestBody UserTrade trade) {
		trade.setUserName("robr");
		trade.setPostDate(LocalDateTime.now());
		UserTrade savedTrade = tradeRepo.save(trade);
		return savedTrade;
	}

}
// end::code[]