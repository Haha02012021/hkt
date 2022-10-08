import axios from "../config/axios";

const handleGetPostApi = (type) => {
  return axios.get(`/api/post/get-all/?type=${type}`);
};

export { handleGetPostApi };
