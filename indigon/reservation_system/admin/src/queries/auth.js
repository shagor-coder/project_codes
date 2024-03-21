import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  handleLogin,
  handleRegister,
  handleTokenValidation,
} from "../api/auth";

const queryClient = useQueryClient();

export const useLogin = () => {
  const login = useMutation({
    mutationKey: "login",
    mutationFn: handleLogin,
    onSuccess: async (data) => {
      console.log(data);
      console.log("Login successful");
    },
    onError: async (error) => {
      console.log(error.message);
    },
  });

  return login;
};

export const useRegister = () => {
  const register = useMutation({
    mutationKey: "register",
    mutationFn: handleRegister,
    onSuccess: async () => {
      console.log("Registration successful!");
    },
    onError: async (error) => {
      console.log(error.message);
    },
  });

  return register;
};

export const useTokenValidation = () => {
  const validate = useMutation({
    mutationKey: "tokenvalidation",
    mutationFn: handleTokenValidation,
    onSuccess: async () => {
      console.log("Validation successful!");
    },
    onError: async (error) => {
      console.log(error.message);
    },
  });

  return validate;
};
