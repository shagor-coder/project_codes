import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { ToastComponent } from "../components/Toast";
import { useGetCurrentUser } from "../features/user/services/user";

const defaultContext = {
  isLoggedIn: false,
  authUser: null,
  showToast: false,
  toastMessage: "Success!",
  toastType: "success",
};

const AuthContext = createContext(null);

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, isLoggedIn: true, authUser: action.data };
    case "logout":
      return { ...state, isLoggedIn: false, authUser: null };
    case "showToast":
      return {
        ...state,
        showToast: true,
        toastType: action.toastType,
        toastMessage: action.message,
      };
    case "closeToast":
      return { ...state, showToast: false };
    default:
      return state;
  }
};

export const UseAuthContext = () => useContext(AuthContext);

export const useAppQueryClient = () => useQueryClient();

export const AuthContextProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, defaultContext);
  const {
    data: userData,
    isError,
    error,
    isFetched,
    isPending,
  } = useGetCurrentUser();
  const [isLoadFinished, setIsLoadFinished] = useState(false);

  useEffect(() => {
    if (isError) {
      dispatch({
        type: "showToast",
        message: error.message,
        toastType: "error",
      });
      dispatch({ type: "logout" });
    }
    if (userData) dispatch({ type: "login", data: userData });
    if (isFetched) setIsLoadFinished(true);
  }, [isError, userData, isFetched, error]);

  if (isPending)
    return (
      <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open>
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
      {isLoadFinished && children}
    </AuthContext.Provider>
  );
};
