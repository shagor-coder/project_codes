import React, { useContext, useReducer } from "react";
import { ToastComponent } from "../components/Toast";
import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useGetCurrentUser } from "../features/user/services/user";

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

export const UseAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, defaultContext);
  const { data: userData, isError, isLoading, error } = useGetCurrentUser();

  useEffect(() => {
    if (isError) {
      dispatch({
        type: "showToast",
        message: error.message,
        toastType: "error",
      });
    }

    if (userData) {
      dispatch({
        type: "login",
        data: userData,
      });
    }
  }, [isError, userData, isLoading, error]);

  if (isLoading)
    return (
      <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={isLoading}>
        <CircularProgress color="info" />
      </Backdrop>
    );

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
