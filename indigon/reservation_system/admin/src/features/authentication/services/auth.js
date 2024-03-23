import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  handleLogin,
  handleRegister,
  handleTokenValidation,
} from "../../../requests/authentication/auth";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const login = useMutation({
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

  return login;
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const register = useMutation({
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

  return register;
};

export const useTokenValidation = () => {
  const validate = useQuery({
    queryKey: ["tokenValidation"],
    queryFn: handleTokenValidation,
    retry: 0,
  });

  return validate;
};
