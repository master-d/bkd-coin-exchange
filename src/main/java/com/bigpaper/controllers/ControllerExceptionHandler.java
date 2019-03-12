package com.bigpaper.controllers;

import com.bigpaper.exceptions.BkdCoinException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(value=BkdCoinException.class)
    public ResponseEntity<Object> handleBkdCoinException(BkdCoinException ex) {
        return new ResponseEntity<>(ex.getServerMessage(),ex.getStatus());
    }
    @ExceptionHandler(value=RuntimeException.class)
    public ResponseEntity<Object> handleRuntimeException(RuntimeException ex) {
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

}