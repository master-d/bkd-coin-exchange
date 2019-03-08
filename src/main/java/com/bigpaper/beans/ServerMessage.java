package com.bigpaper.beans;

public class ServerMessage<T> {
    private String message;
    private T obj;

    public ServerMessage() { }
    public ServerMessage(String message) {
        this(message, null);
    }
    public ServerMessage(String message, T obj) {
        this.message = message;
        this.obj = obj;
    }

    public String getMessage() {
        return this.message;
    }
    public T getObj() { return this.obj; }
}