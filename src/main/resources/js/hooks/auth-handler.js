import * as React from "react";

const useAuthHandler = () => {
  const [auth, setAuthState] = React.useState(null);

  const setAuth = (auth) => {
    window.localStorage.setItem("auth", JSON.stringify(auth));
    setAuthState(auth);
  };

  const setUnauth = () => {
    window.localStorage.clear();
    setAuthState(null);
  };

  return {
    auth,
    setAuth,
    setUnauth
  };
};

export default useAuthHandler;