import React, { useCallback, useEffect, useState } from "react";
const AuthContext = React.createContext({
  user: ''
  //  {
  //   choice: [],
  //   email: "",
  //   gender: "",
  //   isOK: false,
  //   name: "",
  //   password: "",
  //   rePassword: "",
  //   role: "",
  //   user: "",
  // }
  ,
  isLoggedIn: false,
  login: (user) => {},
  logout: () => {},
});

let logoutTimer;

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

const retrieveStoredUser = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedExpirationDate = JSON.parse(
    localStorage.getItem("expirationTime")
  );
  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("user");
    localStorage.removeItem("expirationTime");
    return null;
  }
  return {
    user: storedUser,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const userData = retrieveStoredUser();

  let initialUser;

  if (userData) {
    initialUser = userData.user;
  }

  const [user, setUser] = useState(initialUser);
  const userIsLoggedIn = !!user;

  const logoutHandler = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("expirationTime");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (user, expirationTime) => {
    const remainingTime = calculateRemainingTime(expirationTime);
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("expirationTime", JSON.stringify(expirationTime));
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (userData) {
      logoutTimer = setTimeout(logoutHandler, userData.duration);
    }
  }, [userData, logoutHandler]);

  const authContextValue = {
    user: user,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
