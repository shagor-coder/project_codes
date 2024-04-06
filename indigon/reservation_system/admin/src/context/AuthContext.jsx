import { Backdrop, CircularProgress } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { ToastComponent } from "../components/Toast";
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

export const useAppQueryClient = () => {
  return useQueryClient();
};

export const AuthContextProvider = ({ children }) => {
  const [isLoadFinished, setIsLoadFinished] = useState(false);
  const [auth, dispatch] = useReducer(authReducer, defaultContext);
  const {
    data: userData,
    isError,
    error,
    isFetched,
    isPending,
  } = useGetCurrentUser();

  useEffect(() => {
    if (isError) {
      dispatch({
        type: "showToast",
        message: error.message,
        toastType: "error",
      });

      dispatch({
        type: "logout",
      });
    }

    if (userData) {
      dispatch({
        type: "login",
        data: userData,
      });
    }

    if (isFetched) {
      setIsLoadFinished(true);
    }
  }, [isError, userData, isPending, error, isFetched]);

  if (isPending)
    return (
      <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={isPending}>
        <CircularProgress color="info" />
      </Backdrop>
    );

  if (isLoadFinished)
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
