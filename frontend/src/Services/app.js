import axios from "../config/axios";

const handleGetPostApi = (type, page) => {
  return axios.get(`/api/post/get-all/?type=${type}&page=${page}`);
};

const handleLikePostApi = (id) => {
  return axios.post(`/api/reaction/post/${id}`);
};

const handleCompleteQuestionApi = (id) => {
  return axios.post(`/api/post/complete/${id}`);
};

const handleCommentsPostApi = (id) => {
  return axios.get(`/api/comments/post/${id}`);
};

const handleCommentApi = (req) => {
  return axios.post(`/api/comments/add`, req);
};

const handleGetOtherUsersApi = () => {
  return axios.get(`/api/user/get-other-users`);
};

const handleGetAllClassApi = () => {
  return axios.get(`/api/class/get-all`);
};

const handleNewClassApi = (data) => {
  return axios.post(`/api/class/create`);
};

export {
  handleGetPostApi,
  handleLikePostApi,
  handleCommentsPostApi,
  handleCommentApi,
  handleCompleteQuestionApi,
  handleGetOtherUsersApi,
  handleGetAllClassApi,
  handleNewClassApi,
};
