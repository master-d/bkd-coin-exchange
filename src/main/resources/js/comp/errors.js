import React, { useContext, useState, useEffect } from "react"
import { ErrorContext } from "../context/error-context"
import {Card, CardHeader } from 'reactstrap'


const Errors = () => {
    const errorCtx = useContext(ErrorContext);

    const Error = (props) => {
        useEffect(() => {
            const timer = setTimeout(() => { errorCtx.removeError(props.idx) }, 5000);
            return () => clearTimeout(timer)
        },[]);
        return (
            <Card color={props.error.severity}>{props.idx} {props.error.message}</Card>
        )
    }
    const errors = errorCtx.errors.map((error, idx) => error && error.message ? <Error error={error} idx={idx} key={idx} /> : null);

    return (
        <Card body inverse color="info" hidden={!errorCtx.hasErrors()}> 
            {errors}
        </Card> 
    )
}

export default Errors;