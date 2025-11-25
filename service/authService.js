import axios from "./axios";

export const handleAuthLogin = async (userData) => {
  return axios.post("/api/login", userData);
};
