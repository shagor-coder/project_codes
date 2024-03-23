import { useMutation } from "@tanstack/react-query";
import {
  handleLogin,
  handleRegister,
} from "../../../requests/authentication/auth";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: handleLogin,
    onSuccess: async (data) => {
      console.log("Login successful");
    },
    onError: async (error) => {
      console.log(error.message);
    },
    retry: 0,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: handleRegister,
    onSuccess: async () => {
      console.log("Registration successful!");
    },
    onError: async (error) => {
      console.log(error.message);
    },
    retry: 0,
  });
};
