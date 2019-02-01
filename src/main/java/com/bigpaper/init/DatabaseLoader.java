/*
 * Copyright 2015 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.bigpaper.init;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.bigpaper.bo.Asset;
import com.bigpaper.bo.AssetType;
import com.bigpaper.bo.TradeType;
import com.bigpaper.bo.UserTrade;
import com.bigpaper.repos.AssetRepository;
import com.bigpaper.repos.AssetTypeRepository;
import com.bigpaper.repos.TradeTypeRepository;
import com.bigpaper.repos.UserTradeRepository;

/**
 * @author Rob Richards
 */
// tag::code[]
@Component
public class DatabaseLoader implements CommandLineRunner {

	@Autowired
	private AssetRepository assetRepo;
	@Autowired
	private AssetTypeRepository assetTypeRepo;
	@Autowired
	private TradeTypeRepository tradeTypeRepo;
	@Autowired
	private UserTradeRepository userTradeRepo;
	


	@Override
	public void run(String... strings) throws Exception {
		// check asset types
		List<AssetType> assetTypes = toList(assetTypeRepo.findAll());
		if (assetTypes.size() == 0) {
			assetTypeRepo.save(new AssetType("COIN"));
		}
		// check assets
		List<Asset> assets = toList(assetRepo.findAll());
		if (assets.size() == 0) {
			assetRepo.save(new Asset("COIN", "BKD Gold Coin"));
			assetRepo.save(new Asset("COIN", "BKD Silver Coin"));
		}
		// check trade types
		List<TradeType> tradeTypes = toList(tradeTypeRepo.findAll());
		if (tradeTypes.size() == 0) {
			tradeTypeRepo.save(new TradeType("BID"));
			tradeTypeRepo.save(new TradeType("ASK"));
		}
		
		// check trades
		List<UserTrade> trades = toList(userTradeRepo.findAll());
		if (trades.size() == 0) {
			// save some random trades
			for (int x=0; x<20; x++) {
				UserTrade trade = new UserTrade("robr","ASK",1L,1L, 100*Math.random());
				trade.setFillDate(LocalDateTime.now().minusMonths(x));
				userTradeRepo.save(trade);
				
			}
		}
		
	}
	
	private static final <T> List<T> toList(Iterable<T> iter) {
		List<T> list = new LinkedList<>();
		for (T item: iter) {
			list.add(item);
		}
		return list;
	}
	
}

// end::code[]