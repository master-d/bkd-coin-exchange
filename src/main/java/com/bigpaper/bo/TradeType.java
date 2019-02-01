
package com.bigpaper.bo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * @author Rob Richards
 */

@Entity
public class TradeType {

	private @Id @Column(length=10,unique=true,nullable=false) String id;
	private @Column(unique=false,nullable=true) String description;
	

	public TradeType() {}

	public TradeType(String id) {
		this.id = id;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
// end::code[]