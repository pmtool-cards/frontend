import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";

export type User = {
  id: number;
  email: string;
  username: string;
};

const getAuthUser = () => {
  return request({ url: "/auth/user" });
};

const loginUser = (userData: any) => {
  return request({
    url: "/auth/login",
    method: "post",
    data: userData,
  });
};

const registerUser = (userData: any) => {
  return request({
    url: "/auth/signup",
    method: "post",
    data: userData,
  });
};

const logoutUser = () => {
  return request({
    url: "/auth/logout",
    method: "post",
  });
};

export const useAuthUser = (onSuccess?: any, onError?: any) => {
  return useQuery("auth-user", getAuthUser, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  return useMutation(loginUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("auth-user");
    },
  });
};

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  return useMutation(registerUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("auth-user");
    },
  });
};

export const useLogoutUser = (onSuccess?: any, onError?: any) => {
  const queryClient = useQueryClient();
  return useMutation(logoutUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("auth-user");
    },
  });
};
