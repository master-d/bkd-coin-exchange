import * as React from "react";

/** Custom Hooks */
import useAuthHandler from "../hooks/auth-handler";


/** Return user auth from local storage value */
export const getStoredUserAuth = () => {
  const auth = window.localStorage.getItem("UserAuth");
  if (auth) {
    return JSON.parse(auth);
  }
  return null;
};

export const AuthContext = React.createContext({
  auth: null,
  setAuth: () => {},
  setUnauth: () => {}
});

function AuthProvider({children}) {
  const { auth, setAuth, setUnauth } = useAuthHandler(
    getStoredUserAuth()
  );
  return (
    <AuthContext.Provider value={auth, setAuth, setUnauth}>
        {children}
    </AuthContext.Provider>
  )
}
export {AuthProvider};
