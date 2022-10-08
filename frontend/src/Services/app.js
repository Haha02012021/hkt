import axios from "../config/axios";

const handleGetPostApi = (type, page) => {
  return axios.get(`/api/post/get-all/?type=${type}&page=${page}`);
};

const handleLikePostApi = (id) => {
  return axios.post(`http://127.0.0.1:8000/api/reaction/post/${id}`);
};

const handleCompleteQuestionApi = (id) => {
  return axios.post(`http://127.0.0.1:8000/api/post/complete/${id}`);
};

const handleCommentsPostApi = (id) => {
  return axios.get(`http://127.0.0.1:8000/api/comments/post/${id}`,);
};

const handleCommentApi = (req) => {
  return axios.post(`http://127.0.0.1:8000/api/comments/add`, req);
}

export { handleGetPostApi, handleLikePostApi, handleCommentsPostApi, handleCommentApi, handleCompleteQuestionApi };
