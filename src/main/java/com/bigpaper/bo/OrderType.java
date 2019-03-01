
package com.bigpaper.bo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * @author Rob Richards
 */

@Entity
public class OrderType {

	private @Id @Column(length=10,unique=true,nullable=false) String id;
	private @Column(unique=false,nullable=true) String description;
	

	public OrderType() {}

	public OrderType(String id) {
		this.id = id;
	}
	public OrderType(String id, String description) {
		this.id = id;
		this.description = description;
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