package com.bigpaper.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bigpaper.bo.Message;
import com.bigpaper.bo.UserTrade;
import com.bigpaper.repos.UserTradeRepository;

@Service
public class MessageService {

	@Autowired
	UserTradeRepository tradeRepo;
	
	public MessageService() { }

	public Message sendFillMsgForTrade(UserTrade trade) {
		Message msg = null;

		return msg;
	}
}
