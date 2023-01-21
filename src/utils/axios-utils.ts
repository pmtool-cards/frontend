import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const request = ({ ...options }) => {
  const onSuccess = (response: any) => response;
  const onError = (error: any) => {
    // catch errors and logging
    throw error;
  };

  return client(options).then(onSuccess).catch(onError);
};
