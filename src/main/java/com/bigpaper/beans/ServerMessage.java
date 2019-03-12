package com.bigpaper.beans;

public class ServerMessage {
    private Object id;
    private String message;
    private String trace;

    public ServerMessage() { }
    public ServerMessage(String message) {
        this(null, message, null);
    }
    public ServerMessage(Object id, String message) {
        this(id, message, null);
    }
    public ServerMessage(Object id, String message, String trace) {
        this.id = id;
        this.message = message;
        this.trace = trace;
    }
    public Object GetId() {
        return this.id;
    }
    public String getMessage() {
        return this.message;
    }
    public String getTrace() {
        return trace;
    }
    public void setTrace(String trace) {
        this.trace = trace;
    }
}