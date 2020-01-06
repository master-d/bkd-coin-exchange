import * as React from "react";

const useAuth = () => {

  /** Return user auth from local storage value */
  const getStoredUser = () => {
    const user = window.localStorage.getItem("user");
    try {
      return JSON.parse(user);
    } catch(err) {
      return null;
    }
  };

  const [user, setUserState] = React.useState(getStoredUser());

  const setUser = (newUser) => {
    window.localStorage.setItem("user", JSON.stringify(newUser));
    setUserState(newUser);
  };

  const logout = () => {
    window.localStorage.clear();
    setUserState(null);
  };

  return {
    user,
    setUser,
    logout
  };
};

export default useAuth;