import * as React from "react";

const ErrorContext = React.createContext();
const { Provider } = ErrorContext;

const useErrors = (v_default) => {
  const [errors, setErrors] = React.useState(v_default);

  const defaultErrors = {
    errors: errors,
    addError: (error) => {
      if (error) {
        if (typeof error == "string") 
          errors.push({ message: error, severity: "danger"});
        else
          errors.push(error);
        setErrors(errors);
      }
    },
    removeError: (idx) => {
      errors[idx] = null;
      var allNull = true;
      for (var e in errors) {
        if (e)
          allNull = false;
      }
      if (allNull)
        errors = [];
      setErrors(errors);
    },
    clearErrors: () => {
      errors = [];
      setErrors(errors);
    }
  }
  return defaultErrors;
}
function ErrorProvider({children}) {
  const defaultErrors = useErrors([]);
  return (
    <Provider value={defaultErrors}>
        {children}
    </Provider>
  )
}
export {ErrorContext, ErrorProvider};
