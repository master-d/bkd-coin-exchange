import React, { useContext, useState, useEffect } from "react"
import { ErrorContext } from "../context/error-context"
import {Card, CardHeader, CardText, CardBody, Badge, CardTitle } from 'reactstrap'


const Errors = () => {
    const errorCtx = useContext(ErrorContext);
    const [timer,setTimer] = useState();

    const startTimer = () => {
        setTimer(setTimeout(() => { errorCtx.clearErrors() }, 5000));
    }
    const stopTimer = () => {
        if (timer) 
            clearTimeout(timer);
    }
    useEffect(() => {
        if (errorCtx.errors && errorCtx.errors.length)
            startTimer();
    },[errorCtx.errors]);

    const Error = (props) => {
        return (
            <div>
                <Badge  color={props.error.severity}>{props.error.message}</Badge>
            </div>
        )
    }
    const errors = errorCtx.errors.map((error, idx) => error && error.message ? <Error error={error} idx={idx} key={idx} /> : null);

    return (
        <Card color="dark" onMouseOver={stopTimer} onMouseOut={startTimer} onClick={errorCtx.clearErrors} 
        style={{ position: "absolute"}} hidden={!errorCtx.hasErrors()}>
            <CardBody>
                <CardTitle>This Happened</CardTitle>
                {errors}
            </CardBody>
        </Card>
    )
}

export default Errors;