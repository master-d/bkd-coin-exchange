
package com.bigpaper.bo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

/**
 * @author Rob Richards
 */
// tag::code[]
@Entity
public class Asset {

	private @Id 
	@GeneratedValue(strategy=GenerationType.AUTO, generator="native")
	@GenericGenerator(name="native", strategy="native")
	@Column(unique=true,nullable=false) Long id;
	private @Column(length=10,unique=false,nullable=false) String typeId;
	private @Column(unique=false,nullable=false) String name;
	private @Column(unique=false,nullable=true) String description;
	private @Column(unique=false,nullable=true) String color;
	private @Column(unique=false,nullable=true) String icon;
	

	public Asset() { }
	public Asset(String typeId, String name) {
		this.typeId = typeId;
		this.name = name;
	}
	public Asset(String typeId, String name, String color) {
		this.typeId = typeId;
		this.name = name;
		this.color = color;
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
	
	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}
}
// end::code[]