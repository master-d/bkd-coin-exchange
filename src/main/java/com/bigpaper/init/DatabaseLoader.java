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

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.bigpaper.bo.Asset;
import com.bigpaper.bo.AssetType;
import com.bigpaper.repos.AssetRepository;
import com.bigpaper.repos.AssetTypeRepository;

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