import axios from "../config/axios";

const handleLoginApi = (data) => {
  return axios.post("/api/auth/login", data);
};

const handleSignUpApi = (data) => {
  return axios.post("/api/auth/sign-up", data);
};

export { handleLoginApi, handleSignUpApi };
