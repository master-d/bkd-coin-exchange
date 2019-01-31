
package com.bigpaper.bo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * @author Rob Richards
 */
// tag::code[]
@Entity
public class Asset {

	private @Id @GeneratedValue @Column(unique=true,nullable=false) Long id;
	private @Column(length=10,unique=false,nullable=false) String typeId;
	private @Column(unique=false,nullable=false) String name;
	private @Column(unique=false,nullable=true) String description;
	

	public Asset() { }
	public Asset(String typeId, String name) {
		this.typeId = typeId;
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTypeId() {
		return typeId;
	}

	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
// end::code[]