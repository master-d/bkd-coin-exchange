package com.bigpaper.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

import com.bigpaper.bo.*;

@Configuration
public class SpringRestConfig implements RepositoryRestConfigurer {

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration conf) {
		conf.exposeIdsFor(new Class[] {
				User.class,
				Asset.class,
				AssetType.class,
				Message.class,
				TradeType.class,
				UserAsset.class,
				UserTrade.class
			});
	}
	
}