import axios from "../config/axios";

const handleLoginApi = (data) => {
  return axios.post("/api/auth/login", data);
};

export { handleLoginApi };
