import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { UseAuthContext } from "../context/AuthContext";

export const ToastComponent = ({ message, toastType }) => {
  const { dispatch, auth } = UseAuthContext();

  const handleClose = () => {
    dispatch({
      type: "closeToast",
    });
  };

  return (
    <div>
      <Snackbar
        open={auth.showToast}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={toastType === "success" ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
