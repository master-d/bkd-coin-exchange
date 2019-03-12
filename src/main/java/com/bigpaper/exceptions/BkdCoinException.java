package com.bigpaper.exceptions;

import com.bigpaper.beans.ServerMessage;

import org.springframework.http.HttpStatus;

public class BkdCoinException extends RuntimeException {
    
    private ServerMessage msg;
    private HttpStatus status;

    public BkdCoinException(String message) {
        this(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
    public BkdCoinException(HttpStatus status, String message) {
        this.status = status;
        this.msg = new ServerMessage(message);
    }

    public BkdCoinException(ServerMessage msg) {
        this(HttpStatus.INTERNAL_SERVER_ERROR, msg);
    }
    public BkdCoinException(HttpStatus status, ServerMessage msg) {
        this.status = status;
        this.msg = msg;
    }
    public HttpStatus getStatus() {
        return status;
    }
    public ServerMessage getServerMessage() {
        return msg;
    }
}