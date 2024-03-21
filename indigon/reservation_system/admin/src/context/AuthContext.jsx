import React, { useContext, useReducer } from "react";
import { ToastComponent } from "../components/Toast";

const defaultContext = {
  isLoggedIn: false,
  authUser: null,
  showToast: false,
  toastMessage: "Success!",
  toastType: "success",
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
        toastType: action.toastType,
        toastMessage: action.message,
      };

    case "closeToast":
      return {
        ...state,
        showToast: false,
        toastType: "Success!",
        toastMessage: "success",
      };

    default:
      return state;
  }
};

export const GetAuthContext = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, defaultContext);

  return (
    <AuthContext.Provider value={{ auth, dispatch }}>
      {auth.showToast && (
        <ToastComponent
          message={auth.toastMessage}
          toastType={auth.toastType}
        />
      )}

      {children}
    </AuthContext.Provider>
  );
};

export const UseAuthContext = () => {
  return useContext(AuthContext);
};
