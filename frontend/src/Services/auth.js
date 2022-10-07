import axios from "../config/axios";

const handleLoginApi = (data) => {
  return axios.post("/api/auth/login", data);
};

const handleSignUpApi = (data) => {
  return axios.post("/api/auth/signup", data);
};

const handleLoginByTokenApi = () => {
  return axios.get("/api/user");
};

export { handleLoginApi, handleSignUpApi, handleLoginByTokenApi };
