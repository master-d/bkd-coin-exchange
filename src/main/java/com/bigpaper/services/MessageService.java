package com.bigpaper.services;

import org.springframework.beans.factory.annotation.Autowired;

import com.bigpaper.repos.UserTradeRepository;

public class MessageService {

	@Autowired
	UserTradeRepository tradeRepo;
	
	
	public MessageService() { }
}
