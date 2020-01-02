import * as React from "react";
import useErrors from "../hooks/error-hook";

const ErrorContext = React.createContext({
  errors: [], addError: () => {}, removeError: () => {}, clearErrors: () => {}, hasErrors: () => {}
});

function ErrorProvider({children}) {
  const defaultErrors = useErrors();
  return (
    <ErrorContext.Provider value={defaultErrors}>
        {children}
    </ErrorContext.Provider>
  )
}
export {ErrorContext, ErrorProvider};
