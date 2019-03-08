package com.bigpaper.bo;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

/**
 * @author Rob Richards
 */

@Entity
public class UserTrade {

	private @Id 
	@GeneratedValue(strategy=GenerationType.AUTO, generator="native")
	@GenericGenerator(name="native", strategy="native")
	@Column(unique=true,nullable=false) Long id;
	private @Column(length=100,unique=false,nullable=false) String userName;
	private @Column(length=10,unique=false,nullable=false) String tradeTypeId;
	private @Column(length=10,unique=false,nullable=false) String orderTypeId;
	private @Column(unique=false,nullable=false) Long assetId;
	private @Column(unique=false,nullable=false) Long quantity;
	private @Column(precision=16,scale=2,unique=false,nullable=false) BigDecimal price;
	private @Column(unique=false,nullable=false) LocalDateTime postDate;
	private @Column(unique=false,nullable=true)  Long fillByTradeId;
	private @Column(unique=false,nullable=true)  LocalDateTime fillDate;

	public UserTrade() {}
	public UserTrade(Long id) { this.id = id; }
	public UserTrade(String userName, String tradeTypeId, String orderTypeId, Long assetId, Long quantity, BigDecimal price) {
		this.userName = userName;
		this.tradeTypeId = tradeTypeId;
		this.orderTypeId = orderTypeId;
		this.assetId = assetId;
		this.quantity = quantity;
		this.price = price;
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

	public String getOrderTypeId() {
		return orderTypeId;
	}

	public void setOrderTypeId(String orderTypeId) {
		this.orderTypeId = orderTypeId;
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

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public LocalDateTime getPostDate() {
		return postDate;
	}

	public void setPostDate(LocalDateTime postDate) {
		this.postDate = postDate;
	}

	public Long getFillByTradeId() {
		return fillByTradeId;
	}

	public void setFillByTradeId(Long fillByTradeId) {
		this.fillByTradeId = fillByTradeId;
	}

	public LocalDateTime getFillDate() {
		return fillDate;
	}

	public void setFillDate(LocalDateTime fillDate) {
		this.fillDate = fillDate;
	}
}
// end::code[]