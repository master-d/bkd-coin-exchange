import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

const FetchOptions = (method) => {
    const auth = useContext(AuthContext);
    const opts = {
        method: method,
        headers: { }
        
    };
    if (method != 'GET')
        opts.headers["Content-Type"] = "application/json";
    if (auth.user && auth.user.jwt) {
        opts.headers['Authorization'] = 'Bearer ' + auth.user.jwt;
    }

    return opts;
}

  
  export default FetchOptions;