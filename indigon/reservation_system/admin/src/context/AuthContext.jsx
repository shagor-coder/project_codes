import React, { useContext, useReducer } from "react";

const defaultContext = {
  isLoggedIn: false,
  authUser: null,
  showToast: false,
};

const AuthContext = React.createContext(null);

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isLoggedIn: true,
        authUser: action.data,
      };
    case "logout":
      return {
        ...state,
        isLoggedIn: false,
        authUser: null,
      };
    case "showToast":
      return {
        ...state,
        showToast: true,
      };

    default:
      return state;
  }
};

export const GetAuthContext = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, defaultContext);

  return (
    <AuthContext.Provider value={{ auth, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuthContext = () => {
  return useContext(AuthContext);
};
