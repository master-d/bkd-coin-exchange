import React, { useContext } from "react"
import { ErrorContext } from "../context/error-context"
import {Card, CardHeader } from 'reactstrap'


const Errors = () => {
    const errorCtx = useContext(ErrorContext);
    const Error = (props) => {
        setTimeout(() => { errorCtx.removeError(props.idx) }, 5000);
        return (
            <Card color={props.error.severity}>{props.error.message}</Card>
        )
    }
    const errors = errorCtx.errors.map((error, idx) => error && error.message ? <Error error={error} idx={idx}/> : null);

    return (
        <Card body inverse color="info" hidden={errors.length == 0}> 
            {errors}
        </Card> 
    )
}

export default Errors;