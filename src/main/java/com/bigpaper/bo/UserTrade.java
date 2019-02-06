package com.bigpaper.bo;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * @author Rob Richards
 */

@Entity
public class UserTrade {

	private @Id @GeneratedValue @Column(unique=true,nullable=false) Long id;
	private @Column(length=100,unique=false,nullable=false) String userName;
	private @Column(length=10,unique=false,nullable=false) String tradeTypeId;
	private @Column(unique=false,nullable=false) Long assetId;
	private @Column(unique=false,nullable=false) Long quantity;
	private @Column(precision=16,scale=2,unique=false,nullable=false) BigDecimal value;
	private @Column(unique=false,nullable=false) LocalDateTime postDate;
	private @Column(unique=false,nullable=true)  LocalDateTime fillDate;

	public UserTrade() {}

	public UserTrade(String userName, String tradeTypeId, Long assetId, Long quantity, BigDecimal value) {
		this.userName = userName;
		this.tradeTypeId = tradeTypeId;
		this.assetId = assetId;
		this.quantity = quantity;
		this.value = value;
		this.postDate = LocalDateTime.now();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getTradeTypeId() {
		return tradeTypeId;
	}

	public void setTradeTypeId(String tradeTypeId) {
		this.tradeTypeId = tradeTypeId;
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

	public BigDecimal getValue() {
		return value;
	}

	public void setValue(BigDecimal value) {
		this.value = value;
	}

	public LocalDateTime getPostDate() {
		return postDate;
	}

	public void setPostDate(LocalDateTime postDate) {
		this.postDate = postDate;
	}

	public LocalDateTime getFillDate() {
		return fillDate;
	}

	public void setFillDate(LocalDateTime fillDate) {
		this.fillDate = fillDate;
	}
}
// end::code[]