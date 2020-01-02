import * as React from "react";

const useErrors = () => {
    const [errors, setErrors] = React.useState([]);

    const addError = (error) => {
        if (error) {
          if (typeof error == "string") 
            setErrors([...errors,{ message: error, severity: "danger"}]);
          else
            setErrors([...errors,error]);
        }
    }
    const removeError = (idx) => {
        errors[idx] = null;
        if (!errors.some( e => e ))
          clearErrors();
        else
          setErrors(errors);
    }
    const clearErrors = () => {
        setErrors([]);
    }
    const hasErrors = () => {
        return errors.some( e => e );
    }

    return {
      errors, addError, removeError, clearErrors, hasErrors
    }
}
export default useErrors;