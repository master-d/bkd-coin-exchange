package com.bigpaper.bo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

import com.bigpaper.bo.pk.UserAssetId;

/**
 * @author Rob Richards
 */

@Entity
@IdClass(value=UserAssetId.class)
public class UserAsset {

	private @Id @Column(length=100,unique=false,nullable=false) String userName;
	private @Id @Column(unique=false,nullable=false) Long assetId;
	private @Column(unique=false,nullable=false) Long quantity;

	public UserAsset() {}

	public UserAsset(String userName, Long assetId, Long quantity) {
		this.userName = userName;
		this.assetId = assetId;
		this.quantity = quantity;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Long getAssetId() {
		return assetId;
	}

	public void setAssetId(Long assetId) {
		this.assetId = assetId;
	}

	public Long getQuantity() {
		return quantity;
	}

	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}
}
// end::code[]