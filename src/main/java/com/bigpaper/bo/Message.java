package com.bigpaper.bo;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * @author Rob Richards
 */

@Entity
public class Message {

	private @Id @GeneratedValue @Column(unique=true,nullable=false) Long id;
	private @Column(length=100, unique=false,nullable=false) String fromUser;
	private @Column(length=100, unique=false,nullable=false) String toUser;
	private @Column(length=100, unique=false,nullable=false) String subject;
	private @Column(length=4000, unique=false,nullable=true) String messageBody;
	private @Column(unique=false,nullable=false) LocalDateTime sendDate;
	private @Column(unique=false,nullable=true) LocalDateTime readDate;

	public Message() {}

	public Message(String from, String to, String subject) {
		this(from, to, subject, null);
	}
	public Message(String from, String to, String subject, String messageBody) {
		this.fromUser = from;
		this.toUser = to;
		this.subject = subject;
		this.messageBody = messageBody;
		this.sendDate = LocalDateTime.now();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFromUser() {
		return fromUser;
	}

	public void setFromUser(String fromUser) {
		this.fromUser = fromUser;
	}

	public String getToUser() {
		return toUser;
	}

	public void setToUser(String toUser) {
		this.toUser = toUser;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getMessageBody() {
		return messageBody;
	}

	public void setMessageBody(String messageBody) {
		this.messageBody = messageBody;
	}

	public LocalDateTime getSendDate() {
		return sendDate;
	}

	public void setSendDate(LocalDateTime sendDate) {
		this.sendDate = sendDate;
	}

	public LocalDateTime getReadDate() {
		return readDate;
	}

	public void setReadDate(LocalDateTime readDate) {
		this.readDate = readDate;
	}


}
// end::code[]