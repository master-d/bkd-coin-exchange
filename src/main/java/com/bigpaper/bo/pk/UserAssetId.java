package com.bigpaper.bo.pk;

import java.io.Serializable;

public class UserAssetId implements Serializable {

	private static final long serialVersionUID = 2428538419642949411L;
	
	protected String userName;
	protected Long assetId;
	
	public UserAssetId(String userName, Long assetId) {
		this.userName = userName;
		this.assetId = assetId;
	}
	
}
