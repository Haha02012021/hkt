import axios from "../config/axios";

const handleGetPostApi = (type, page) => {
  return axios.get(`/api/post/get-all/?type=${type}&page=${page}`);
};

const handleGetPostByIdApi = (type, id) => {
  return axios.get(`/api/post/get/${id}?type=${type}`);
};

const handleLikePostApi = (id, value) => {
  return axios.post(`/api/reaction/post/${id}?value=${value}`);
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
  return axios.post(`/api/class/create`, data);
};

const handleGetNotifications = () => {
  return axios.get("/api/notification/get-by-user-id");
};

const handleNewNotificationApi = (req) => {
  return axios.post("/api/notification/create", req);
};

const handleSearchApi = (data) => {
  return axios.post(`/api/post/search/?page=${data.page}`, data);
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
  handleGetNotifications,
  handleNewNotificationApi,
  handleGetPostByIdApi,
  handleSearchApi,
};
