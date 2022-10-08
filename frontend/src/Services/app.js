import axios from "../config/axios";

const handleGetPostApi = (type, page) => {
  return axios.get(`/api/post/get-all/?type=${type}&page=${page}`);
};

const handleLikePostApi = (id) => {
  return axios.post(`http://127.0.0.1:8000/api/reaction/post/${id}`);
};

export { handleGetPostApi, handleLikePostApi };
