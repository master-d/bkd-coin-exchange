import * as React from "react";

/** Custom Hooks */
import useAuth from "../hooks/auth-handler";


const AuthContext = React.createContext({
  user: null,
  setUser: () => {},
  logout: () => {}
});
const { Provider } = AuthContext;

function AuthProvider({children}) {
  const auth = useAuth();
  return (
    <Provider value={auth}>
        {children}
    </Provider>
  )
}
export {AuthContext, AuthProvider};
